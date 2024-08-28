import { User } from '../../common/database/entities/user.entity';
import { USER_REPOSITORY } from 'src/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
