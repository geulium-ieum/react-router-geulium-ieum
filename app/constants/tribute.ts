import * as v from "valibot";
import { ListSchema } from "./list";

export const tributeListSchema = v.object({
  ...ListSchema.entries,
  content: v.array(
    v.object({
      id: v.string(),
      memorialId: v.string(),
      userId: v.string(),
      content: v.string(),
      isPublic: v.boolean(),
      createdAt: v.string(),
      updatedAt: v.string()
    })
  )
});
