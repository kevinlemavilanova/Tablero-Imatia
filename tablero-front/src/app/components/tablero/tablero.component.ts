import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea.service';
import { NTareaFormComponent } from '../n-tarea-form/n-tarea-form.component';
import { MatDialog } from '@angular/material/dialog';
import { VistaTareaComponent } from '../vista-tarea/vista-tarea.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})

export class TableroComponent implements OnInit {
  tareas: Tarea[] = [];
  todo: Tarea[] = [];
  doing: Tarea[] = [];
  done: Tarea[] = [];

  length = 0;
  pageSize = 5;
  pageIndex = 0;
  
  columnas = [
    {
      titulo: 'Por hacer',
      clase: 'porhacer',
      data: this.todo,
      connectedDropLists: ['proceso', 'terminada']
    },
    {
      titulo: 'En proceso',
      clase: 'proceso',
      data: this.doing,
      connectedDropLists: ['porhacer', 'terminada']
    },
    {
      titulo: 'Terminada',
      clase: 'terminada',
      data: this.done,
      connectedDropLists: ['porhacer', 'proceso']
    }
  ];

  constructor(private tareaService: TareaService, public dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getTareas();
    this.cdRef.detectChanges();
  }

  getTareas(): void {
    const tareasFromCache = localStorage.getItem('tareas'); // Obtener tareas desde la cache
    if (tareasFromCache) {
      this.tareas = JSON.parse(tareasFromCache);
      this.actualizarColumnas();
    } else {
      this.tareaService.getTareas().subscribe(tareas => {
        this.tareas = tareas;
        this.actualizarColumnas();
        localStorage.setItem('tareas', JSON.stringify(tareas)); // Almacenar tareas en la cache
      });
    }
  }

  // Divide las tareas filtrando por el estado
  actualizarColumnas(): void {
    const porHacer = this.tareas.filter(tarea => tarea.estado === 'Por hacer');
    const enProceso = this.tareas.filter(tarea => tarea.estado === 'En proceso');
    const terminadas = this.tareas.filter(tarea => tarea.estado === 'Terminada');

    // Calculo del numero de elementos maximo en las columnas
    const max = Math.max(porHacer.length, enProceso.length, terminadas.length);
    this.length = max;

    this.todo = porHacer;
    this.doing = enProceso;
    this.done = terminadas;

    this.columnas[0].data = this.todo;
    this.columnas[1].data = this.doing;
    this.columnas[2].data = this.done;
  }

  //Evento de drag&drop que recoge el estado de la columna donde se arrastra la tarea
  drop(event: CdkDragDrop<Tarea[]>, nuevoEstado: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const tarea = event.previousContainer.data[event.previousIndex+(this.pageIndex*this.pageSize)];
      tarea.estado = nuevoEstado;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex+(this.pageIndex*this.pageSize),
        event.currentIndex
      );
      this.actualizarEstadoTarea(tarea);
    }
  }
  
  onPageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
  }

  //Llamada al service para actualizar la tarea
  actualizarEstadoTarea(tarea: Tarea): void {
    this.tareaService.updateTarea(tarea).subscribe(() => {
      this.actualizarColumnas();
    });
  }

  openDialogNuevaTarea(): void {
    const dialogRef = this.dialog.open(NTareaFormComponent, {
      width: '60vw',
      maxWidth: '770px',
      height: 'auto',
      data: {}
    });
    dialogRef.afterClosed().subscribe( result => {
      this.getTareas()
    })
  }


  openDialogVistaTarea(tarea: Tarea): void {
    const dialogRef = this.dialog.open(VistaTareaComponent, {
      width: '60vw',
      maxWidth: '770px',
      height: 'auto',
      data: {tarea}
    });
    dialogRef.afterClosed().subscribe( result => {
      this.getTareas()
    })
  }

  eliminarTarea(id: number) {
    this.tareaService.deleteTarea(id).subscribe({
      error: (error) => {
        console.error('Error al eliminar la tarea:', error);
      },
      complete: () => {
        this.getTareas();
      }
    });
  }
  

}
