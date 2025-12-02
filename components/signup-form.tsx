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
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from './ui/form';
import { LoadingSwap } from './ui/loading-swap';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { send } from 'process';
import { sendWelcomeEmail } from '@/server/email/send-email';

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Kullanıcı adı en az 2 karakter olmalıdır.' }),
  email: z
    .email({ message: 'Geçersiz email adresi.' })
    .min(5, { message: 'Email en az 5 karakter olmalıdır.' }),
  password: z.string().min(8, { message: 'Şifre en az 8 karakter olmalıdır.' }),
});
type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSignUp = async (data: SignUpFormData) => {
    const res = await authClient.signUp.email({
      ...data,
    });

    if (res.error) {
      toast.error(`Kayıt başarısız: ${res.error.message}`);
      console.log('Signup error:', res.error);
      return;
    }
    toast.success('Kayıt başarılı! Uygulamaya yönlendiriliyorsunuz...');
    sendWelcomeEmail(data.name, data.email);
    redirect('/');
  };

  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Kayıt ol</CardTitle>
          <CardDescription>
            Hesabınızı oluşturmak için e-posta adresinizi ve şifrenizi girin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignUp)}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor='name'>İsim Soyisim</FieldLabel>
                      <Input id='name' placeholder='' required {...field} />
                      {fieldState.error ? (
                        <FieldError className='pt-0'>
                          {fieldState.error.message}
                        </FieldError>
                      ) : null}
                    </Field>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor='email'>Email</FieldLabel>
                      <Input id='email' placeholder='' required {...field} />
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
                <Field>
                  <Button disabled={!form.formState.isValid} type='submit'>
                    <LoadingSwap isLoading={form.formState.isSubmitting}>
                      Hesap Oluştur
                    </LoadingSwap>
                  </Button>
                  <FieldDescription className='text-center'>
                    Zaten bir hesabınız var mı? <a href='/giris'>Giriş yap</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center'>
        Üye olarak <a href='/hizmet-sartlari.html'>Kullanım Şartları</a> ve{' '}
        <a href='/gizlilik-politikasi.html'>Gizlilik Politikası</a>'nı kabul
        ediyorsunuz.
      </FieldDescription>
    </div>
  );
}
