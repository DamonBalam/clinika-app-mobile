import IAuditable from '../Auditable';

export interface ICitaControl extends IAuditable {
  id?: number;
  estatura: number | string;
  fecha: string;
  peso: number | string;
  musculo: number | string;
  grasa: number | string;
  porcentaje_grasa: number | string;
  cc: number | string;
  grasa_viseral: number | string;
  cliente_id: number | string;
  notas_cliente: string;
  notas_internas: string;
  ejercicio: string;
  consumo_agua_id: number | string;
}

enum EstadoConsulta {
  NO_CONFIRMADA = 'No confirmada',
  CANCELADA = 'Cancelada',
  CONFIRMADA = 'Confirmada',
}

export interface ICitaAgendaDTO {
  fecha_consulta: string;
  hora_start: string;
  hora_end: string;
  paciente_id: number;
  nutriologo_id: number;
  clinica_id: number;
  notas: string;
  estado_consulta: EstadoConsulta;
  videoconferencia?: string;
  google_calendar?: string;
}

export interface ICitaAgendaResponse extends ICitaAgendaDTO {
  id: number;
  created_at: string;
  updated_at: string;
}
