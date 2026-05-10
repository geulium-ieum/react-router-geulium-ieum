import * as v from 'valibot';
import { ListSchema } from './list';

export const FamilyGroupSchema = v.object({
  ...ListSchema.entries,
  content: v.array(
    v.object({
      id: v.string(),
      name: v.string(),
      description: v.string(),
      ownerId: v.string(),
      createdAt: v.string(),
      updatedAt: v.string(),
    })
  )
})

export const FamilyGroupMemberSchema = v.object({
  ...ListSchema.entries,
  content: v.array(
    v.object({
      id: v.string(),
      groupId: v.string(),
      userId: v.string(),
      role: v.picklist(['member', 'admin']),
      joinedAt: v.nullable(v.string())
    })
  )
})

export const FamilyGroupMemorialSchema = v.object({
  ...ListSchema.entries,
  content: v.array(
    v.object({
      id: v.string(),
      deceasedName: v.string(),
      birthDate: v.string(),
      deathDate: v.string(),
      location: v.nullable(v.string()),
      biography: v.nullable(v.string()),
      photoUrl: v.nullable(v.string()),
      visibility: v.picklist(['PUBLIC', 'PRIVATE', 'FAMILY_ONLY']),
      status: v.picklist(['PENDING', 'REJECT', 'APPROVED', 'CANCEL']),
      createdBy: v.string(),
      updatedBy: v.string(),
      createdAt: v.string(),
      updatedAt: v.string()
    })
  )
})

export const FamilyGroupDetailSchema = v.object({
  id: v.string(),
  name: v.string(),
  description: v.string(),
  ownerId: v.string(),
  createdAt: v.string(),
  updatedAt: v.string()
})

export const FamilyGroupDetailMemberListSchema = v.object({
  ...ListSchema.entries,
  content: v.array(
    v.object({
      id: v.string(),
      groupId: v.string(),
      userId: v.string(),
      role: v.picklist(['member', 'admin']),
      joinedAt: v.nullable(v.string())
    })
  )
})
