import type { ListParams } from "~/types";
import { deleteTributeDetail, getTributeList, putTributeDetail } from "../apis/tribute";

class TributeService {
  public get = {
    tributeList: async ({
      userId,
      token
    }: ListParams & {
      userId: string,
      token: string
    }) => {
      return await getTributeList({
          userId,
          token
      });
    },
  }
  public post = {

  }
  public put = {
    tributeDetail: async ({
      id,
      content,
      isPublic,
      token
    }: {
      id: string
      content: string
      isPublic: boolean
      token: string
    }) => {
      return await putTributeDetail({
        id,
        content,
        isPublic,
        token
      });
    }
  }
  public delete = {
    tributeDetail: async ({
      id,
      token
    }: {
      id: string
      token: string
    }) => {
      return await deleteTributeDetail({
        id,
        token
      });
    }
  }
}

export const tributeService = new TributeService();
