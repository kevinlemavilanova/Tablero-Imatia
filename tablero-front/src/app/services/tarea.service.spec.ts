import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TareaService } from './tarea.service';
import { Tarea } from '../models/tarea';

describe('TareaService', () => {
  let service: TareaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TareaService],
    });
    service = TestBed.inject(TareaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('tareas'); // Limpiar tareas de localStorage después de cada test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTareas', () => {
    it('should return empty array if no tasks are saved in localStorage or server', () => {
      service.getTareas().subscribe((tareas) => {
        expect(tareas).toEqual([]);
      });
      const req = httpMock.expectOne('http://localhost:8080/tareas');
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should return tasks from localStorage if available and not make HTTP request', () => {
      const mockTareas = [
        { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción 1', estado: 'Por hacer', fechaVencimiento: new Date(2022, 0, 1), peso: 2 },
        { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción 2', estado: 'En proceso', fechaVencimiento: new Date(2022, 0, 2), peso: 1 }
      ];
      
      localStorage.setItem('tareas', JSON.stringify(mockTareas));
      service.getTareas().subscribe((tareas) => {
        expect(tareas).toEqual(mockTareas);
      });
      httpMock.expectNone('http://localhost:8080/tareas');
    });

    it('should return tasks from server and save to localStorage if not available in localStorage', () => {
      const mockTareas = [
        { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción 1', estado: 'Por hacer', fechaVencimiento: new Date(2022, 0, 1), peso: 2 },
        { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción 2', estado: 'En proceso', fechaVencimiento: new Date(2022, 0, 2), peso: 1 }
      ];
      
      service.getTareas().subscribe((tareas) => {
        expect(tareas).toEqual(mockTareas);
        expect(localStorage.getItem('tareas')).toEqual(
          JSON.stringify(mockTareas)
        );
      });
      const req = httpMock.expectOne('http://localhost:8080/tareas');
      expect(req.request.method).toBe('GET');
      req.flush(mockTareas);
    });
  });

  describe('createTarea', () => {
    it('should add a new task to the list in memory and make an HTTP request to add it to the server', () => {
      const tarea: Tarea = { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción 1', estado: 'Por hacer', fechaVencimiento: new Date(2022, 0, 1), peso: 2 };

      // Añadir tarea con método createTarea()
      service.createTarea(tarea).subscribe(createdTarea => {
        expect(createdTarea).toEqual(tarea);
        expect(service['tareas']).toContain(tarea);
      });
      const createReq = httpMock.expectOne('http://localhost:8080/tareas');
      expect(createReq.request.method).toBe('POST');
      createReq.flush(tarea);
  
      // Verificar que la tarea se guardó en localStorage
      const tareasStr = localStorage.getItem('tareas');
      expect(tareasStr).toBeTruthy();
      const tareas = JSON.parse(tareasStr || '[]');
      expect(tareas).toContain(tarea);
    });
  
    it('should emit an event when a new task is created', () => {
      const tarea: Tarea = { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción 1', estado: 'Por hacer', fechaVencimiento: new Date(2022, 0, 1), peso: 2 };
  
      let emittedTarea: Tarea | undefined;
      service.tareaCreada.subscribe(t => {
        emittedTarea = t;
      });
  
      // Añadir tarea con método createTarea()
      service.createTarea(tarea).subscribe(() => {
        expect(emittedTarea).toEqual(tarea);
      });
      const createReq = httpMock.expectOne('http://localhost:8080/tareas');
      createReq.flush(tarea);
    });
  });
  

  describe('updateTarea', () => {
    it('should update a task on the server and in memory', () => {
      // Arrange: set up mock data and a task to update
      const mockTareas = [
        { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción 1', estado: 'Por hacer', fechaVencimiento: new Date(2022, 0, 1), peso: 2 },
        { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción 2', estado: 'En proceso', fechaVencimiento: new Date(2022, 0, 2), peso: 1 }
      ];
      const tareaToUpdate: Tarea = { id: 1, titulo: 'Tarea 1 actualizada', descripcion: 'Descripción 1 actualizada', estado: 'En proceso', fechaVencimiento: new Date(2022, 0, 1), peso: 3 };
  
      // Act: call the updateTarea method
      service.updateTarea(tareaToUpdate).subscribe(updatedTarea => {
        // Assert: check that the task was updated on the server and in memory
        expect(updatedTarea).toEqual(tareaToUpdate);
        expect(service['tareas']).toEqual([tareaToUpdate, mockTareas[1]]);
        expect(localStorage.getItem('tareas')).toEqual(JSON.stringify([tareaToUpdate, mockTareas[1]]));
      });
  
      // Assert: check that the HTTP PUT request was made with the correct data
      const req = httpMock.expectOne(`http://localhost:8080/tareas/${tareaToUpdate.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(tareaToUpdate);
  
      // Respond to the request with the updated task
      req.flush(tareaToUpdate);
    });
  
    it('should handle errors when updating a task', () => {
      // Arrange: set up a task to update and an error response from the server
      const tareaToUpdate: Tarea = { id: 1, titulo: 'Tarea 1 actualizada', descripcion: 'Descripción 1 actualizada', estado: 'En proceso', fechaVencimiento: new Date(2022, 2, 1), peso: 3 };
      const errorMsg = 'Error updating task';
      const errorResponse = { status: 500, statusText: 'Internal Server Error' };
  
      // Act: call the updateTarea method
      service.updateTarea(tareaToUpdate).subscribe(
        () => {
          // If the call succeeds, fail the test
          fail('Expected error response');
        },
        (error) => {
          // Assert: check that the error was handled correctly
          expect(error).toBeTruthy();
          expect(error.status).toBe(errorResponse.status);
          expect(error.statusText).toBe(errorResponse.statusText);
        }
      );
  
      // Assert: check that the HTTP PUT request was made with the correct data
      const req = httpMock.expectOne(`http://localhost:8080/tareas/${tareaToUpdate.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(tareaToUpdate);
  
      // Respond to the request with an error
      req.flush(errorMsg, errorResponse);
    });
  });
  
});
