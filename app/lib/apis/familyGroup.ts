import type { ListParams } from "~/types";
import { http } from "../utils";
import { FamilyGroupDetailSchema, FamilyGroupMemberSchema, FamilyGroupMemorialSchema, FamilyGroupSchema } from "~/constants/familyGroup";
import * as v from 'valibot';

export async function getFamilyGroupList({
  page,
  size,
  sort,
  token
}: ListParams & {
  token: string;
}) {
  try {
    const response = await http.get('family-group/list', {
      searchParams: {
        page,
        size,
        sort: sort?.map(({ field, direction }) => `${field},${direction}`).join(',')
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).json();
    return v.parse(FamilyGroupSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function getFamilyGroupMemberList({
  id,
  page,
  size,
  sort,
  token
}: ListParams & {
  id: string;
  token: string;
}) {
  try {
    const response = await http.get(`family-group/${id}/member/list`, {
      searchParams: {
        page,
        size,
        sort: sort?.map(({ field, direction }) => `${field},${direction}`).join(',')
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).json();
    return v.parse(FamilyGroupMemberSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function getFamilyGroupMemorialList({
  id,
  page,
  size,
  sort,
  token
}: ListParams & {
  id: string;
  token: string;
}) {
  try {
    const response = await http.get(`family-group/${id}/memorial/list`, {
      searchParams: {
        page,
        size,
        sort: sort?.map(({ field, direction }) => `${field},${direction}`).join(',')
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).json();
    return v.parse(FamilyGroupMemorialSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function getFamilyGroupDetail({
  id,
  token
}: {
  id: string;
  token: string;
}) {
  try {
    const response = await http.get(`family-group/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).json();
    return v.parse(FamilyGroupDetailSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function postInviteFamilyGroupMember({
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
}) {
  try {
    await http.post(`family-group/${id}/invite`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: {
        email,
        role,
        relationship
      }
    });
  } catch (error) {
    throw error;
  }
}

export async function postJoinFamilyGroup({
  id,
  token
}: {
  id: string;
  token: string;
}) {
  try {
    await http.post(`family-group/${id}/join`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
}

export async function postCreateFamilyGroup({
  token,
  name,
  description
}: {
  token: string;
  name: string;
  description?: string;
}) {
  try {
    await http.post('family-group', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: {
        name,
        description: description || ""
      }
    })
  } catch (error) {
    throw error;
  }
}

export async function deleteFamilyGroup({
  id,
  token
}: {
  id: string;
  token: string;
}) {
  try {
    await http.delete(`family-group/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteFamilyGroupMember({
  id,
  userId,
  token
}: {
  id: string;
  userId: string;
  token: string;
}) {
  try {
    await http.delete(`family-group/${id}/member/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
}
