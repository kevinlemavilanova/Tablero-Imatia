# Tablero

El proyecto a sido creado con Angular + Spring + MySql.

# Instalación

1. Cargar el SQL en la base de datos MySql.
2. Iniciar el servidor de backend.
    1. Hacer un `gradle build`.
    2. Inicar con `gradle bootRun`.
3. Iniciar el servidor de frontend.
    1. Hacer un `npm install`.
    2. Inicar con `ng serve`.

Navega hasta `http://localhost:4200/` y ahi debería estar nuestra app de tablero.

## Agregar nuevas tareas

Para agregar nuevas tareas a nuestro tablero tenemos que hacer uso del boton en la parte inferior de la lista de tareas de cada columna.

Esto nos abrira un dialog con el formulario de nueva tarea. Para que se habilite el boton de guardar se necesita cubrir al menos los campos de `Titulo` y `Descripcion`.

El campo peso indica el nivel de dificultad para dicha tarea( [1-5]->LOW, [5-7]->MEDIUM, [7-10]->HIGH )

Y la fecha Vencimiento es el tiempo que estimamos que la tarea se puede realizar como máximo.

Por último el estado que representa en que situación se encuentra nuestra tarea y tambien en que punto queremos que se coloque de inicio.

## Eliminar tarea

Para eliminar una tarea, tenemos que colocarnos encima de la tarjeta de dicha atrea y aparecera en la esquina superior un icono de borrar. Si se hace click sobre el la tarea será eliminada.

## Ver detalles de una tarea

Nos tenemos que dirigir a la tarjeta de la tarea de la que queremos ver los detalles y hacer click sobre el título de la misma, esto abrira
un dialog con la información de la tarea.

## Marcar tarea como completada

Simplemente debemos desplazar la tarjeta arrastrandola hacia la columna de `Terminada`.

## Sistema de Paginación

El sistema de paginación esta pensado para que se active cuando en alguna de las columnas haya más de 5 tareas. Por lo que cuando se activa el paginador se desplazan todas las columnas tengan o no mas de 5 tareas mostrando solo las tareas correspondientes que correspondan a esa página.
