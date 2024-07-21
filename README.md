# API REST de Libro de Reclamaciones

Este proyecto es una API REST para la gestión de un Libro de Reclamaciones, diseñada para ser adaptable a cualquier sector comercial. Implementada con tecnologías modernas como Node.js, Sequelize y Express, esta API proporciona una solución robusta y escalable para administrar reclamos de clientes de manera eficiente.

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
git clone https://github.com/martirspe/complaints-book-server-pro.git
cd complaints-book-server-pro
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
DB_PASSWORD=contraseña
EMAIL_COMPANY= My Company
EMAIL_HOST=mail.example.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=test@example.com
EMAIL_PASSWORD=contraseña
JWT_SECRET=your_jwt_secret
```

## Ejecución

1. Inicia el servidor

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

## Uso

### API Endpoints

#### Clientes

##### Crear Cliente

- **URL**: `/api/clientes`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "t_documento_id": 1,
  "n_documento": "12345678",
  "nombres": "Juan",
  "apellidos": "Perez",
  "email": "juan.perez@example.com",
  "celular": "987654321",
  "direccion": "Avenida Las Américas 145",
  "m_edad": true
}
```

##### Obtener Todos los Clientes

- **URL**: `/api/clientes`
- **Método**: `GET`

##### Obtener Cliente por ID

- **URL**: `/api/clientes/:id`
- **Método**: `GET`

##### Actualizar Cliente

- **URL**: `/api/clientes/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "t_documento_id": 1,
  "n_documento": "34567891",
  "nombres": "Ana",
  "apellidos": "Díaz",
  "email": "ana.diaz@test.com",
  "celular": "927654322",
  "direccion": "Calle Los Pinos 123",
  "m_edad": true
}
```

##### Eliminar Cliente

- **URL**: `/api/clientes/:id`
- **Método**: `DELETE`

#### Usuarios

##### Crear Usuario

- **URL**: `/api/usuarios`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "email": "juan.perez@example.com",
  "password": "password123",
  "rol": "admin"
}
```

##### Obtener Todos los Usuarios

- **URL**: `/api/usuarios`
- **Método**: `GET`

##### Obtener Usuario por ID

- **URL**: `/api/usuarios/:id`
- **Método**: `GET`

##### Actualizar Usuario

- **URL**: `/api/usuarios/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "email": "juan.perez@example.com",
  "password": "newpassword123",
  "rol": "admin"
}
```

##### Eliminar Usuario

- **URL**: `/api/usuarios/:id`
- **Método**: `DELETE`

##### Login de Usuario

- **URL**: `/api/usuarios/login`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "email": "juan.perez@example.com",
  "password": "password123"
}
```

#### Tutores

##### Crear Tutor

- **URL**: `/api/tutores`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "t_documento_id": 1,
  "n_documento": "12345679",
  "nombres": "María",
  "apellidos": "López",
  "email": "maria.lopez@example.com",
  "celular": "955432100"
}
```

##### Obtener Todos los Tutores

- **URL**: `/api/tutores`
- **Método**: `GET`

##### Obtener Tutor por ID

- **URL**: `/api/tutores/:id`
- **Método**: `GET`

##### Actualizar Tutor

- **URL**: `/api/tutores/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "t_documento_id": 1,
  "n_documento": "12345670",
  "nombres": "Gimena",
  "apellidos": "López",
  "email": "gimena.lopez@example.com",
  "celular": "955432100"
}
```

##### Eliminar Tutor

- **URL**: `/api/tutores/:id`
- **Método**: `DELETE`

#### Tipos de Consumo

##### Crear Tipo de Consumo

- **URL**: `/api/tipos-consumo`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "nombre": "Producto"
}
```

##### Obtener Todos los Tipos de Consumo

- **URL**: `/api/tipos-consumo`
- **Método**: `GET`

##### Obtener Tipo de Consumo por ID

- **URL**: `/api/tipos-consumo/:id`
- **Método**: `GET`

##### Actualizar Tipo de Consumo

- **URL**: `/api/tipos-consumo/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "nombre": "Servicio"
}
```

##### Eliminar Tipo de Consumo

- **URL**: `/api/tipos-consumo/:id`
- **Método**: `DELETE`

#### Tipos de Reclamo

##### Crear Tipo de Reclamo

- **URL**: `/api/tipos-reclamo`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "nombre": "Queja"
}
```

##### Obtener Todos los Tipos de Reclamo

- **URL**: `/api/tipos-reclamo`
- **Método**: `GET`

##### Obtener Tipo de Reclamo por ID

- **URL**: `/api/tipos-reclamo/:id`
- **Método**: `GET`

##### Actualizar Tipo de Reclamo

- **URL**: `/api/tipos-reclamo/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "nombre": "Reclamo"
}
```

##### Eliminar Tipo de Reclamo

- **URL**: `/api/tipos-reclamo/:id`
- **Método**: `DELETE`

#### Reclamos

##### Crear Reclamo

- **URL**: `/api/reclamos`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "cliente_id": 1,
  "tutor_id": 1,
  "t_consumo_id": 1,
  "t_reclamo_id": 1,
  "n_pedido": 12345,
  "m_reclamado": 100.50,
  "descripcion": "Descripción del reclamo",
  "detalle": "Detalle del reclamo",
  "pedido": "Pedido del cliente",
  "a_adjunto": "ruta/al/archivo.pdf",
  "a_condiciones": true
}
```

##### Obtener Todos los Reclamos

- **URL**: `/api/reclamos`
- **Método**: `GET`

##### Obtener Reclamo por ID

- **URL**: `/api/reclamos/:id`
- **Método**: `GET`

##### Actualizar Reclamo

- **URL**: `/api/reclamos/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "m_reclamado": 200.00,
  "descripcion": "Nueva descripción del reclamo"
}
```

##### Asignar Reclamo

- **URL**: `/api/reclamos/:id/asignar`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "u_asignado": 1
}
```

##### Resolver Reclamo

- **URL**: `/api/reclamos/:id/resolver`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "respuesta": "Descripción de la resolución",
  "resuelto": true
}
```

##### Eliminar Reclamo

- **URL**: `/api/reclamos/:id`
- **Método**: `DELETE`

## Contribuir

Si deseas contribuir al proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.