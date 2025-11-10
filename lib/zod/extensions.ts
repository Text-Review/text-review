import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const defaultOidMessage = 'Must be a valid ObjectID.';

export const oid = (message?: string) =>
  z.string()
    .regex(objectIdRegex, { message: message ?? defaultOidMessage })
    .transform((v) => v.toLowerCase());