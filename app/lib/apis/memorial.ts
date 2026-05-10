import { http } from "~/lib/utils";
import * as v from 'valibot';
import { MemorialSchema } from "~/constants/memorial";
import type { ListParams, MemorialFilterProps, Status, Visibility } from "~/types";

export async function getMemorialList({
  page,
  size,
  sort
}: ListParams) {
  try {
    const response = await http.get('memorial/list', {
      searchParams: {
        page,
        size,
        sort: sort?.map(({ field, direction }) => `${field},${direction}`).join(',')
      }
    }).json();
    return v.parse(MemorialSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function getMemorialFilter({
  name,
  birthDate,
  deathDate,
  page,
  size,
  sort
}: MemorialFilterProps) {
  try {
    const response = await http.get('memorial/filter', {
      searchParams: {
        name,
        birthDate,
        deathDate,
        page,
        size,
        sort: sort?.map(({ field, direction }) => `${field},${direction}`).join(',')
      }
    }).json();
    return v.parse(MemorialSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function postMemorial({
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
}) {
  try {
    await http.post('memorial', {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      json: {
        deceasedName,
        location,
        birthDate,
        deathDate,
        biography,
        visibility,
        status,
        photoUrl
      }
    });
  } catch (error) {
    throw error;
  }
}
