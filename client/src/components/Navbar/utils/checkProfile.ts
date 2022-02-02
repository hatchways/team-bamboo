import { CheckProfile } from '../interface/Navbar';
import checkCanView from './checkCanView';

const checkProfile: CheckProfile = (profile, user) => {
  if (profile?.isSitter && user) return checkCanView('PET_SITTER');
  else if (user) return checkCanView('PET_OWNER');
  return (canView, authenticated) => !user && !authenticated && !canView;
};

export default checkProfile;
