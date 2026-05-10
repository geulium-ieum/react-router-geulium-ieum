import * as v from "valibot";

export const uploadMemorialPhotoSchema = v.object({
  fileId: v.string(),
  url: v.string(),
  size: v.number(),
  contentType: v.string()
});
