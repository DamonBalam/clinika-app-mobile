import { IRole } from './Role';

export interface INutri {
  id?: number;
  name: string;
  first_lastname: string;
  second_lastname: string;
  email: string;
  rol: number | string | IRole;
}
