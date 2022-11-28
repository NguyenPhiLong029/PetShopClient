import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { UserInfo } from 'src/portals/commerce/hooks/AppContext';

export const setToken = (token: string) => {
  window.localStorage.setItem('access_token', token);
};

export const getToken = (): string => {
  return window.localStorage.getItem('access_token');
};

export const deleteToken = () => {
  window.localStorage.removeItem('access_token');
};

export const setUserInfo = (user: Record<string, any>) => {
  window.localStorage.setItem('user_info', JSON.stringify(user));
};

export const getUserInfo = (): UserInfo => {
  const user = window.localStorage.getItem('user_info');
  return JSON.parse(user);
};

export const deleteUserInfo = () => {
  window.localStorage.removeItem('user_info');
};

export const clearAuth = () => {
  deleteToken();
  deleteUserInfo();
};

export const Logout = () => {
  clearAuth();
  window.location.href = '/';
};

// export function getToken() {
//   let token = parseCookies().token
//   if (!token) {
//     token = sessionStorage.getItem('token')
//   }
//   return token
// }

// export function setToken(remember, token) {
//   if (remember) {
//     const in1days = new Date()
//     in1days.setSeconds(86400)

//     setCookie({} as any, 'token', token, {
//       expires: in1days,
//       path: '/',
//       secure: true,
//     })
//   } else {
//     sessionStorage.setItem('token', token)
//   }
// }

// export function deleteToken() {
//   sessionStorage.removeItem('token')
//   destroyCookie({} as any, 'token', { path: '/', secure: true })
// }
