import { userContext } from "~/context/userContext";
import type { Route } from "./+types/Detail";
import { getSession } from "~/lib/sessions.server";
import { redirect, useNavigate } from "react-router";
import { familyGroupService } from "~/lib/services/familyGroup";
import { userService } from "~/lib/services/user";
import { Button } from "~/components/ui/button";
import { ArrowLeftIcon, PlusIcon, StickyNoteOff, Trash2, UserPlus, UserRoundX, Users } from "lucide-react";
import FlexDiv from "~/components/FlexDiv";
import { Card } from "~/components/ui/card";
import moment from "moment";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import RegisterMemorialHallDialog from "~/components/organisms/RegisterMemorialHallDialog";
import { toast } from "sonner";
import type { FamilyGroupMember, User } from "~/types";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "~/components/ui/combobox";

interface MemberRole {
  value: FamilyGroupMember["role"]
  label: string
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  if (!user || !token) {
    return redirect('/login');
  }
  const pathname = new URL(request.url).pathname;
  const id = pathname.split("/").pop();
  if (!id) {
    return redirect("/family-groups");
  }
  const familyGroupDetail = await familyGroupService.get.familyGroupDetail({
    id,
    token
  });
  const { content: memberContent } = await familyGroupService.get.familyGroupMemberList({
    id,
    token
  });
  const members = await Promise.all(
    memberContent.map(async (member) => {
      const user = await userService.get.user({
        id: member.userId,
        token
      })
      return {
        ...member,
        user
      }
    })
  )
  const { content: memorialContent } = await familyGroupService.get.familyGroupMemorialList({
    id,
    token
  });

  return {
    id,
    user,
    token,
    familyGroupDetail,
    members,
    memorialContent
  };
}

const memberRoles: MemberRole[] = [
  {
    value: "member",
    label: "일반"
  },
  {
    value: "admin",
    label: "관리자"
  }
];

