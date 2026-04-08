import { z } from 'zod';
import { EnvironmentsEnum } from '../enums/environments.enum';

export const envSchema = z.object({
    DB_HOST: z.string().nonempty(),
    DB_PORT: z.string().regex(/^\d+$/, "DB_PORT must be a number").optional(),
    DB_SCHEMA: z.string().nonempty(),
    DB_USERNAME: z.string().nonempty(),
    DB_PASSWORD: z.string().nonempty(),
    ENV: z.enum(EnvironmentsEnum).default(EnvironmentsEnum.DEVELOPMENT),
});


export const validateEnv = (env: Record<string, unknown>) => {
    return envSchema.parse(env);
};
