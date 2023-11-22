import React from 'react';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button
        className=" w-92% m-2 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        formAction={logout}
      >
        Logout
      </button>
    </form>
  );
}