export default function FamilyGroupDetail({ loaderData }: Route.ComponentProps) {
  const {
    id,
    user,
    token,
    familyGroupDetail,
    members,
    memorialContent
  } = loaderData;
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteRole, setInviteRole] = useState<FamilyGroupMember["role"]>("member");
  const [inviteRelationship, setInviteRelationship] = useState<string>("");
  const [isDeleteGroupDialogOpen, setIsDeleteGroupDialogOpen] = useState<boolean>(false);
  const [isAddMemorialOpen, setIsAddMemorialOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelectedDeleteMember = async (member: FamilyGroupMember) => {
    const { id, userId } = member;
    try {
      await familyGroupService.delete.familyGroupMember({
        token,
        id,
        userId
      });
    } catch (error) {
      toast.error("멤버 제거에 실패했습니다.");
    }
  };

  const handleInviteMember = async () => {
    try {
      await familyGroupService.post.inviteFamilyGroupMember({
        id,
        token,
        email: inviteEmail,
        role: inviteRole,
        relationship: inviteRelationship
      });
    } catch (error) {
      toast.error("멤버 초대에 실패했습니다.");
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await familyGroupService.delete.familyGroup({
        id,
        token
      });
    } catch (error) {
      toast.error("그룹 제거에 실패했습니다.");
    }
  }

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-398px)] px-4 sm:px-6 lg:px-8 py-12">
      <FlexDiv
        className="items-center cursor-pointer mb-2"
        onClick={handleBack}
      >
        <Button variant="ghost">
          <ArrowLeftIcon size={16} />
        </Button>
        그룹 목록으로
      </FlexDiv>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FlexDiv className="flex-col gap-y-6">
          <Card className="p-6">
            <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-center mb-2">{familyGroupDetail.name}</h2>
            <p className="text-gray-600 text-center text-sm mb-6">{familyGroupDetail.description}</p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">멤버</span>
                <span>{members.length}명</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">추모관</span>
                <span>{memorialContent.length}개</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">생성일</span>
                <span>{moment(familyGroupDetail.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">내 권한</span>
                <span>{user.id === familyGroupDetail.ownerId ? '관리자' : '멤버'}</span>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl mb-6">그룹 멤버</h3>
            <div className="space-y-4">
              {members.length > 0 ? members.map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="flex items-center gap-2">
                        {member.user.name}
                        {member.role === 'admin' && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">관리자</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600">{member.user.email}</p>
                      <p className="text-xs text-gray-500">
                        {/* 가입일: {member.user.toLocaleDateString('ko-KR')} */}
                      </p>
                    </div>
                  </div>

                  {user.id === familyGroupDetail.ownerId && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleSelectedDeleteMember(member)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              )) : (
                <FlexDiv className="flex-col w-full h-full justify-center items-center gap-y-4">
                  <FlexDiv className="flex-col justify-center items-center gap-y-2">
                    <UserRoundX size={128} />
                    등록된 멤버가 없습니다
                  </FlexDiv>
                  {familyGroupDetail.ownerId === user.id && (
                    <Dialog
                      open={isInviteDialogOpen}
                      onOpenChange={setIsInviteDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <PlusIcon size={24} />
                          멤버 초대
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>멤버 초대</DialogTitle>
                          <DialogDescription>
                            초대할 사용자의 이메일을 입력하세요
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="invite-email">이메일</Label>
                            <Input
                              id="invite-email"
                              type="email"
                              placeholder="example@email.com"
                              value={inviteEmail}
                              onChange={(e) => setInviteEmail(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>권한</Label>
                            <Combobox
                              items={memberRoles}
                              itemToStringValue={(role: MemberRole) => role.label}
                              // value={inviteRole}
                              onValueChange={(e) => setInviteRole(e!.value)}
                            >
                              <ComboboxInput placeholder="부여할 권한을 선택해주세요" />
                              <ComboboxContent>
                                <ComboboxEmpty>검색 결과가 없습니다</ComboboxEmpty>
                                <ComboboxList>
                                  {(role) => (
                                    <ComboboxItem key={role.value} value={role}>
                                      {role.label}
                                    </ComboboxItem>
                                  )}
                                </ComboboxList>
                              </ComboboxContent>
                            </Combobox>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="invite-relationship">관계</Label>
                            <FlexDiv className="items-center gap-x-2">
                              <Input
                                id="invite-relationship"
                                placeholder="예시) 부"
                                value={inviteRelationship}
                                onChange={(e) => setInviteRelationship(e.target.value)}
                              />
                            </FlexDiv>
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button onClick={handleInviteMember}>
                              초대
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setIsInviteDialogOpen(false)}
                            >
                              취소
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </FlexDiv>
              )}
            </div>
          </Card>
        </FlexDiv>
        <Card className="p-6">
          <h3 className="text-xl mb-6">추모관</h3>
          {memorialContent.length > 0 ? (
            <FlexDiv className="flex-col gap-y-6">
              {memorialContent.map(memorial => (
                <Card key={memorial.id}>
                  <h3 className="text-xl mb-6">추모관 목록</h3>
                </Card>
              ))}
            </FlexDiv>
          ) : (
            <FlexDiv className="flex-col w-full h-full justify-center items-center gap-y-4">
              <FlexDiv className="flex-col justify-center items-center gap-y-2">
                <StickyNoteOff size={128} />
                등록된 추모관이 없습니다
              </FlexDiv>
              {familyGroupDetail.ownerId === user.id && (
                <Button onClick={() => setIsAddMemorialOpen(true)}>
                  <PlusIcon size={24} />
                  새 추모관 등록
                </Button>
              )}
            </FlexDiv>
          )}
        </Card>
      </div>
      {user.id === familyGroupDetail.ownerId && (
        <FlexDiv className="justify-end">
          <Dialog open={isDeleteGroupDialogOpen} onOpenChange={setIsDeleteGroupDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                그룹 삭제
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>그룹 삭제</DialogTitle>
                <DialogDescription>
                  정말 이 그룹을 삭제하시겠습니까?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-3">
                <Button
                  variant="destructive"
                  onClick={handleDeleteGroup}
                >
                  삭제
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteGroupDialogOpen(false)}
                >
                  취소
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </FlexDiv>
      )}
      <RegisterMemorialHallDialog
        token={token}
        isOpen={isAddMemorialOpen}
        setIsOpen={setIsAddMemorialOpen}
      />
    </div>
  )
}