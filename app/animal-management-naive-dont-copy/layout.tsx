import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSession } from '../../database/sessions';

type Props = {
  children: React.ReactNode;
};

export default async function AnimalsNaiveLayout(props: Props) {
  // Task: Add a middleware to set the x-pathname header

  // 1. Get the headers
  const headersList = headers();

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) redirect(`/login?returnTo=${headersList.get('x-pathname')}`);

  return <div>{props.children}</div>;
}
