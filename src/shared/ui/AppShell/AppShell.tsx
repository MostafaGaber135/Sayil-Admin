import { AppTopbar, AppSidebar } from "@/shared/ui/AppShell";

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
    locale?: string;
}) {
    return (
        <div className="min-h-screen bg-background">
            <AppTopbar />
            <div className="flex">
                <aside className="hidden md:flex md:fixed md:top-16 md:bottom-0 md:w-64 md:bg-background md:inset-s-0 md:border-e">
                    <AppSidebar />
                </aside>

                <div className="w-full md:ps-64">
                    <main className="p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
