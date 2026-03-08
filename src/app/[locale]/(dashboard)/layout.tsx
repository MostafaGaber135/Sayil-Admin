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
      <AppShell locale={locale}>{children}</AppShell>
    // </AuthGuard>
  );
}