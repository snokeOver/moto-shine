import { Customer } from "../../../../generated/prisma";
import { IMeta } from "../../types";

export interface IAllCustomer {
  meta: IMeta;
  data: Customer[];
}

export interface ICustomerFilteredQuery {
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  searchTerm?: string | undefined;
}

export interface IDeletedCustomer {
  deletedCustomer: Customer;
}
