'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartBarIcon,
  Command,
  Frame,
  GalleryVerticalEnd,
  icons,
  Link,
  LogInIcon,
  Map,
  MountainSnowIcon,
  PieChart,
  Settings2,
  SquareTerminal,
  UserCheck2,
  UserCheck2Icon,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import Logo from './logo';
import { Button } from './ui/button';
import { Collapsible } from './ui/collapsible';
import { Span } from 'next/dist/trace';

// This is sample data.
const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/asdadas',
      icon: MountainSnowIcon,
      isCollapsible: false,
    },
    {
      title: 'Portföy',
      url: '/dashboard/portfoy',
      icon: ChartBarIcon,
      isCollapsible: false,
      items: [
        {
          title: 'Genel Bakış',
          url: '/dashboard/portfoy/genel-bakis',
        },
        {
          title: 'Performans',
          url: '/dashboard/portfoy/performans',
        },
        {
          title: 'Analiz',
          url: '/dashboard/portfoy/analiz',
        },
      ],
    },
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      isCollapsible: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    data: session,
    isPending: isLoading,
    error,
  } = authClient.useSession();

  // Debug için console log ekleyin
  React.useEffect(() => {
  }, [session, isLoading, error]);

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:p-1.5!'
            >
              <a href='#'>
                <Logo />
                <span className='text-base font-semibold'>Kartopu</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {!isLoading && session && (
          <NavUser
            user={{
              email: session?.user?.email || '',
              name: session?.user?.name || '',
              avatar: session?.user?.image || '',
            }}
          />
        )}
        {!isLoading && !session && (
          <>
            <SidebarMenuButton tooltip='Giriş Yap'>
              <LogInIcon />
              <a href='/giris'>
                <span>Giriş Yap</span>
              </a>
            </SidebarMenuButton>

            <SidebarMenuButton variant={'primary'} tooltip='Kayıt Ol'>
              <UserCheck2Icon />
              <a href='/kayit'>
                <span>Kayıt Ol</span>
              </a>
            </SidebarMenuButton>
          </>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
