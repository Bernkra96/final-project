import { type } from 'os';
import LoginFrom from './llogInFrom';

type Props = { searchParams?: string | string[] };

export default function LoginPage({ searchParams }: Props) {
  return <LoginFrom returnTo={searchParams.returnTo} />;
}
