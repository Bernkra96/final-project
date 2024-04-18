import Link from 'next/link';

export default async function ItemPage() {
  // console.log('tokenCookie', tokenCooke, seactionIdUser);
  // console.log(comments);

  return (
    <>
      <h1 className="items text-center font-extrabold text-green-400">
        {' '}
        Error 404{' '}
      </h1>
      <h2 className="items text-center font-extrabold text-green-400">
        {' '}
        Profile Not Found
      </h2>
      <Link
        href="/"
        className=" flex  self-center justify-center rounded-md bg-green-600 px-3 py-1 p-6  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
      >
        {' '}
        Go Back Home
      </Link>
    </>
  );
}
