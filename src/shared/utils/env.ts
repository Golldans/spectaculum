import dotenv from 'dotenv';
import { z } from 'zod';
import { envSchema } from './env.schema';

dotenv.config();

type EnvKeys = keyof z.infer<typeof envSchema>;

export function getEnv<T extends EnvKeys>(key: T, defaultValue?: string): string {
    const parsedEnv = envSchema.safeParse(process.env);
    
    if (!parsedEnv.success) {
        console.log('Environment variable validation failed:', parsedEnv.error.format());
        throw new Error('Invalid environment variables');
    }

    const value = parsedEnv.data[key] || defaultValue;
    
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }

    return value;
}
