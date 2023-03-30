import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea } from '../../models/tarea';
import { MatDialogRef } from '@angular/material/dialog';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-n-tarea-form',
  templateUrl: './n-tarea-form.component.html',
  styleUrls: ['./n-tarea-form.component.scss'],
})
export class NTareaFormComponent {
  tarea: Tarea = {
    id: 0,
    titulo: '',
    descripcion: '',
    estado: 'Por hacer',
    fechaVencimiento: new Date(),
    peso: 0,
  };

  tareaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NTareaFormComponent>,
    private tareaService: TareaService
  ) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      estado: ['Por hacer'],
      fechaVencimiento: [''],
      peso: [''],
    });
  }

  onSubmit() {
    if (this.tareaForm.valid) {
      const tarea = new Tarea();
      tarea.titulo = this.tareaForm.get('titulo')?.value;
      tarea.descripcion = this.tareaForm.get('descripcion')?.value;
      tarea.estado = this.tareaForm.get('estado')?.value;
      tarea.fechaVencimiento = this.tareaForm.get('fechaVencimiento')?.value;
      tarea.peso = this.tareaForm.get('peso')?.value;

      // llama al servicio de tarea para crear una nueva tarea en el servidor
      this.tareaService.createTarea(tarea).subscribe({
        next: (tareaCreada) => {
          console.log('Tarea creada:', tareaCreada);
          // cierra el diálogo
          this.cerrarDialogo();
        },
        error: (error) => {
          console.error('Error al crear tarea:', error);
        },
      });
    }
  }

  cerrarDialogo() {
    this.dialogRef.close();
  }
}
