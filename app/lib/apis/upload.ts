import { uploadMemorialPhotoSchema } from "~/constants/upload";
import { http } from "../utils";
import * as v from "valibot";

export async function memorialPhoto({
  token,
  memorialId
}: {
  token: string;
  memorialId: string;
}) {
  try {
    const response = await http.post('upload/memorial-photo', {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      searchParams: {
        memorialId
      }
    }).json();
    return v.parse(uploadMemorialPhotoSchema, response);
  } catch (error) {
    throw error;
  }
}
