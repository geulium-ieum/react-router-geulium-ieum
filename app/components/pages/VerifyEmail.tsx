import FlexDiv from "~/components/FlexDiv";
import { userService } from "~/lib/services/user";
import { useEffect, useState } from "react";
import { Form, redirect } from "react-router";
import type { Route } from "./+types/VerifyEmail";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const code = formData.get('code') as string;
    if (!email || !code) {
        return redirect('/login');
    }
    try {
        await userService.post.verifyEmail({ email, code });
        return redirect('/login');
    } catch (error) {
        console.error(error);
        // return redirect('/login');
    }
}

export default function VerifyEmail() {
    const [code, setCode] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const emailFromSessionStorage = window.sessionStorage.getItem('email');
        if (emailFromSessionStorage) {
            setEmail(emailFromSessionStorage);
        }
    }, []);

    return (
        <FlexDiv className="min-h-dvh items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 py-12 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">이메일 인증</CardTitle>
                    <CardDescription>이메일 인증을 위해 인증 코드를 입력해주세요.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form method="POST" className="flex flex-col gap-4 w-78">
                        <Input
                            type="hidden"
                            name="email"
                            value={email}
                        />
                        <Input
                            type="text"
                            name="code"
                            placeholder="인증 코드"
                            value={code}
                            className="bg-white"
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={!email || !code}
                        >
                            인증
                        </Button>
                    </Form>
                </CardContent>
            </Card>
        </FlexDiv>
    )
}
