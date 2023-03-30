package com.pruebaTablero.Tablero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pruebaTablero.Tablero.entity.Tarea;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {
    
}
