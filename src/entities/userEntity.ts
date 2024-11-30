import { User } from 'dhinta-turborepo/packages/shared';

// export interface IUser {
//     id?: string;
//     name: string;
//     address: string;
//     createdAt?: Date;
//     updatedAt?: Date;
// }

export interface IUserState {
  userList: Array<User>;
  user: User | null;
  loading: boolean;
  error: string | null;
}