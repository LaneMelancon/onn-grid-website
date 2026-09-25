export const siteName = 'Onn Grid';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

/** True only on the live Vercel production deployment (not previews or local builds). */
export const isProductionDeployment = process.env.VERCEL_ENV === 'production';

export const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
