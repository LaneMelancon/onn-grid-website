import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

export const displayFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--ds-font-display',
});

export const textFont = localFont({
  src: [
    { path: '../assets/fonts/borna/borna-regular.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/borna/borna-italic.woff2', weight: '400', style: 'italic' },
    { path: '../assets/fonts/borna/borna-medium.woff2', weight: '500', style: 'normal' },
    { path: '../assets/fonts/borna/borna-medium-italic.woff2', weight: '500', style: 'italic' },
    { path: '../assets/fonts/borna/borna-semibold.woff2', weight: '600', style: 'normal' },
    { path: '../assets/fonts/borna/borna-semibold-italic.woff2', weight: '600', style: 'italic' },
    { path: '../assets/fonts/borna/borna-bold.woff2', weight: '700', style: 'normal' },
    { path: '../assets/fonts/borna/borna-bold-italic.woff2', weight: '700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--ds-font-text',
});

export const fontVariables = `${displayFont.variable} ${textFont.variable}`;
