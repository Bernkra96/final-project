'use client';

import React, { useState } from 'react';
import { CancheUserBodyPost } from '../../api/(auth)/profle';
import { EditUser } from './EditFromAction';

export default function EditFrom() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState();

  return (
    <form>
      <label>
        User Name
        <input onChange={(e) => setUsername(e.currentTarget.value)} />
      </label>
      <button>Edit</button>
    </form>
  );
}
