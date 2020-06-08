# Eye Movies

## Miembros del desarrollo:

* Micaela Pujol Higueras, @mpujoh00.
* Marco Antonio Pacheco Moreno, @ocrampac96.
* Isaac García Casal, @heptacat.

## Instrucciones para que funcione la aplicación en la máquina virtual.

### Frontend
* `cd frontend`: Para situarse en el frontend.
* Editar el archivo main.js localizado dentro de la carpeta src, cambiando el localhost por la dirección IP de la máquina virtual.
* `npm run build`: Se generan los archivos para subir a producción.
* Subir el contenido de la carpeta generada _dist_ a la carpeta _html_ del servidor apache, usando un cliente ftp (como filezilla).

### Backend

* Subir el contenido de la carpeta del backend a _nodejs_ for ftp y situarse en ella.
* Crear una nueva base de datos, desde phpMyAdmin, llamada **login-nodejs2**.
* Migrar las tablas a la base de datos con el comando `npx sequelize-cli db:migrate`.
* Descargar los node-modules con `npm install`.
* Ejecutar el backend con el comando `pm2 start app.js`.

