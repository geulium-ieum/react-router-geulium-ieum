import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import React, { useEffect, useState } from "react";
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

    try {
        await userService.put.userProfile({
            name,
            phone,
            marketingAgreed: isMarketingAgreed,
            userId: user.id,
            token
        });
        return { isUpdated: true, updatedAt: Date.now() };
    } catch (error) {
        console.error(error);
        return { isUpdated: false, updatedAt: Date.now() };
    }
}

export default function Mypage({ loaderData, actionData }: Route.ComponentProps) {
    const { user } = loaderData;
    const isUpdated = actionData?.isUpdated;
    const updatedAt = actionData?.updatedAt;

    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(user.name || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [marketingAgreed, setMarketingAgreed] = useState<"true" | "false">(String(user.marketingAgreed) as "true" | "false" || "false");

    const handleEditUserInfo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsEdit(true);
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]{0,13}$/;
        if (regex.test(e.target.value)) {
            setPhone(e.target.value);
        }
    };

    useEffect(() => {
        if (isUpdated === undefined) return;
        setIsEdit(!isUpdated);
    }, [isUpdated, updatedAt]);

    return (
        <div className="max-w-7xl mx-auto min-h-[calc(100vh-398px)] px-4 sm:px-6 lg:px-8 py-12">
            <FlexDiv className="flex-col gap-y-6">
                <h1 className="text-3xl text-gray-900">마이페이지</h1>
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
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={handleChangeName}
                                        disabled={!isEdit}
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="phone">휴대폰 번호</FieldLabel>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={handleChangePhone}
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
                                        <Switch
                                            id="marketingAgreed"
                                            disabled={!isEdit}
                                        />
                                        <FieldLabel htmlFor="marketingAgree">
                                            마케팅 수신 동의
                                        </FieldLabel>
                                    </FlexDiv>
                                </Field>
                                <Field>
                                    {isEdit ? (
                                        <Button type="submit">
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
                {/* TODO: 추모글, 추모관 작업 */}
                <Card>
                    <CardHeader>
                        <CardTitle>내가 남긴 추모글</CardTitle>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>관리 중인 추모관</CardTitle>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
            </FlexDiv>
        </div>
    )
}
