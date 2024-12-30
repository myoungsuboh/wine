import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  nickname: string;
  image: string | null;
}

interface AuthState {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  user: User | null;
  setUser: (user: Partial<User>) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isLogin: false,
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) => set({isLogin: true, accessToken: accessToken.trim(), refreshToken: refreshToken.trim()}),
      user: null,
      setUser: (user: Partial<User>) => {
        set(
          state =>
            ({
              user: {...state.user, ...user},
              isLogin: true,
            }) as Partial<AuthState>,
        );
      },
      clearUser: () =>
        set(() => ({
          isLogin: false,
          accessToken: null,
          refreshToken: null,
          user: null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        isLogin: state.isLogin,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    },
  ),
);
