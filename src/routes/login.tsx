import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  ModeToggle,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Toaster,
} from '@/components';
import { Role, TRole, LoginType, useAuth, useSpvWalletClient } from '@/contexts';

import { createClient, errorWrapper, getShortXprv } from '@/utils';
import { useConfig } from '@4chain-ag/react-configuration';
import { ErrorResponse, SpvWalletError } from '@bsv/spv-wallet-js-client';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { z } from 'zod';

export const Route = createFileRoute('/login')({
  component: LoginForm,
});

const formSchema = z.object({
  role: z.enum([Role.User, Role.Admin]),
  type: z.enum([LoginType.AccessKey, LoginType.Xprv]).optional(),
  key: z.string({
    required_error: 'This field is required',
  }),
  serverUrl: z.string({
    required_error: 'Server URL is required',
  }),
});

export function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setSpvWalletClient, serverUrl, setServerUrl } = useSpvWalletClient();

  const { isAuthenticated, setLoginKey, isAdmin } = useAuth();
  const router = useRouter();
  const search = useSearch({ from: '/login' as const }) as { redirect?: string };

  const { config } = useConfig();
  const { configureServerUrl = false } = config;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: Role.Admin,
      type: LoginType.Xprv,
      key: '',
      serverUrl: serverUrl,
    },
  });

  const ShowPasswordIcon = isPasswordVisible ? EyeSlashIcon : EyeIcon;
  const inputRef = useRef<HTMLInputElement>(null);

  const currentRole = form.getValues('role');
  const currentType = form.getValues('type');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentRole, currentType]);

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let redirect = '';

    if (isAdmin) {
      redirect = search?.redirect?.includes('admin') ? search?.redirect : '/admin/xpub';
    } else {
      redirect = search?.redirect?.includes('user') ? search?.redirect : '/user/access-keys';
    }

    router.history.push(redirect);
  }, [isAuthenticated, search?.redirect]);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
    inputRef.current?.focus();
  };

  const errorToMessage = (role: TRole, error: unknown): string => {
    if (!(error instanceof SpvWalletError)) {
      return 'Invalid credentials';
    }
    if (!(error instanceof ErrorResponse)) {
      return 'SPV Wallet client error';
    }
    switch (error.response.status) {
      case 401:
        return role === Role.Admin ? 'Admin Key is invalid' : 'xPriv or Access Key is invalid';
      case 404:
        return 'Invalid ServerUrl';
      default:
        errorWrapper(error);
        return 'Response error';
    }
  };

  const onSubmit = async ({ role, key, type }: z.infer<typeof formSchema>) => {
    setServerUrl(serverUrl);

    try {
      const client = await createClient(role, key, serverUrl, type);
      setSpvWalletClient(client);

      const shortKey = getShortXprv(key);
      setLoginKey(shortKey);

      await router.invalidate();
      toast.success('Successfully logged in');
    } catch (error: unknown) {
      const message = errorToMessage(role, error);

      toast.error(message);
      console.error('Login error:', error);
    }
  };

  const onServerUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formChangeCallback: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  ) => {
    setServerUrl(e.target.value);
    formChangeCallback(e);
  };

  return (
    <div className="relative">
      <div className="absolute top-8 right-8">
        <ModeToggle />
      </div>
      <div className="grid grid-cols-2 h-screen">
        <div className="flex flex-col items-center justify-center border-r">
          <h1 className="text-2xl font-bold mb-16">SPV Wallet Admin</h1>
          <Card className="w-full max-w-sm">
            <Form {...form}>
              <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent className="grid">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={onChange} defaultValue={value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a role" defaultValue={value} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent defaultValue={value}>
                            <SelectItem value={Role.Admin}>Admin</SelectItem>
                            <SelectItem value={Role.User}>User</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  {currentRole === Role.User && (
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormLabel>Key</FormLabel>
                          <FormControl>
                            <RadioGroup defaultValue={value} className="mb-2" onValueChange={onChange}>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="xPriv" id="xprv" />
                                </FormControl>
                                <FormLabel htmlFor="xprv" className="ml-2 cursor-pointer">
                                  xPriv
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem id="accessKey" value="Access Key" />
                                </FormControl>
                                <FormLabel htmlFor="accessKey" className="ml-2 cursor-pointer">
                                  Access Key
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        {currentRole === Role.Admin && <FormLabel>Admin Key (xpriv)</FormLabel>}
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              ref={inputRef}
                              className="pr-12"
                              type={isPasswordVisible ? 'text' : 'password'}
                              placeholder={
                                currentRole === Role.Admin
                                  ? 'Admin Key'
                                  : currentType === 'xPriv'
                                    ? 'xPriv'
                                    : 'Access Key'
                              }
                            />
                          </FormControl>
                          <ShowPasswordIcon
                            className="size-5 absolute top-2.5 right-3.5 cursor-pointer"
                            onClick={handleTogglePasswordVisibility}
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                  {configureServerUrl && (
                    <FormField
                      control={form.control}
                      name="serverUrl"
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormLabel>Server Url</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                onChange={(e) => onServerUrlChange(e, field.onChange)}
                                placeholder="Server Url"
                              />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </CardFooter>
                <Toaster position="bottom-center" />
              </form>
            </Form>
          </Card>
        </div>
        <div className="flex justify-center">
          <img className="object-contain max-w-[765px]" src="/bsv-login.png" alt="login" />
        </div>
      </div>
    </div>
  );
}
