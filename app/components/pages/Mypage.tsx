import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import type { Route } from "./+types/Mypage";
import { userContext } from "~/context/userContext";
import { getSession } from "~/lib/sessions.server";
import { Form, redirect } from "react-router";
import { userService } from "~/lib/services/user";
import { Input } from "~/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Switch } from "../ui/switch";
import FlexDiv from "../FlexDiv";

export async function loader({ request, context }: Route.LoaderArgs) {
    const user = context.get(userContext);
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const token = session.get("token");
    if (!user || !token) {
        return redirect('/login');
    }
    try {
        const myTributes = await userService.get.tributeList({ userId: user.id, token });
        const myMemorials = await userService.get.memorialList({ token });
        return {
            user,
            myTributes: myTributes.content,
            myMemorials: myMemorials.content,
        };
    } catch (error) {
        console.log(error);
        return { user, myTributes: [], myMemorials: [] };
    }
}

export async function action({ request, context }: Route.ActionArgs) {
    const user = context.get(userContext);
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const token = session.get("token");
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const marketingAgreed = formData.get("marketingAgreed") as "true" | "false";
    const isMarketingAgreed = marketingAgreed === "true";
    if(!user || !token) {
        return redirect('/login');
    }

    // TODO: 수정 버튼을 눌렀을 떄 API 호출 안되도록 수정 필요
    try {
        await userService.put.userProfile({
            name,
            phone,
            marketingAgreed: isMarketingAgreed ? true : false,
            userId: user.id,
            token
        })
    } catch (error) {
        console.error(error);
    }
}

export default function Mypage({ loaderData }: Route.ComponentProps) {
    const { user } = loaderData;

    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [marketingAgreed, setMarketingAgreed] = useState<"true" | "false">("false");

    const handleEditUserInfo = () => {
        setIsEdit(true);
    };

    return (
        <div className="max-w-7xl mx-auto min-h-[calc(100vh-398px)] px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl text-gray-900 mb-2">마이페이지</h1>
            <Card>
                <CardHeader>
                    <CardTitle>내 정보</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form method="PUT">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">이름</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    defaultValue={user.name}
                                    disabled={!isEdit}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="phone">휴대폰 번호</FieldLabel>
                                <Input
                                    id="phone"
                                    type="tel"
                                    defaultValue={user.phone}
                                    disabled={!isEdit}
                                />
                            </Field>
                            <Field>
                                <Input
                                    type="hidden"
                                    name="marketingAgreed"
                                    value={marketingAgreed}
                                />
                                <FlexDiv className="flex gap-x-2 items-center">
                                    <Switch id="marketingAgreed" />
                                    <FieldLabel htmlFor="marketingAgree">
                                        마케팅 수신 동의
                                    </FieldLabel>
                                </FlexDiv>
                            </Field>
                            <Field>
                                {isEdit ? (
                                    <Button onClick={handleEditUserInfo}>
                                        완료
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={handleEditUserInfo}
                                    >
                                        수정
                                    </Button>
                                )}
                            </Field>
                        </FieldGroup>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
