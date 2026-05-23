import { Button } from '~/components/ui/button';
import { redirect } from 'react-router';
import type { Route } from './+types/NaverLogin';
import { userService } from '~/lib/services/user';
import { commitSession } from '~/lib/sessions.server';
import { getSession } from '~/lib/sessions.server';

export async function loader ({request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code') as string;
  try {
    const response = await userService.post.naverLogin({ code, redirectUri: import.meta.env.VITE_NAVER_AUTH_REDIRECT_URI });
    const session = await getSession(request.headers.get("Cookie"));
    session.set("token", response.accessToken);
    return redirect('/', {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export default function NaverLogin() {
    return null;
  }