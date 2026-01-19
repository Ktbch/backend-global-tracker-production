// drizzle.config.ts

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import AppConfig from './src/config.ts/config'


export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        url: "mysql://letherte_letherte:AMAsQ(]ZF^BsqgF@192.168.168.2/letherte_global-tracking",
    },
});
