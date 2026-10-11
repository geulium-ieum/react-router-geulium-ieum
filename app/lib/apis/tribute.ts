import * as v from "valibot";
import { http } from "../utils";
import type { ListParams } from "~/types";
import { tributeListSchema } from "~/constants/tribute";

export async function getTributeList({
  id,
  token,
}: ListParams & {
  id: string;
  token: string;
}) {
  try {
    const response = await http
      .get(`tribute/memorial/${id}/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();
    return v.parse(tributeListSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function getMyTributeList({
  userId,
  token,
}: ListParams & {
  userId: string;
  token: string;
}) {
  try {
    const response = await http
      .get(`tribute/user/${userId}/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();
    return v.parse(tributeListSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function postTributeDetail({
  id,
  content,
  isPublic,
  token,
}: {
  id: string;
  content: string;
  isPublic: boolean;
  token: string;
}) {
  try {
    await http.post(`tribute/memorial/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        content,
        isPublic,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function putTributeDetail({
  id,
  content,
  isPublic,
  token,
}: {
  id: string;
  content: string;
  isPublic: boolean;
  token: string;
}) {
  try {
    await http.put(`tribute/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        content,
        isPublic,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteTributeDetail({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  try {
    await http.delete(`tribute/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}
