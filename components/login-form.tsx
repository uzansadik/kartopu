'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField } from './ui/form';
import { LoadingSwap } from './ui/loading-swap';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
  email: z
    .email({ message: 'Geçersiz email adresi.' })
    .min(5, { message: 'Email en az 5 karakter olmalıdır.' }),
  password: z.string().min(8, { message: 'Şifre en az 8 karakter olmalıdır.' }),
});
type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async (data: LoginFormData) => {
    const res = await authClient.signIn.email({
      ...data,
    });
    console.log(data);

    if (res.error) {
      toast.error(`Giriş başarısız: ${res.error.message}`);
      console.log('Login error:', res.error);
      return;
    }
    toast.success('Giriş başarılı! Hoşgeldiniz.');
    redirect('/');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Hoşgeldin, Giriş yap</CardTitle>
          <CardDescription>
            Apple veya Google hesabınızla giriş yapın ya da e-posta adresiniz ve
            şifrenizi kullanın.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <Button
              variant='outline'
              type='button'
              onClick={() =>
                authClient.signIn.social({
                  provider: 'twitter',
                  callbackURL: '/',
                })
              }
            >
              X ile giriş yap
            </Button>
            <Button
              variant='outline'
              type='button'
              onClick={() =>
                authClient.signIn.social({
                  provider: 'google',
                  callbackURL: '/',
                })
              }
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path
                  d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                  fill='currentColor'
                />
              </svg>
              Google ile giriş yap
            </Button>
          </Field>
          <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card mt-6 mb-6'>
            veya
          </FieldSeparator>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignIn)}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor='email'>Email</FieldLabel>
                      <Input
                        id='email'
                        placeholder='Email@domain.com'
                        required
                        {...field}
                      />
                      {fieldState.error ? (
                        <FieldError>{fieldState.error.message}</FieldError>
                      ) : null}
                    </Field>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor='password'>Şifre</FieldLabel>
                      <Input
                        id='password'
                        placeholder='Şifrenizi girin'
                        type='password'
                        {...field}
                      />
                      {fieldState.error ? (
                        <FieldError>{fieldState.error.message}</FieldError>
                      ) : null}
                    </Field>
                  )}
                />
                <Button disabled={!form.formState.isValid} type='submit'>
                  <LoadingSwap isLoading={form.formState.isSubmitting}>
                    Giriş Yap
                  </LoadingSwap>
                </Button>
                <FieldDescription className='text-center'>
                  <Link href='/kayit'>Hesabınız yok mu? Kayıt olun</Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center'>
        Devam ederek, <a href='/hizmet-sartlari.html'>Hizmet Şartları</a> ve{' '}
        <a href='/gizlilik-politikasi.html'>Gizlilik Politikası</a>'nı kabul
        etmiş olursunuz.
      </FieldDescription>
    </div>
  );
}
