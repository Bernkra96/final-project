import React from 'react';
import { logout } from './actions';

export default function LogoutButton() {
  return <button formAction={logout()}>Logout </button>;
}
