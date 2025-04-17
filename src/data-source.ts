import { config } from 'dotenv'
import { DataSource } from "typeorm";
config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        "dist/**/*.entity{.ts,.js}"
    ],
    synchronize: false,
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsRun: true,

})