package com.pruebaTablero.Tablero.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pruebaTablero.Tablero.entity.Tarea;
import com.pruebaTablero.Tablero.repository.TareaRepository;

@RestController
public class TareaController {

    @Autowired
    private TareaRepository tareaRepository;

    @PostMapping("/tareas")
    public Tarea createTarea(@RequestBody Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    @GetMapping("/tareas")
    @ResponseBody
    public List<Tarea> getAllTareas() {
        return tareaRepository.findAll();
    }

    @PutMapping("/tareas/{id}")
    public Tarea updateTarea(@PathVariable Long id, @RequestBody Tarea tarea) {
        tarea.setId(id);
        return tareaRepository.save(tarea);
    }

    @DeleteMapping("/tareas/{id}")
    public void deleteTarea(@PathVariable Long id) {
        tareaRepository.deleteById(id);
    }
    
    @GetMapping("/tareas/{id}")
    @ResponseBody
    public Tarea getTareaById(@PathVariable Long id) {
        return tareaRepository.findById(id).orElse(null);
    }
    
}
