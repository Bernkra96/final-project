import { type } from 'os';
import React from 'react';

type Props = {
  params: { username: string };
};

export default function userProfilePage({ params }: Props) {
  console.log('ceck', params);
  return (
    <div>
      {' '}
      <h2>{params.username} Prfile</h2>{' '}
    </div>
  );
}
