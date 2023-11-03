'use client';

import { fromCamel } from 'postgres';
import React, { useState } from 'react';
import { createComment } from '../../../database/commnts';
import { getUserBySessionToken } from '../../../database/users';

export default function CreateComment(postid: Number) {
  const [post, setPost] = useState('');

  console.log('postid', postid);
  return (
    <>
      <h2> Make New Comment </h2>
    </>
  );
}
