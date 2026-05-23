import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card } from '~/components/ui/card';
import { Form, Link, redirect } from 'react-router';
import type { Route } from './+types/Login';
import { userService } from '~/lib/services/user';
import { commitSession, getSession } from '~/lib/sessions.server';

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  if (!email || !password) {
    return
  }
  try {
    const response = await userService.post.login({ email, password });
    session.set("token", response.accessToken);
    return redirect('/', {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  } catch (error) {
    console.error(error);
  }
}

type FormErrors = { email?: string; password?: string };

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userErrors, setUserErrors] = useState<FormErrors>({});
  const NaverClientId = import.meta.env.VITE_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
  const NaverRedirectUri = import.meta.env.VITE_NAVER_AUTH_REDIRECT_URI; //Callback URL
  const State = "geulium-ieum"
  const NaverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NaverClientId}&state=${State}&redirect_uri=${NaverRedirectUri}`;
  const KakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  // const KakaoRestApiKey = 'f7fa95378edceb9434253f50fef1b79a';
  const KakaoRedirectUri = import.meta.env.VITE_KAKAO_AUTH_REDIRECT_URI;
  const KakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoClientId}&redirect_uri=${KakaoRedirectUri}&response_type=code`;

  const handleUserSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const errors: FormErrors = {};
    if (!email.trim()) errors.email = '이메일을 입력해주세요.';
    if (!password) errors.password = '비밀번호를 입력해주세요.';
    setUserErrors(errors);
    if (Object.keys(errors).length > 0) e.preventDefault();
  };

  const handleNaverLogin = () => {
    window.location.href = NaverAuthUrl;
  };

  const handleKakaoLogin = () => {
    window.location.href = KakaoAuthUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🕊️</span>
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">그리움 이음</h1>
          <p className="text-gray-600">로그인하여 서비스를 이용하세요</p>
        </div>

        <Form method="POST" className="space-y-4" onSubmit={handleUserSubmit}>
          <div className='space-y-2'>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (userErrors.email) setUserErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={userErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {userErrors.email && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {userErrors.email}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (userErrors.password) setUserErrors((prev) => ({ ...prev, password: undefined }));
              }}
              className={userErrors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {userErrors.password && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {userErrors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-600">로그인 유지</span>
            </label>
            <a href="/find-password" className="text-purple-600 hover:underline">
              비밀번호 찾기
            </a>
          </div>

          <Button type="submit" className="w-full">
            로그인
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button type="button" variant="ghost" className="h-auto w-full p-0" onClick={handleKakaoLogin}>
              <img src="/img/kakao_login.png" className="w-full" alt="kakao" />
            </Button>
            <Button type="button" variant="ghost" className="h-auto w-full p-0" onClick={handleNaverLogin}>
              <img src="/img/naver_login.png" className="w-full" alt="naver" />
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            계정이 없으신가요?{' '}
            <Link to="/register" className="text-purple-600 hover:underline">
              회원가입
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
