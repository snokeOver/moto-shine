export interface IPagination {
  page?: number;
  limit?: number;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
}

export interface IPaginationReturn {
  page: number;
  take: number;
  skip: number;
  orderBy: {
    [key: string]: string;
  };
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}
