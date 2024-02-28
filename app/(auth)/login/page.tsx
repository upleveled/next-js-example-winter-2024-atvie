import LoginForm from './LoginForm';

type Props = {
  searchParams: {
    returnTo?: string | string[];
  };
};

export default function LoginPage({ searchParams }: Props) {
  // Coming up in subsequent lectures
  // Task: Add redirect to home if user is logged in
  // 1. Checking if the sessionToken cookie exists
  // 2. Check if the sessionToken cookie is still valid
  // 3. If the sessionToken cookie is valid, redirect to home
  // 4. If the sessionToken cookie is invalid or doesn't exist, show the login form
  // redirect(getSafeReturnToPath(searchParams.returnTo) || '/');

  return <LoginForm returnTo={searchParams.returnTo} />;
}
