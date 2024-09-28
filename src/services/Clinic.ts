import IAuditable from './Auditable';

export interface IClinic extends IAuditable {
  id?: number;
  name: string;
  address: string;
  phone: string;
}
