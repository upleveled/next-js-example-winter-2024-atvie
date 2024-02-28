type Props = {
  params: {
    username: string;
  };
};

export default function UserProfilePage(props: Props) {
  // Coming up in subsequent lectures
  // Task: Add redirect to login page if user is not logged in
  // 1. Check if the sessionToken cookie exists
  // 2. Query the current user with the sessionToken
  // 3. If user doesn't exist, redirect to login page
  // 4. If user exists, render the page

  return (
    <div>
      <h2>{props.params.username}'s Profile</h2>
    </div>
  );
}
