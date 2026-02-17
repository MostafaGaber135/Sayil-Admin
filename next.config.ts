import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Required for some Next.js 15 + Turbopack setups so next-intl can inject module aliases reliably
  turbopack: {}
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
