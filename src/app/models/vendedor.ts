
export interface Vendedor {
  id?: number; 
  fechaNacimiento: string;
  habilitado: boolean;
  localidadId: number;
  nombre: string;
  observaciones: null | string;
  usuarioLogin: string;
}
