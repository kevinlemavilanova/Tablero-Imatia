export class Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    fechaVencimiento: Date;
    peso: number;
    estado: string;
  
  constructor() {
    this.id = 0;
    this.titulo = '';
    this.descripcion = '';
    this.fechaVencimiento = new Date();
    this.peso = 0;
    this.estado = '';
  }
}