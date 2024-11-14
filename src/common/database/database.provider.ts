import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { SEQUELIZE } from '../../constants';
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const config = databaseConfig.dev;

      const sequelize = new Sequelize({
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        dialect: config.dialect,
      });
      sequelize.addModels([__dirname + '/entities/**/*.entity{.ts,.js}']);
      if (process.env.NODE_ENV !== 'prod') {
        try {
          await sequelize.sync({
            alter: true,
            // force: true,
          });
          console.log('Database synchronized successfully.');
        } catch (error) {
          console.error('Database synchronization failed:', error);
        }
      }

      return sequelize;
    },
  },
];
