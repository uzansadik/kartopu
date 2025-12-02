'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ModeToggle } from './ui/mode-toggle';
import Logo from './logo';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

export function Header() {
  const { data: session, isPending: isLoading } = authClient.useSession();
  return (
    <>
      <Logo />
      <div>
        <NavigationMenu className='hidden md:visible md:flex '>
          <NavigationMenuList className='hover:bg-muted/50 rounded-md'>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=''>
                Özellikler
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] '>
                  <li className='row-span-3'>
                    <NavigationMenuLink asChild>
                      <a
                        className='from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6'
                        href='/'
                      >
                        <div className='mb-2 font-medium sm:mt-4'>
                          Pörtföy Yönetimi
                        </div>
                        <p className='text-muted-foreground text-sm leading-tight'>
                          Yatırımlarınızı kolayca takip edin.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href='/docs' title='Gelir/Gider Takibi'>
                    Gelir ve giderlerinizi kolayca takip edin.
                  </ListItem>
                  <ListItem href='/docs' title='Temett Takibi'>
                    Temettü gelirinizi izleyin ve analiz edin.
                  </ListItem>
                  <ListItem href='/docs' title='Yatırım Fırsatları'>
                    En güncel yatırım fırsatlarını keşfedin.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Hesaplamalar</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                  <ListItem href='/docs' title='Gelir/Gider Takibi'>
                    Gelir ve giderlerinizi kolayca takip edin.
                  </ListItem>
                  <ListItem href='/docs' title='Temettü Hesaplama'>
                    Temettü gelirinizi izleyin ve analiz edin.
                  </ListItem>
                  <ListItem href='/docs' title='Yatırım Fırsatları'>
                    En güncel yatırım fırsatlarını keşfedin.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
        {session ? (
          <div className='flex flex-row gap-2'>
            <ModeToggle />
            <Avatar>
              <Image
                src={
                  session.user?.image ? session.user.image : '/no-avatar.png'
                }
                alt={session.user?.name}
                width={32}
                height={32}
                className='rounded-full'
              />
            </Avatar>
            <Button variant='destructive' onClick={() => authClient.signOut()}>
              Çıkış Yap
            </Button>
          </div>
        ) : (
          <div className='flex flex-row gap-2'>
            <ModeToggle />
            <Button asChild>
              <Link href='/giris'>Giriş Yap</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className='text-sm leading-none font-medium'>{title}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
