import * as v from 'valibot';

export const UserSchema = v.object({
    id: v.string(),
    email: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    role: v.picklist(['USER', 'ADMIN', 'SUPER_ADMIN']),
    isActive: v.boolean(),
});

export const TokenSchema = v.object({
    tokenType: v.string(),
    accessToken: v.string(),
    accessTokenExpiresIn: v.number(),
    refreshToken: v.string(),
    refreshTokenExpiresIn: v.number(),
});
