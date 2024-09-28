import IAuditable from './Auditable';

export interface IActividadFisica extends IAuditable {
  id: number;
  name: string;
  sku: string;
  description: string;
}
