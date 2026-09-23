import { Layout } from '@/components/Layout/Layout';
import { QueryProvider } from '@/components/providers/query-provider';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <link rel="stylesheet" href="/newsprk.css" />
      <link rel="stylesheet" href="/react-runtime.css" />
      <link rel="stylesheet" href="/globals.css" />
      <Layout>{children}</Layout>
    </QueryProvider>
  );
}
