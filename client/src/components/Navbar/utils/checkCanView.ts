import type { CheckCanView } from '../interface/Navbar';
import { AccountType } from '../../../types/AccountType';

const checkCanView: CheckCanView = (type) => (canView, authenticated) =>
  canView && canView.includes(AccountType[type]) && authenticated ? true : false;

export default checkCanView;
