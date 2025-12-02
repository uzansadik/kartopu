'use client';

import { getProfileData } from '@/actions/profile';
import { SingleFileDropzone } from '@/components/single-file-dropzone';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/db/db';
import { authClient } from '@/lib/auth-client';
import { Settings, Shield, User2 } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';

export default function Page() {
  const { data: session } = authClient.useSession(); // session al
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id; // userId session'dan al

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getProfileData(userId); // Server action çağrısı
        setProfile(data);
      } catch (err) {
        console.error('Profil alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div className='flex m-auto flex-1 flex-col gap-4 p-4 pt-0 w-full md:w-4xl'>
      <Tabs defaultValue='account' className='w-full '>
        <TabsList className='mx-auto'>
          <TabsTrigger value='account'>
            <User2 />
           Profil</TabsTrigger>
          <TabsTrigger value='security'>
            <Shield/> Güvenlik</TabsTrigger>
        </TabsList>

        <TabsContent value='account'>
          <Card>
            <CardHeader>
              <CardTitle>Hesap Ayarları</CardTitle>
              <CardDescription>
                
              </CardDescription>
            </CardHeader>

            <CardContent className='grid gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='name'>İsim Soyisim</Label>
                <Input id='name' defaultValue={session?.user?.name ?? ''} />
              </div>

              <div className='grid gap-3'>
                <Label  htmlFor='username'>Email</Label>
                <Input
                  disabled
                  id='username'
                  defaultValue={session?.user?.email ?? ''}
                />
              </div>
              <div className='grid gap-3'>
                <SingleFileDropzone currentAvatarSrc={session?.user?.image ?? ''} />
              </div>

            </CardContent>


            <CardFooter>
              <Button>Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='security'>
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik</CardTitle>
              <CardDescription>
                Şifrenizi burada değiştirebilirsiniz.
              </CardDescription>
            </CardHeader>

            <CardContent className='grid gap-6'>
              <div className='grid gap-3 max-w-1md'>
                <Label htmlFor='current'>Mevcut şifre</Label>
                <Input id='current' type='password' />
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='new'>Yeni şifre</Label>
                <Input id='new' type='password' />
              </div>
            </CardContent>

            <CardFooter>
              <Button>Şifreyi Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='profile'>
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>
                Profil bilgilerinizi görüntüleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-6'>
              {loading ? (
                <p>Yükleniyor...</p>
              ) : profile ? (
                <div>
                  <Input type='hidden' value={profile.id} />
                  <Input type='hidden' value={profile.userId} />
                  <Input type='text ' value={profile.username} />
                  <p>Kullanıcı Adı: {profile?.username}</p>
                  <p>Web Sitesi: {profile?.website}</p>
                </div>
              ) : (
                <p>Profil bulunamadı.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
