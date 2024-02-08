import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div>
      Sorry this page was not found make sure you visit a page that exists
      <div>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
