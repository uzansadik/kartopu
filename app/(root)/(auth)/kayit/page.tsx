import { MountainSnow } from 'lucide-react';

import { SignupForm } from '@/components/signup-form';
import Image from 'next/image';
import Logo from '@/components/logo';
export default function SignupPage() {
  return (
    <div className=' flex min-h-svh flex-col items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col '>
        <SignupForm />
      </div>
    </div>
  );
}
