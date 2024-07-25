import { User, UserRole} from '../types/index';

export let users: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@book.club',
    createdAt: new Date().toISOString(),
    role: 'admin' as UserRole
  },
  {
    id: '2',
    username: 'user',
    email: 'user@book.club',
    createdAt: new Date().toISOString(),
    role: 'user' as UserRole
  }
];

export const addUser = (user: User) => {
  users = [...users, user];
};