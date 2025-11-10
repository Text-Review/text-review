import { z } from 'zod';
import "@/lib/zod/extensions"
import { oid } from '@/lib/zod/extensions';

export const UserSchema = z.object({
    _id: oid(),
    role: z.enum(['user', 'admin']).optional(),
});

export type User = z.infer<typeof UserSchema>;