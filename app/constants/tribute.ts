import * as v from "valibot";
import { ListSchema } from "./list";

export const tributeListSchema = v.object({
  ...ListSchema.entries,
  content: v.array(
    v.object({
      id: v.number(),
      memorialId: v.number(),
      userId: v.number(),
      content: v.string(),
      isPublic: v.boolean(),
      createdAt: v.pipe(
        v.string(),
        v.isoTimestamp('The timestamp is badly formatted.')
      ),
      updatedAt: v.pipe(
        v.string(),
        v.isoTimestamp('The timestamp is badly formatted.')
      )
    })
  )
});
