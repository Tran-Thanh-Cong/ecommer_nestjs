import { IPaginationOptions } from './types/pagination-option.type';

export const infinityPagination = <T>(
  data: T[],
  option: IPaginationOptions,
) => {
  return {
    data,
    hasNextPage: data.length === option.limit,
  };
};
