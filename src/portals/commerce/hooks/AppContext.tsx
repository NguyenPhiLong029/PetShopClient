import { createContext } from 'react';
import { UserRole } from 'src/utils/constant';
import { Cart } from './useCart';

// eslint-disable-next-line
interface AppConfig {}

export interface UserInfo {
  imageUrl: string;
  email: string;
  fullname: string;
  role: UserRole;
  id: string;
  phone: string;
  address: string;
}

export interface AppLoadProps {
  userInfo: UserInfo;
  appConfig: AppConfig;
  isAuth: boolean;
  cart: Cart;
}

export interface AppContextProps extends AppLoadProps {
  restore: (data: AppLoadProps) => void;
}

export const AppContext = createContext({} as AppContextProps);
AppContext.displayName = 'AppContext';

export default AppContext;
