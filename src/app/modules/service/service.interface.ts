import { ServiceRecord } from "../../../../generated/prisma";
import { IMeta } from "../../types";

export interface IAllService {
  meta: IMeta;
  data: ServiceRecord[];
}

export interface IServiceFilteredQuery {
  serviceDate?: Date | undefined;
  status?: TServiceStatus | undefined;
  searchTerm?: string | undefined;
}

export type TServiceStatus = "pending" | "done" | "in-progress";
