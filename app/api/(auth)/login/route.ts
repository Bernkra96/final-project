'use server';

import { NextResponse, NextRequest } from 'next/server';

import { z } from 'zod';
import { bcrypt } from 'bcrypt';
import {
  createUser,
  getUserByUsername,
  getUserWithPasswordHashByUsername,
} from '../../../../database/users';
import { User } from '../../../../database/createTableusers';

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export type loginResponseBodyPost =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<loginResponseBodyPost>> {
  const body = await request.json();

  const result = registerSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const UserWithPasswordHash = await getUserWithPasswordHashByUsername(
    result.data.username,
    UserWithPasswordHash.passordHash,
  );

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'username is already taken' }] },
      { status: 403 },
    );
  }
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  const newUser = await createUser(result.data.username, passwordHash);

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }

  return NextResponse.json({
    user: newUser,
  });
}
