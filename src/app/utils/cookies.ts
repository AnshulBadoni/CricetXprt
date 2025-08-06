// utils/cookies.ts
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

interface UserData {
  avatar?: string;
  id?: number;
  username?: string;
  email?: string;
  phone?: string;
}

// Set auth token cookie
export const setAuthToken = (token: string, rememberMe: boolean = false) => {
  setCookie('authToken', token, {
    path: '/',
    maxAge: rememberMe ? 60 * 60 * 24 * 2 : 60 * 60 * 24 * 1, // 7 days or 12 hours
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
};

// Set user data cookie
export const setUserData = (data: UserData, rememberMe: boolean = false) => {
  setCookie('userData', JSON.stringify(data), {
    path: '/',
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 0.5, // 30 days or 12 hours
    sameSite: 'lax'
  });
};

// Client-side cookie access
export const getCookieData = (): UserData | null => {
  try {
    const userDataCookie = getCookie('userData');
    // if (!userDataCookie) return null;
    return JSON.parse(userDataCookie as string) as UserData;
  } catch (error) {
    console.error('Error parsing user data cookie:', error);
    return null;
  }
};

export const getAuthToken = (): string | null => {
  const token = getCookie('authToken');
  return token ? token.toString() : null;
};

// Server-side cookie access for Pages Router
export const getServerCookieData = (context: GetServerSidePropsContext): UserData | null => {
  try {
    const userDataCookie = getCookie('userData', { req: context.req, res: context.res });
    if (!userDataCookie) return null;
    return JSON.parse(userDataCookie as string) as UserData;
  } catch (error) {
    console.error('Error parsing user data cookie:', error);
    return null;
  }
};

export const getServerAuthToken = (context: GetServerSidePropsContext): string | null => {
  try {
    const token = getCookie('authToken', { req: context.req, res: context.res });
    return token ? token.toString() : null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const deleteCookieData = () => {
  deleteCookie('userData');
  deleteCookie('authToken');
};
