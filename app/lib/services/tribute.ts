import type { ListParams } from "~/types";
import { getTributeList, putTribute } from "../apis/tribute";

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
    tribute: async ({
      id,
      token
    }: {
      id: string
      token: string
    }) => {
      return await putTribute({ id, token });
    }
  }
}

export const tributeService = new TributeService();
