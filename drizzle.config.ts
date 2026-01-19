// drizzle.config.ts

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import AppConfig from './src/config.ts/config'

console.log(AppConfig.dbUrl)

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        url: AppConfig.dbUrl,
    },
});

// password 4!2Nn ^ Vg: G