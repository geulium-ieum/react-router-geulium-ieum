import { memorialPhoto } from "../apis/upload"

class UploadService {
  public post = {
    memorialPhoto: async ({
      token,
      memorialId
    }: {
      token: string;
      memorialId: string;
    }) => {
      return await memorialPhoto({
        token,
        memorialId
      })
    }
  }
}

export const uploadService = new UploadService();
