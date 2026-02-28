import AppShell from "@/shared/ui/AppShell/AppShell";
// import { AuthGuard } from "@/shared/lib/auth/guards";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { locale } = await params;
  return (
    // <AuthGuard>
<<<<<<< HEAD
      <AppShell locale={locale}>{children}</AppShell>
    // </AuthGuard>
=======
    //   <AppShell locale={locale}>{children}</AppShell>
    // </AuthGuard>
    <AppShell locale={locale}>{children}</AppShell>
>>>>>>> 087adf5bd80216a06bb8eba6c23effcf703224be
  );
}