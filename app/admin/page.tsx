import { db } from '@/lib/db';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const messages = await db.contactMessage.findMany({
    orderBy: { created_at: 'desc' }
  });

  const initiatives = await db.initiative.findMany({
    orderBy: { created_at: 'desc' }
  });

  return <AdminDashboard messages={messages} initiatives={initiatives} />;
}
