# SimpleCRUD

Una aplicación **CRUD** (Create, Read, Update, Delete) sencilla para manejar entradas y sus mensajes.

## Descripción
Este proyecto tiene como objetivo servir como base para un **CRUD** básico de entradas y mensajes. Actualmente, todo el código se encuentra en un solo archivo y los datos se almacenan en memoria. A medida que el servidor se ejecute, se podrán crear, leer, actualizar y borrar entradas y mensajes; sin embargo, al reiniciar el servidor toda la información se pierde, ya que no hay una base de datos ni almacenamiento persistente.

## Características actuales

- **CRUD para las entradas**: Se pueden crear, leer, actualizar y eliminar entradas (posts).
- **CRUD para los mensajes**: Cada entrada puede tener mensajes asociados, que también pueden crearse, leerse, actualizarse y eliminarse.
- **Un solo archivo de servidor**: Toda la lógica se concentra en un único archivo de Node.js.

## Pros y Contras del estado actual

### Pros
1. **Simplicidad**: Al estar en un solo archivo, es fácil de leer y entender para proyectos iniciales o de práctica.
2. **Rápida implementación**: Agregar o modificar funcionalidades es directo porque no hay muchas capas de abstracción.

### Contras
1. **Falta de organización**: A medida que el proyecto crezca, la mantenibilidad se volverá compleja.
2. **Sin persistencia**: Todos los datos se guardan en memoria; si el servidor se apaga, la información se pierde.
3. **Dificultad para escalar**: Dividir el proyecto en módulos o microservicios será más costoso conforme crezca el código acoplado.

## Planes de mejora

1. **Dividir el código en módulos**  
   - Crear distintos archivos para manejar rutas, controladores (controllers) y lógica de negocio (services), entre otros.  
   - Facilitar el testing y la mantenibilidad.

2. **Persistencia**  
   - **CSV**: Como primer paso para tener persistencia, vamos a crear un archivo CSV (o varios) donde se almacenen los datos de entradas y mensajes.  
     - Uso de Node.js y el módulo `fs` para leer y escribir datos en el archivo.
     - **Beneficios**:
       - Los datos no se perderán cuando el servidor se reinicie.
       - Proceso de migración sencillo a otro tipo de almacenamiento (BD relacional o NoSQL) en el futuro.
     - **Contras**:
       - Manejo de concurrencia: cuando varios procesos escriben al mismo archivo, puede haber conflictos.
       - Estructura limitada al formato CSV (no es tan flexible como JSON u otros formatos).

3. **Migrar a una base de datos**  
   - Una vez dominado el archivo CSV, podríamos usar una base de datos como **SQLite**, **PostgreSQL**, **MongoDB**, etc.  
   - Aporta mayor robustez, escalabilidad y menos problemas de concurrencia.

## Uso del proyecto

1. **Instalación**  
   ```bash
   npm install
2. **Corre**  
   ```bash
   npm start


## Próximos pasos
    Implementar la lectura y escritura en el archivo CSV para asegurar la persistencia.
    Organizar la estructura del proyecto en diferentes archivos o carpetas (routes, controllers, services, etc.).
    Añadir tests unitarios e integrados para garantizar la calidad del código.
    Migrar a una base de datos más adelante si el proyecto requiere mejor escalabilidad o robustez.