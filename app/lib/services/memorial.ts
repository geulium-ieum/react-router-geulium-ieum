import type { ListParams, MemorialFilterProps, Status, Visibility } from "~/types";
import { getMemorialFilter, getMemorialList, postMemorial } from "~/lib/apis/memorial";

class MemorialService {
  public get = {
    memorialList: async ({
      page,
      size,
      sort
    }: ListParams) => {
      return await getMemorialList({
        page,
        size,
        sort
      });
    },
    memorialFilter: async ({
      name,
      birthDate,
      deathDate,
      page,
      size,
      sort
    }: MemorialFilterProps) => {
      return await getMemorialFilter({
        name,
        birthDate,
        deathDate,
        page,
        size,
        sort
      });
    }
  }
  public post = {
    memorial: async ({
      token,
      deceasedName,
      location,
      birthDate,
      deathDate,
      biography,
      visibility,
      status,
      photoUrl
    }: {
      token: string
      deceasedName: string
      location?: string
      birthDate: string
      deathDate: string
      biography?: string
      visibility: Visibility
      status: Status
      photoUrl: string
    }) => {
      return await postMemorial({
        token,
        deceasedName,
        location,
        birthDate,
        deathDate,
        biography,
        visibility,
        status,
        photoUrl
      });
    }
  }
}

export const memorialService = new MemorialService();