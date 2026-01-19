// drizzle.config.ts

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import AppConfig from './src/config.ts/config'


export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        url: "mysql://letherte_letherte:AMAsQ(]ZF^BsqgF@localhost:3306/letherte_global-tracking",
    },
});
