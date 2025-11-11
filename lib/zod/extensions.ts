import { z } from "zod";

const defaultCuidMessage = 'Must be a valid CUID';

export const cuid = (message?: string) =>
  z.cuid2({ message: message ?? defaultCuidMessage });