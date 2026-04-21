import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AppSidebar />
      <div className="flex-1 flex flex-col relative">
        <AppHeader />
        <main className="flex-1 p-8 overflow-auto h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}