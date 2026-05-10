import type { ListParams } from "~/types";
import { deleteFamilyGroup, deleteFamilyGroupMember, getFamilyGroupDetail, getFamilyGroupList, getFamilyGroupMemberList, getFamilyGroupMemorialList, postCreateFamilyGroup, postInviteFamilyGroupMember, postJoinFamilyGroup } from "../apis/familyGroup";

class FamilyGroupService {
  public get = {
    familyGroupList: async ({
      page,
      size,
      sort,
      token
    }: ListParams & {
      token: string;
    }) => {
      return await getFamilyGroupList({
        page,
        size,
        sort,
        token
      });
    },
    familyGroupMemberList: async ({
      id,
      page,
      size,
      sort,
      token
    }: ListParams & {
      id: string;
      token: string;
    }) => {
      return await getFamilyGroupMemberList({
        id,
        page,
        size,
        sort,
        token
      });
    },
    familyGroupDetail: async ({
      id,
      token
    }: {
      id: string;
      token: string;
    }) => {
      return await getFamilyGroupDetail({
        id,
        token
      })
    },
    familyGroupMemorialList: async ({
      id,
      page,
      size,
      sort,
      token
    }: ListParams & {
      id: string;
      token: string;
    }) => {
      return await getFamilyGroupMemorialList({
        id,
        page,
        size,
        sort,
        token
      });
    }
  }
  public post = {
    inviteFamilyGroupMember: async ({
      id,
      token,
      email,
      role,
      relationship
    }: {
      id: string;
      token: string;
      email: string;
      role: 'member' | 'admin';
      relationship: string;
    }) => {
      return await postInviteFamilyGroupMember({
        id,
        token,
        email,
        role,
        relationship
      });
    },
    joinFamilyGroup: async ({
      id,
      token
    }: {
      id: string;
      token: string;
    }) => {
      return await postJoinFamilyGroup({
        id,
        token
      });
    },
    createFamilyGroup: async ({
      token,
      name,
      description
    }: {
      token: string;
      name: string;
      description?: string
    }) => {
      return await postCreateFamilyGroup({
        token,
        name,
        description
      });
    }
  }
  public delete = {
    familyGroup: async ({
      id,
      token
    }: {
      id: string;
      token: string;
    }) => {
      return await deleteFamilyGroup({
        id,
        token
      })
    },
    familyGroupMember: async ({
      id,
      userId,
      token
    }: {
      id: string;
      userId: string;
      token: string;
    }) => {
      return await deleteFamilyGroupMember({
        id,
        userId,
        token
      });
    }
  }
}

export const familyGroupService = new FamilyGroupService();
