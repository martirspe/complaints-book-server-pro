```markdown
# API REST de un Libro de Reclamaciones

Este proyecto es un API REST de un Libro de Reclamaciones para una tienda, implementado utilizando Node.js, Sequelize y Express.

## Características

- Crear, actualizar y eliminar reclamos
- Asignar y resolver reclamos
- Enviar notificaciones por correo electrónico al crear, asignar y resolver reclamos
- Integración con base de datos MySQL

## Tecnologías

- Node.js
- Express
- Sequelize
- MySQL
- Nodemailer

## Requisitos

- Node.js (versión 14 o superior)
- MySQL

## Instalación

1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/sistema-gestion-reclamos.git
cd sistema-gestion-reclamos
```

2. Instala las dependencias

```bash
npm install
```

3. Configura la base de datos

   Crea una base de datos en MySQL y actualiza el archivo `config/db.js` con las credenciales de tu base de datos:

```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

module.exports = { sequelize };
```

4. Ejecuta las migraciones para crear las tablas en la base de datos

```bash
npx sequelize-cli db:migrate
```

5. Configura las variables de entorno

   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

```plaintext
PORT=3000
DB_HOST=localhost
DB_NAME=nombre_base_de_datos
DB_USER=usuario
DB_PASS=contraseña
EMAIL_SERVICE=gmail
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_email
```

## Ejecución

1. Inicia el servidor

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

## Uso

### Crear un Reclamo

Envía una solicitud POST a `http://localhost:3000/api/reclamos` con el siguiente cuerpo:

```json
{
  "cliente_id": 1,
  "tutor_id": 1,
  "tipo_reclamo_id": 1,
  "tipo_consumo_id": 1,
  "n_pedido": 12345,
  "m_reclamado": 100.50,
  "descripcion": "Descripción del reclamo",
  "detalle": "Detalle del reclamo",
  "pedido": "Pedido del cliente",
  "a_adjunto": "ruta/al/archivo.pdf",
  "a_condiciones": true
}
```

### Actualizar un Reclamo

Envía una solicitud PUT a `http://localhost:3000/api/reclamos/:id` con el cuerpo a actualizar.

### Asignar un Reclamo

Envía una solicitud POST a `http://localhost:3000/api/reclamos/:id/asignar` con el siguiente cuerpo:

```json
{
  "asignadoA": 1
}
```

### Resolver un Reclamo

Envía una solicitud POST a `http://localhost:3000/api/reclamos/:id/resolver` con el siguiente cuerpo:

```json
{
  "resolucion": "Descripción de la resolución",
  "resuelto": true
}
```

### Eliminar un Reclamo

Envía una solicitud DELETE a `http://localhost:3000/api/reclamos/:id`.

## Contribuir

Si deseas contribuir al proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
```