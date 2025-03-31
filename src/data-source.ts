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
    synchronize: false, // cuando necesite sincronizar colocar en true mejor usar migraciones(?)
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsRun: true,

})

// Crear migracion
// npx typeorm-ts-node-commonjs migration:generate -d ./src/data-source.ts -p ./migrations/nombre-migracion


// Correr migracion
// npx typeorm-ts-node-commonjs migration:run -- -d path-to-datasource-config
//npx typeorm-ts-node-commonjs migration:run -d dist/src/data-source.js

// Revertir migracion
// npx typeorm migration:revert -d ./data-source.ts


