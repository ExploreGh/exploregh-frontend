import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Role } from '@/context/ProfileContext';

const ACCOUNTS_KEY = 'exploregh.accounts';

export type LocalAccount = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: Role;
  status: 'active' | 'pending';
};

async function getAccounts(): Promise<LocalAccount[]> {
  const stored = await AsyncStorage.getItem(ACCOUNTS_KEY);
  if (!stored) return [];

  try {
    const accounts = JSON.parse(stored);
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
}

export async function createLocalAccount(account: LocalAccount) {
  const accounts = await getAccounts();
  const exists = accounts.some((item) => item.email === account.email);
  if (exists) {
    throw new Error('An account with this email already exists.');
  }

  await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
  return account;
}

export async function authenticateLocalAccount(email: string, password: string) {
  const accounts = await getAccounts();
  const account = accounts.find((item) => item.email === email);

  if (!account || account.password !== password) {
    throw new Error('Incorrect email or password. Create an account first if you have not registered.');
  }

  if (account.status === 'pending') {
    throw new Error('Your vendor or guide application is still awaiting approval.');
  }

  return account;
}
