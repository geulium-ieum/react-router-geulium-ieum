import * as v from 'valibot';

export const ListSchema = v.object({
  size: v.number(),
  number: v.number(),
  sort: v.object({
    empty: v.boolean(),
    unsorted: v.boolean(),
    sorted: v.boolean()
  }),
  first: v.boolean(),
  last: v.boolean(),
  numberOfElements: v.number(),
  pageable: v.object({
    offset: v.number(),
    sort: v.object({
      empty: v.boolean(),
      unsorted: v.boolean(),
      sorted: v.boolean()
    }),
    paged: v.boolean(),
    pageNumber: v.number(),
    pageSize: v.number(),
    unpaged: v.boolean()
  }),
  empty: v.boolean(),
})