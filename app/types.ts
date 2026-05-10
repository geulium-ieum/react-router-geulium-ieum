import * as v from 'valibot';
import type { TokenSchema, UserSchema } from '~/constants/user';
import type { MemorialSchema } from '~/constants/memorial';
import type { FamilyGroupDetailSchema, FamilyGroupSchema } from './constants/familyGroup';

export type Page =
  | 'home'
  | 'login'
  | 'register'
  | 'search'
  | 'memorial'
  | 'mypage'
  | 'admin-dashboard'
  | 'admin-mypage'
  | 'family-groups'
  | 'notifications'
  | 'announcements';

export interface Notification {
  id: string;
  type: 'memorial' | 'offering' | 'family-invite' | 'anniversary' | 'announcement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  relatedId?: string;
}

// Common
export type Children = React.ReactNode | React.ReactNode[];
export interface ListParams {
  page?: number;
  size?: number;
  sort?: {
    field: 'deceasedName' |
    'birthDate' |
    'deathDate' |
    'location' |
    'biography' |
    'photoUrl' |
    'visibility' |
    'status' |
    'rejectionReason' |
    'approvedBy' |
    'approvedAt' |
    'createdBy' |
    'updatedBy' |
    'createdAt' |
    'updatedAt',
    direction: 'asc' | 'desc'
  }[];
}

export type Status = "PENDING" | "REJECT" | "APPROVED" | "CANCEL";
export type Visibility = "PUBLIC" | "PRIVATE";

// User
export type User = v.InferOutput<typeof UserSchema>;
export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

// Memorial
export type MemorialFilter = v.InferOutput<typeof MemorialSchema>;

// Family Group
export type FamilyGroup = v.InferOutput<typeof FamilyGroupSchema>;
export type FamilyGroupDetail = v.InferOutput<typeof FamilyGroupDetailSchema>;
export interface MemorialFilterProps extends ListParams {
  name: string;
  birthDate: string;
  deathDate: string;
}

export type Token = v.InferOutput<typeof TokenSchema>;

export type FooterDialogType = 'faq' | 'inquiry' | 'guide' | 'terms' | 'privacy' | 'accessibility';

export interface FooterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PostRegisterParams {
  email: string;
  password: string;
  phone: string;
  name: string;
}

export interface PostVerifyEmailParams {
  email: string;
  code: string;
}

export interface PostLoginParams {
  email: string;
  password: string;
}

export interface PostChangePasswordParams {
  email: string;
}

export interface PostVerifyChangePasswordParams {
  code: string;
}

export interface PostVerifyChangePasswordParams {
  code: string;
  email: string;
  newPassword: string;
}

export interface PostNaverLoginParams {
  code: string;
  redirectUri: string;
}

export interface PostKakaoLoginParams {
  code: string;
  redirectUri: string;
}

export interface GetNotificationListParams {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  relatedId: number;
  relatedType: string;
  isRead: boolean;
  createdAt: string;
}

export interface GetMemorialListParams {
  id: number;
  deceasedName: string;
  birthDate: string;
  deathDate: string;
  location: string;
  biography: string;
  photoUrl: string;
  visibility: string;
  status: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PutUserProfileParams {
  name: string;
  phone: string;
  marketingAgreed: boolean;
  userId: string;
}

export interface DeleteUserParams {
  userId: string;
}
