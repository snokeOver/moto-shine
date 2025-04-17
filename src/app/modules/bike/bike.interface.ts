import { Bike } from "../../../../generated/prisma";
import { IMeta } from "../../types";

export interface IAllBike {
  meta: IMeta;
  data: Bike[];
}

export interface IBikeFilteredQuery {
  brand?: string | undefined;
  model?: string | undefined;
  year?: string | undefined;
  searchTerm?: string | undefined;
}
