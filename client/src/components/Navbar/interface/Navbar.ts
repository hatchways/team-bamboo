import { AccountTypeKey, AccountTypeVal } from './../../../types/AccountType';
import { User } from '../../../interface/User';

export interface MenuItemData {
  item: string | JSX.Element;
  resource?: string;
  canView: AccountTypeVal[] | null;
  authenticated: boolean;
}

interface PartialProfile {
  isSitter: boolean;
}

export type FinalCheck = (canView: AccountTypeVal[] | null, authenticated: boolean) => boolean;
export type CheckCanView = (type: AccountTypeKey) => FinalCheck;
export type CheckProfile = (profile?: PartialProfile, user?: User | null) => FinalCheck;
