import { TypeOrmModule } from "@nestjs/typeorm";
import { getEnv } from "../utils/env";
import { EnvironmentsEnum } from "../enums/environments.enum";

export const DatasourceConfigModule = TypeOrmModule.forRootAsync({
    useFactory: () => ({
        type: 'mysql',
        host: getEnv('DB_HOST'),
        port: parseInt(getEnv('DB_PORT') || '3306', 10),
        username: getEnv('DB_USERNAME'),
        password: getEnv('DB_PASSWORD'),
        database: getEnv('DB_SCHEMA'),
        entities: [__dirname + '/../**/schema/*.schema.{ts,js}'],
        autoLoadEntities: true,
        synchronize: getEnv('ENV') !== EnvironmentsEnum.PRODUCTION,
    }),
})