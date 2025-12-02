import SessionGuard from '@/components/server/SessionGuard';
import { Spinner } from '@/components/ui/spinner';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Suspense fallback={<Spinner className='mx-auto h-auto' />}>
      <SessionGuard>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            <div className='bg-muted/50 aspect-video rounded-xl' />
            <div className='bg-muted/50 aspect-video rounded-xl' />
            <div className='bg-muted/50 aspect-video rounded-xl' />
          </div>
          <div className='bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min' />
          
        </div>
      </SessionGuard>
    </Suspense>
  );
}
