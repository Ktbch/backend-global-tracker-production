// drizzle.config.ts

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';


export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        host: "localhost",
        database: "letherte_global-tracking",
        password: "]467)yTAtGcL?r*)",
        user: "letherte_kay",
        port: 3306
    },
});
