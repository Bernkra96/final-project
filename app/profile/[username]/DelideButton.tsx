'use client';

import React from 'react';
import { deleteUser } from './DelideButtonAction';

export default function DeleteuserButton() {
  return (
    <form>
      <button formAction={deleteUser}>Delete</button>
    </form>
  );
}
