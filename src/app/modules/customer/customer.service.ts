import { prisma } from "../../utils/prisma";
import config from "../../config";
import { Customer } from "../../../../generated/prisma";

const createCustomer = async (data: Customer) => {
  const customerData = {
    name: data.name,
    email: data.email,
    phone: data.phone,
  };

  const result = await prisma.customer.create({ data: customerData });

  return result;
};

export const customerService = {
  createCustomer,
};
