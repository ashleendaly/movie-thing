import { z } from "zod";

export const clubNameSchema = z.string().transform((s) => s.toLowerCase());
