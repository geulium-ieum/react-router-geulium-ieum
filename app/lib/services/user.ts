import { getUser, postLogin, postRegister, postVerifyEmail, postChangePassword, postVerifyChangePassword, postNaverLogin, postKakaoLogin, getMe, getUserNotificationList, getTributeList, putUserProfile, deleteUser, getMemorialList } from "~/lib/apis/user";
import type { PostLoginParams, PostRegisterParams, PostVerifyEmailParams, PostChangePasswordParams, PostVerifyChangePasswordParams, PostNaverLoginParams, PostKakaoLoginParams, ListParams, PutUserProfileParams, DeleteUserParams } from "~/types";

class UserService {
    public get = {
        me: async ({ token }: { token: string }) => {
            return await getMe({ token });
        },
        user: async ({
            id,
            token
        }: {
            id: string
            token: string
        }) => {
            return await getUser({ id, token });
        },
        notificationList: async ({ token }: { token: string }) => {
            return await getUserNotificationList({ token });
        },
        tributeList: async ({
            userId,
            token
        }:ListParams & {
            userId: string,
            token: string
        }) => {
            return await getTributeList({
                userId,
                token
            });
        },
        memorialList: async ({
            token
        }:ListParams & {
            token: string
        }) => {
            return await getMemorialList({ 
                token 
        });
        }
    }
    
    public post = {
        register: async ({
            email,
            password,
            phone,
            name
        }: PostRegisterParams) => {
            return await postRegister({ email, password, phone, name });
        },
        verifyEmail: async ({ email, code }: PostVerifyEmailParams) => {
            return await postVerifyEmail({ email, code });
        },
        login: async ({ email, password }: PostLoginParams) => {
            return await postLogin({ email, password });
        },
        changePassword: async ({ email }: PostChangePasswordParams) => {
            return await postChangePassword({ email });
        },
        verifyChangePassword: async ({ code, email, newPassword }: PostVerifyChangePasswordParams) => {
            return await postVerifyChangePassword({ code, email, newPassword });
        },
        naverLogin: async ({ code, redirectUri }: PostNaverLoginParams) => {
            return await postNaverLogin({ code, redirectUri });
        },
        kakaoLogin: async ({ code, redirectUri }: PostKakaoLoginParams) => {
            return await postKakaoLogin({ code, redirectUri });
        },
    }

    public put = {
        userProfile: async ({name, phone, marketingAgreed, userId, token}: PutUserProfileParams & { token: string }) => {
            return await putUserProfile({name, phone, marketingAgreed, userId, token });
        }
    }

    public delete = {
        user: async ({ userId, token }: DeleteUserParams & { userId: string; token: string }) => {
            return await deleteUser({ userId, token });
        }
    }
}

export const userService = new UserService();
