import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});

export const latestCoinIdAtom = atom({
  key: 'latestCoinId',
  default: 'btc-bitcoin',
});
