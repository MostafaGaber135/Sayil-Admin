import AppShell from "@/shared/ui/AppShell/AppShell";
import { AuthGuard } from "@/shared/lib/auth/guards";

export default function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <AuthGuard>
      <AppShell locale={params.locale}>{children}</AppShell>
    </AuthGuard>
  );
}
