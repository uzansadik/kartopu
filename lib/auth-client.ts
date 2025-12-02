import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient();

const signIn = async () => {
  await authClient.signIn.social({
    provider: ['google', 'twitter'],
  });
};

export { signIn };
