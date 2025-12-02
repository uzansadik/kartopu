import { MountainSnow } from 'lucide-react';

import { LoginForm } from '@/components/login-form';
import Logo from '@/components/logo';

export default function LoginPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center '>
      <div className='flex w-full max-w-sm flex-col'>
        <LoginForm />
      </div>
    </div>
  );
}
