import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import React, { useEffect, useState } from "react";
import type { Route } from "./+types/Mypage";
import { userContext } from "~/context/userContext";
import { getSession } from "~/lib/sessions.server";
import { Form, redirect, useRevalidator } from "react-router";
import { userService } from "~/lib/services/user";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "~/components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Switch } from "~/components/ui/switch";
import FlexDiv from "~/components/FlexDiv";
import { updatedTime } from "~/lib/utils";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import moment from "moment";
import { tributeService } from "~/lib/services/tribute";
import { toast } from "sonner";

const visibilityOptions = [
    { value: "PUBLIC", label: "공개", className: "rounded-full bg-blue-100 text-blue-500!" },
    { value: "PRIVATE", label: "비공개", className: "rounded-full bg-red-100 text-red-500!" },
];

const statusOptions = [
    { value: "PENDING", label: "승인 대기 중", className: "rounded-full bg-yellow-100 text-yellow-500!" },
    { value: "REJECT", label: "거절", className: "rounded-full bg-red-100 text-red-500!" },
    { value: "APPROVED", label: "승인", className: "rounded-full bg-green-100 text-green-500!" },
    { value: "CANCEL", label: "취소", className: "rounded-full bg-gray-100 text-gray-500!" },
];

export async function loader({ request, context }: Route.LoaderArgs) {
    const user = context.get(userContext);
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const token = session.get("token");
    if (!user || !token) {
        return redirect('/login');
    }
    try {
        const myTributes = await tributeService.get.tributeList({ userId: user.id, token });
        const myMemorials = await userService.get.memorialList({ token });
        return {
            user,
            token,
            myTributes: myTributes.content,
            myMemorials: myMemorials.content,
        };
    } catch (error) {
        console.log(error);
        return { user, token, myTributes: [], myMemorials: [] };
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
    if (!user || !token) {
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
    const { user, token, myTributes, myMemorials } = loaderData;
    const isUpdated = actionData?.isUpdated;
    const updatedAt = actionData?.updatedAt;

    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(user.name || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [marketingAgreed, setMarketingAgreed] = useState<"true" | "false">(String(user.marketingAgreed) as "true" | "false" || "false");
    const [selectedTributeId, setSelectedTributeId] = useState<string>("");
    const [tributeIsOpen, setTributeIsOpen] = useState<boolean>(false);
    const [selectedMemorialId, setSelectedMemorialId] = useState<string>("");
    const [memorialIsOpen, setMemorialIsOpen] = useState<boolean>(false);

    const [isTributeEdit, setIsTributeEdit] = useState(false);
    const [tributeForm, setTributeForm] = useState({
        content: "",
        visibility: "",
    });
    const [isMemorialEdit, setIsMemorialEdit] = useState(false);
    const [memorialForm, setMemorialForm] = useState({
        deceasedName: "",
        location: "",
        birthDate: "",
        deathDate: "",
        biography: "",
        visibility: "",
        status: "",
        photoUrl: "",
    });

    const revalidator = useRevalidator();

    const selectedMemorial = myMemorials.find((memorial) => memorial.id === selectedMemorialId);

    // TODO: 등록자, 수정자 수정 필요
    const memorialReadOnlyFields = selectedMemorial ? [
        { label: "등록자", value: selectedMemorial.createdBy },
        { label: "수정자", value: selectedMemorial.updatedBy },
        { label: "등록일", value: moment(selectedMemorial.createdAt).format("YYYY-MM-DD HH:mm") },
        { label: "수정일", value: moment(selectedMemorial.updatedAt).format("YYYY-MM-DD HH:mm") },
    ] : [];

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

    const handleViewTribute = (tributeId: string) => {
        const tribute = myTributes.find((tribute) => tribute.id === tributeId);
        setSelectedTributeId(tributeId);
        setIsTributeEdit(false);
        if (tribute) {
            setTributeForm({
                content: tribute.content,
                visibility: tribute.isPublic ? "PUBLIC" : "PRIVATE",
            });
        }
        setTributeIsOpen(true);
    };

    const handleViewMemorial = (memorialId: string) => {
        const memorial = myMemorials.find((memorial) => memorial.id === memorialId);
        setSelectedMemorialId(memorialId);
        setIsMemorialEdit(false);
        if (memorial) {
            setMemorialForm({
                deceasedName: memorial.deceasedName,
                location: memorial.location || "",
                birthDate: memorial.birthDate,
                deathDate: memorial.deathDate,
                biography: memorial.biography || "",
                visibility: memorial.visibility,
                status: memorial.status,
                photoUrl: memorial.photoUrl || "",
            });
        }
        setMemorialIsOpen(true);
    };

    const handleTributeOpenChange = (open: boolean) => {
        setTributeIsOpen(open);
        if (!open) {
            setIsTributeEdit(false);
        }
    }

    const handleChangeTributeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTributeForm((prev) => ({ ...prev, content: e.target.value }));
    };

    const handleToggleTributeEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isTributeEdit) {
            try {
                await tributeService.put.tribute({
                    id: selectedTributeId,
                    token: token!
                });
                revalidator.revalidate();
                toast.success("추모글을 수정했습니다.");
            } catch (error) {
                console.error(error);
                toast.error("추모글 수정에 실패했습니다.");
            }
        }
        setIsTributeEdit((prev) => !prev);
    };

    const handleMemorialOpenChange = (open: boolean) => {
        setMemorialIsOpen(open);
        if (!open) {
            setIsMemorialEdit(false);
        }
    };

    const handleChangeMemorialField = (field: keyof typeof memorialForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setMemorialForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleToggleMemorialEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isMemorialEdit) {
            // TODO: API 작업
        }
        setIsMemorialEdit((prev) => !prev);
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
                <Card>
                    <CardHeader>
                        <CardTitle>내가 남긴 추모글</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {myTributes.length === 0 && (
                                <div className="text-center text-gray-500">
                                    내가 남긴 추모글이 없습니다.
                                </div>
                            )}
                            {myTributes.map((tribute) => (
                                <Card key={tribute.id} className="p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3>{tribute.content}</h3>
                                        <p className="text-sm text-gray-500">
                                            {updatedTime(tribute.createdAt)}
                                        </p>
                                    </div>
                                    <p className="text-gray-700">{tribute.content}</p>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleViewTribute(tribute.id)}
                                        >
                                            수정
                                        </Button>
                                        <Button variant="destructive">삭제</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <Dialog open={tributeIsOpen} onOpenChange={handleTributeOpenChange}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>추모글</DialogTitle>
                                </DialogHeader>
                                {selectedTributeId && (
                                    <div className="space-y-4">
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="tribute-content">내용</FieldLabel>
                                                <Textarea
                                                    id="tribute-content"
                                                    value={tributeForm.content}
                                                    onChange={handleChangeTributeContent}
                                                    disabled={!isTributeEdit}
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="tribute-visibility">공개 여부</FieldLabel>
                                                <Combobox
                                                    items={visibilityOptions}
                                                    itemToStringValue={(option) => option.label}
                                                    value={visibilityOptions.find((option) => option.value === tributeForm.visibility) ?? null}
                                                    onValueChange={(option) => setTributeForm((prev) => ({ ...prev, visibility: option?.value ?? "" }))}
                                                    disabled={!isTributeEdit}
                                                >
                                                    <ComboboxInput id="tribute-visibility" placeholder="공개 여부를 선택해주세요" />
                                                    <ComboboxContent className="pointer-events-auto">
                                                        <ComboboxEmpty>검색 결과가 없습니다</ComboboxEmpty>
                                                        <ComboboxList>
                                                            {(option) => (
                                                                <ComboboxItem key={option.value} value={option}>
                                                                    <Badge className={option.className}>{option.label}</Badge>
                                                                </ComboboxItem>
                                                            )}
                                                        </ComboboxList>
                                                    </ComboboxContent>
                                                </Combobox>
                                            </Field>
                                        </FieldGroup>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                onClick={handleToggleTributeEdit}
                                            >
                                                {isTributeEdit ? "완료" : "수정"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => handleTributeOpenChange(false)}
                                            >
                                                닫기
                                            </Button>
                                        </DialogFooter>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>관리 중인 추모관</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myMemorials.length === 0 && (
                                <div className="text-center text-gray-500">
                                    내 추모관이 없습니다.
                                </div>
                            )}
                            {myMemorials.map(memorial => (
                                <Card
                                    key={memorial.id}
                                    className="py-0 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => handleViewMemorial(memorial.id)}
                                >
                                    <div className="aspect-square relative overflow-hidden bg-gray-200">
                                        <img
                                            src={memorial.photoUrl || "https://placehold.co/380x380/png"}
                                            alt="추모관 사진"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="mb-1">{memorial.deceasedName}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{memorial.location}</p>
                                        <p className="text-sm text-gray-500">{memorial.deathDate}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <Dialog open={memorialIsOpen} onOpenChange={handleMemorialOpenChange}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{selectedMemorial?.deceasedName} 추모관</DialogTitle>
                                </DialogHeader>
                                {selectedMemorial && (
                                    <div className="space-y-4">
                                        <div className="aspect-square w-32 mx-auto overflow-hidden bg-gray-200">
                                            <img
                                                src={memorialForm.photoUrl || "https://placehold.co/380x380/png"}
                                                alt="추모관 사진"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="deceasedName">이름</FieldLabel>
                                                <Input
                                                    id="deceasedName"
                                                    value={memorialForm.deceasedName}
                                                    onChange={handleChangeMemorialField("deceasedName")}
                                                    disabled={!isMemorialEdit}
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="location">안치 장소</FieldLabel>
                                                <Input
                                                    id="location"
                                                    value={memorialForm.location}
                                                    onChange={handleChangeMemorialField("location")}
                                                    disabled={!isMemorialEdit}
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="birthDate">생년월일</FieldLabel>
                                                <Input
                                                    id="birthDate"
                                                    type="date"
                                                    value={memorialForm.birthDate}
                                                    onChange={handleChangeMemorialField("birthDate")}
                                                    disabled={!isMemorialEdit}
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="deathDate">기일</FieldLabel>
                                                <Input
                                                    id="deathDate"
                                                    type="date"
                                                    value={memorialForm.deathDate}
                                                    onChange={handleChangeMemorialField("deathDate")}
                                                    disabled={!isMemorialEdit}
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="biography">소개</FieldLabel>
                                                <Input
                                                    id="biography"
                                                    value={memorialForm.biography}
                                                    onChange={handleChangeMemorialField("biography")}
                                                    disabled={!isMemorialEdit}
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="visibility">공개 여부</FieldLabel>
                                                <Combobox
                                                    items={visibilityOptions}
                                                    itemToStringValue={(option) => option.label}
                                                    value={visibilityOptions.find((option) => option.value === memorialForm.visibility) ?? null}
                                                    onValueChange={(option) => setMemorialForm((prev) => ({ ...prev, visibility: option?.value ?? "" }))}
                                                    disabled={!isMemorialEdit}
                                                >
                                                    <ComboboxInput id="visibility" placeholder="공개 여부를 선택해주세요" />
                                                    <ComboboxContent className="pointer-events-auto">
                                                        <ComboboxEmpty>검색 결과가 없습니다</ComboboxEmpty>
                                                        <ComboboxList>
                                                            {(option) => (
                                                                <ComboboxItem key={option.value} value={option}>
                                                                    <Badge className={option.className}>{option.label}</Badge>
                                                                </ComboboxItem>
                                                            )}
                                                        </ComboboxList>
                                                    </ComboboxContent>
                                                </Combobox>
                                            </Field>
                                            <Field className="w-fit">
                                                <FieldLabel htmlFor="status">상태</FieldLabel>
                                                <Badge className={statusOptions.find((option) => option.value === memorialForm.status)?.className}>
                                                    {statusOptions.find((option) => option.value === memorialForm.status)?.label ?? memorialForm.status}
                                                </Badge>
                                            </Field>
                                        </FieldGroup>
                                        <dl className="space-y-2">
                                            {memorialReadOnlyFields.map((field) => (
                                                <div key={field.label} className="flex items-start justify-between gap-4">
                                                    <dt className="text-gray-500 shrink-0">{field.label}</dt>
                                                    <dd className="text-right break-all">{field.value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                onClick={handleToggleMemorialEdit}
                                            >
                                                {isMemorialEdit ? "완료" : "수정"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => handleMemorialOpenChange(false)}
                                            >
                                                닫기
                                            </Button>
                                        </DialogFooter>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </FlexDiv>
        </div>
    )
}
