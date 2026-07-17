import { Suspense } from 'react';
import { db } from '@/lib/db';
import AdminDashboard from './AdminDashboard';
import { logoutAction } from './actions';

export const dynamic = 'force-dynamic';

async function DashboardData() {
  const messages = await db.contactMessage.findMany({
    orderBy: { created_at: 'desc' },
    select: { id: true, name: true, email: true, message: true, is_testimonial: true }
  });

  const initiatives = await db.initiative.findMany({
    orderBy: { created_at: 'desc' },
    select: { id: true, title: true, description: true, image_url: true }
  });

  return <AdminDashboard messages={messages} initiatives={initiatives} />;
}

function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 animate-pulse">
      <div className="flex gap-4 mb-8">
        <div className="h-12 w-56 bg-gray-200 rounded-lg"></div>
        <div className="h-12 w-48 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="h-[500px] w-full bg-gray-200 rounded-xl"></div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <nav className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#6E1110]">Ramakirti Foundation Admin</h1>
        <form action={logoutAction}>
          <button 
            type="submit"
            className="text-gray-500 hover:text-gray-800 text-sm font-semibold px-4 py-2 border rounded-md"
          >
            Logout
          </button>
        </form>
      </nav>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardData />
      </Suspense>
    </div>
  );
}
