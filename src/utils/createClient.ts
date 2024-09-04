import { Role, SpvWalletClientExtended } from '@/contexts';
import { SpvWalletClient } from '@bsv/spv-wallet-js-client';

export const createClient = async (role: Role, key: string, serverUrl: string, isAccessKey: boolean) => {
  const client = newSPVWalletClient(role, key, serverUrl, isAccessKey);

  //checks connection (serverURL) and authentication (key)
  //throws exception on failure
  if (role === Role.Admin) {
    await client.AdminGetStatus();
    client.role = Role.Admin;
    return client;
  }

  if (role === Role.User) {
    await client.GetXPub();
    client.role = Role.User;
    return client;
  }

  throw new Error('Invalid role');
};

function newSPVWalletClient(role: Role, key: string, serverUrl: string, isAccessKey: boolean): SpvWalletClientExtended {
  if (role === Role.Admin) {
    return new SpvWalletClient(serverUrl, { adminKey: key }, { level: 'disabled' });
  }

  if (role === Role.User) {
    if (isAccessKey) {
      return new SpvWalletClient(serverUrl, { accessKey: key }, { level: 'disabled' });
    }
    return new SpvWalletClient(serverUrl, { xPriv: key }, { level: 'disabled' });
  }

  throw new Error('Invalid role or key format');
}
