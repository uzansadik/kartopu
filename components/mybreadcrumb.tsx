'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { breadcrumbList } from '@/constants/constants';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

function MyBreadcrumb() {
  const pathname = usePathname().split('/').filter(Boolean).join(' / ');
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='hidden md:block'>
          <BreadcrumbLink href='#'>Anasayfa</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='hidden md:block' />
        <BreadcrumbItem>
          <BreadcrumbPage>
          <Suspense>
            {breadcrumbList[pathname as keyof typeof breadcrumbList] ||
              pathname}
              </Suspense>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default MyBreadcrumb;
