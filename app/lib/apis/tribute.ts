import * as v from "valibot";
import { http } from "../utils";
import type { ListParams } from "~/types";
import { tributeListSchema } from "~/constants/tribute";

export async function getTributeList({
  userId,
  token
}: ListParams & {
  userId: string;
  token: string;
}) {
  try {
      const response = await http.get(`tribute/user/${userId}/list`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }).json();
      return v.parse(tributeListSchema, response);
  } catch (error) {
      throw error;
  }
}

export async function putTributeDetail({
  id,
  content,
  isPublic,
  token
}: {
  id: string
  content: string
  isPublic: boolean
  token: string
}) {
  try {
    await http.put(`tribute/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: {
        content,
        isPublic
      }
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteTributeDetail({
  id,
  token
}: {
  id: string
  token: string
}) {
  try {
    await http.delete(`tribute/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
}
