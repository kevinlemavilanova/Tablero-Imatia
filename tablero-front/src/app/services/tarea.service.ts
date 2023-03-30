import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Tarea } from '../models/tarea';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private url = 'http://localhost:8080/tareas';
  private tareaCreadaSubject = new Subject<Tarea>();  // Subject para emitir eventos cuando se crea una nueva tarea
  private tareas: Tarea[] = []; // Lista de tareas en memoria

  constructor(private http: HttpClient) {
    // Cargar las tareas almacenadas en localStorage al inicializar el servicio
    const tareasStr = localStorage.getItem('tareas');
    if (tareasStr) {
      this.tareas = JSON.parse(tareasStr);
    }
  }

  getTareas(): Observable<Tarea[]> {
    if (this.tareas.length > 0) {
      // Si la lista de tareas ya está en memoria, devolverla directamente
      return of(this.tareas);
    } else {
      // Si no, hacer la petición HTTP y guardar la lista de tareas en memoria y en localStorage
      return this.http.get<Tarea[]>(this.url).pipe(
        tap(tareas => {
          this.tareas = tareas;
          localStorage.setItem('tareas', JSON.stringify(tareas));
        })
      );
    }
  }

  createTarea(tarea: Tarea): Observable<Tarea> {
    // Añadir la tarea a la lista en memoria y en localStorage
    this.tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(this.tareas));

    // Hacer la petición HTTP y emitir evento de tarea creada
    return this.http.post<Tarea>(this.url, tarea).pipe(
      tap(tareaCreada => {
        this.tareaCreadaSubject.next(tareaCreada);
      })
    );
  }

  // Obtener el Subject de tarea creada
  get tareaCreada(): Observable<Tarea> {
    return this.tareaCreadaSubject.asObservable();
  }

  updateTarea(tarea: Tarea): Observable<Tarea> {
    const url = `${this.url}/${tarea.id}`;
    // Actualizar la tarea en la lista en memoria y en localStorage
    const index = this.tareas.findIndex(t => t.id === tarea.id);
    if (index !== -1) {
      this.tareas[index] = tarea;
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }

    // Hacer la petición HTTP
    return this.http.put<Tarea>(url, tarea);
  }

  deleteTarea(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    // Eliminar la tarea de la lista en memoria y en localStorage
    const index = this.tareas.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tareas.splice(index, 1);
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }

    // Hacer la petición HTTP
    return this.http.delete<void>(url);
  }

}
