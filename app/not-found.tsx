'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { use } from 'react';

export default function NotFound() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 p-1 md:p-5'>
      <h2>Sayfa Bulunamadı</h2>
      <p>İstenen kaynak bulunamadı</p>
      <Button asChild>
        <Link href='/'>Anasayfaya Dön</Link>
      </Button>

      <Button variant='outline' asChild>
        <Link href='#' onClick={() => console.log(history.back())}>
          Önceki Sayfaya Dön
        </Link>
      </Button>
    </div>
  );
}
