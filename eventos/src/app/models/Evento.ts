export interface Evento {
  id: number;
  name: string;
  address: string;
  open_time: string;
  close_time: string;
  city: string;
  state: string;
  avg_score: number;
  categories: string[]; // Esto es un arreglo de strings
  working_hours:  string;
}
