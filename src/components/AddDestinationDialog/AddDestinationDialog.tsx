import { Metadata } from '@bsv/spv-wallet-js-client';
import { QuestionMarkCircleIcon as Question } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

import { toast } from 'sonner';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components';
import { useSpvWalletClient } from '@/contexts';
import { errorWrapper } from '@/utils';

export interface AddDestinationDialogProps {
  className?: string;
}

export const AddDestinationDialog = ({ className }: AddDestinationDialogProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [metadata, setMetadata] = useState(JSON.stringify({}));

  const { spvWalletClient } = useSpvWalletClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (metadata: Metadata) => {
      // At this point, spvWalletClient is defined; using non-null assertion.
      return await spvWalletClient!.NewDestination(metadata);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['destinations'],
      });
    },
  });

  const handleAdd = async () => {
    try {
      const metadataParsed = JSON.parse(metadata) as Metadata;
      mutation.mutate(metadataParsed);
      setIsAddDialogOpen(false);
      toast.success('Destination added');
    } catch (error) {
      errorWrapper(error);
      toast.error('Failed to add destination');
    }
  };
  const handleMetadataChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMetadata(event.target.value);
  };

  const handleDialogToggle = () => {
    setIsAddDialogOpen((prev) => !prev);
  };
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={handleDialogToggle}>
      <DialogTrigger className={className}>
        <Button size="sm" variant="secondary" className="h-10 gap-1">
          <CirclePlus className="mr-1" size={16} />
          Add Destination
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Destination</DialogTitle>
        </DialogHeader>

        <div className="flex">
          <Label htmlFor="metadata">Metadata</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Question className="size-4 ml-1 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Metadata should be in JSON format. Example: {`{"key":"value"}`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Textarea placeholder="Metadata" id="metadata" value={metadata} onChange={handleMetadataChange} />
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={handleAdd}>Add</Button>
          <Button variant="ghost" onClick={handleDialogToggle}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};