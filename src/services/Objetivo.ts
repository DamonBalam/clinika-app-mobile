import IAuditable from './Auditable';

export interface IObjetivo extends IAuditable {
  id: number;
  name: string;
  sku: string;
  description: string;
}
