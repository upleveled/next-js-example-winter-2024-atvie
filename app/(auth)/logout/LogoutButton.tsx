import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button className="logoutButton" formAction={logout}>
        Logout
      </button>
    </form>
  );
}
