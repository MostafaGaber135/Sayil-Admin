// import { GuestGuard } from "@/shared/lib/auth/guards";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // <GuestGuard>
      <div className="min-h-screen">{children}</div>
    // </GuestGuard>
  );
}
