import RegisterForm from './RegisterForm';

type Props = {
  searchParams: {
    returnTo?: string | string[];
  };
};

export default function RegisterPage({ searchParams }: Props) {
  return <RegisterForm returnTo={searchParams.returnTo} />;
}
