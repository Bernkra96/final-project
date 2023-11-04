import { NextRequest, NextResponse } from 'next/server';

export type ProfileResponseBodyPost =
  | {
      user: { username: string };
    }
  | {
      errors: { message: string }[];
    };

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<ProfileResponseBodyPost>> {
  const tst = 'userWithPasswordHash.username';

  return NextResponse.json({
    user: {
      username: tst,
    },
  });
}

export async function PATCH(
  request: NextRequest,
): Promise<NextResponse<ProfileResponseBodyPost>> {
  const tst = 'userWithPasswordHash.username';
  return NextResponse.json({
    user: {
      username: tst,
    },
  });
}
