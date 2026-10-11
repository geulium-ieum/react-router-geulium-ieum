import type { ListParams } from "~/types";
import {
  deleteTributeDetail,
  getTributeList,
  getMyTributeList,
  putTributeDetail,
  postTributeDetail,
} from "../apis/tribute";
import { boolean, string } from "valibot";

class TributeService {
  public get = {
    tributeList: async ({
      id,
      token,
    }: ListParams & {
      id: string;
      token: string;
    }) => {
      return await getTributeList({
        id,
        token,
      });
    },
    myTributeList: async ({
      userId,
      token,
    }: ListParams & {
      userId: string;
      token: string;
    }) => {
      return await getMyTributeList({
        userId,
        token,
      });
    },
  };
  public post = {
    tributeDetail: async ({
      id,
      content,
      isPublic,
      token,
    }: {
      id: string;
      content: string;
      isPublic: boolean;
      token: string;
    }) => {
      return await postTributeDetail({
        id,
        content,
        isPublic,
        token,
      });
    },
  };
  public put = {
    tributeDetail: async ({
      id,
      content,
      isPublic,
      token,
    }: {
      id: string;
      content: string;
      isPublic: boolean;
      token: string;
    }) => {
      return await putTributeDetail({
        id,
        content,
        isPublic,
        token,
      });
    },
  };
  public delete = {
    tributeDetail: async ({ id, token }: { id: string; token: string }) => {
      return await deleteTributeDetail({
        id,
        token,
      });
    },
  };
}

export const tributeService = new TributeService();
