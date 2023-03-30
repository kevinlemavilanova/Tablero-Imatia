import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-vista-tarea',
  templateUrl: './vista-tarea.component.html',
  styleUrls: ['./vista-tarea.component.scss']
})
export class VistaTareaComponent {
  tarea: Tarea;

  constructor(
    public dialogRef: MatDialogRef<VistaTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tareaService: TareaService
  ) {
    this.tarea = data.tarea;
  }

  cerrarDialogo(): void {
    this.dialogRef.close();
  }

  completarTarea(): void {
    this.tarea.estado = 'Terminada';
    this.tareaService.updateTarea(this.tarea).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
