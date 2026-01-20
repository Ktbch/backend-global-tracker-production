// drizzle.config.ts

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import AppConfig from './src/config.ts/config'


export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        database: AppConfig.dbName,
        host: AppConfig.dbHost,
        password: AppConfig.dbPassword,
        user: AppConfig.dbUser,
        port: Number(AppConfig.dbPort)
    },
});
