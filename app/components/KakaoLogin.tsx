import { userService } from '~/lib/services/user';
import { redirect } from 'react-router';
import type { Route } from './+types/KakaoLogin';
import { getSession } from '~/lib/sessions.server';
import { commitSession } from '~/lib/sessions.server';

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code') as string;
    const redirectUri = import.meta.env.VITE_KAKAO_AUTH_REDIRECT_URI!;
    try {
        const response = await userService.post.kakaoLogin({ code, redirectUri });
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

export default function KakaoLogin() {
    return null;
}