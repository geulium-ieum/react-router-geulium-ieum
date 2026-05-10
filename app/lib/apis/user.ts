import { http } from "~/lib/utils"
import * as v from 'valibot';
import { TokenSchema, UserSchema } from "~/constants/user";
import type { PostLoginParams, PostRegisterParams, PostVerifyEmailParams, PostChangePasswordParams, PostVerifyChangePasswordParams, PostNaverLoginParams, PostKakaoLoginParams, ListParams, PutUserProfileParams, DeleteUserParams } from "~/types";
import { tributeListSchema } from "~/constants/tribute";
import { MemorialSchema } from "~/constants/memorial";

export async function getMe({ token }: { token: string }) {
    try {
        const response = await http.get('user/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).json();
        return v.parse(UserSchema, response);
    } catch (error) {
        throw error;
    }
}

export async function getUser({
    id,
    token
}: {
    id: string;
    token: string;
}) {
    try {
        const response = await http.get(`user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).json();
        return v.parse(UserSchema, response);
    } catch (error) {
        throw error;
    }
}

export async function postRegister({
    email,
    password,
    phone,
    name
}: PostRegisterParams) {
    try {
        const response: { message: string } = await http.post('auth/register', {
            json: {
                email,
                password,
                phone,
                name
            }
        }).json();
        return response;
    } catch (error) {
        throw error;
    }
}

export async function postVerifyEmail({
    email,
    code
}: PostVerifyEmailParams) {
    try {
        const response = await http.post('auth/verify-email', {
            json: {
                email,
                code
            }
        }).json();
        return v.parse(TokenSchema, response);
    } catch (error) {
        throw error;
    }
}

export async function postLogin({
    email,
    password
}: PostLoginParams) {
    try {
        const response = await http.post('auth/login', {
            json: {
                email,
                password
            }
        }).json();
        return v.parse(TokenSchema, response);
    } catch (error) {
        throw error;
    }
}

export async function postLogout() {
    try {
        const response = await http.post('auth/logout').json();
        return v.parse(TokenSchema, response);
    } catch (error) {
        throw error;
    }
}

export async function postChangePassword({
    email
}: PostChangePasswordParams) {
    try {
        const response = await http.post('auth/password-reset/request', {
            json: { email }
        }).json();
        return response;
    } catch (error) {
        throw error;
    }
}

export async function postVerifyChangePassword({
    code,
    email,
    newPassword
}: PostVerifyChangePasswordParams) {
    try {
        const response = await http.post('auth/password-reset/verify', {
            json: { code, email, newPassword }
        }).json();
        return response;
    } catch (error) {
        throw error;
    }
}

export async function postNaverLogin({
    code,
    redirectUri
}: PostNaverLoginParams) {
    try {
        const response = await http.post('auth/naver/login', {
            json: { code, redirectUri }
        }).json();
        return v.parse(TokenSchema, response);
    } catch (error) {
        throw error;
    }
}

export async function postKakaoLogin({
    code,
    redirectUri
}: PostKakaoLoginParams) {
    try {
        const response = await http.post('auth/kakao/login', {
            json: { code, redirectUri }
        }).json();
        return v.parse(TokenSchema, response);
    } catch (error) {
        throw error;
    }
}

export async function getUserNotificationList({
    token
}: {
    token: string
}) {
    try {
        const response = await http.post('notification/list', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).json();
        return response;
    } catch (error) {
        throw error;
    }
}

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

export async function getMemorialList({
    token
}: ListParams & {
    token: string;
}) {
    try {
        const response = await http.get(`memorial/list`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).json();
        return v.parse(MemorialSchema, response);
    } catch (error) {
        throw error;
    }
}

export async function putUserProfile({
    name,
    phone,
    marketingAgreed,
    userId,
    token
}: PutUserProfileParams & {
    token: string;
}) {
    try {
        await http.put(`user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            json: {
                name,
                phone,
                marketingAgreed
            }
        }).json();
    } catch (error) {
        throw error;
    }
}

export async function deleteUser({
    userId,
    token
}: DeleteUserParams & {
    userId: string;
    token: string;
}) {
    try {
        await http.delete(`user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).json();
    } catch (error) {
        throw error;
    }
}