import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <button type="submit" className="bg-blue-400 text-white p-2 rounded">
        Signin with Google
      </button>
    </form>
  );
}
