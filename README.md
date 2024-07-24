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
- Redis

## Requisitos

- Node.js (versión 14 o superior)
- MySQL
- Redis

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
EMAIL_COMPANY_NAME= My Company
EMAIL_LOGO_PATH=assets/logos/logo.png
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

#### Usuarios

##### Crear Usuario

- **URL**: `/api/users`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "license_type": "premium",
  "license_expiration_date": "2025-12-31T23:59:59.000Z",
  "role": "admin"
}
```

##### Obtener Todos los Usuarios

- **URL**: `/api/users`
- **Método**: `GET`

##### Obtener Usuario por ID

- **URL**: `/api/users/:id`
- **Método**: `GET`

##### Actualizar Usuario

- **URL**: `/api/users/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan.perez@example.com",
  "password": "newpassword123",
  "license_type": "basic",
  "license_expiration_date": "2025-12-31T23:59:59.000Z",
  "role": "staff"
}
```

##### Eliminar Usuario

- **URL**: `/api/users/:id`
- **Método**: `DELETE`

##### Login de Usuario

- **URL**: `/api/users/login`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Clientes

##### Crear Cliente

- **URL**: `/api/customers`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "document_type_id": 1,
  "document_number": "12345678",
  "first_name": "Juan",
  "last_name": "Perez",
  "email": "juan.perez@example.com",
  "phone": "987654321",
  "address": "Avenida Las Américas 145",
  "is_adult": true
}
```

##### Obtener Todos los Clientes

- **URL**: `/api/customers`
- **Método**: `GET`

##### Obtener Cliente por ID

- **URL**: `/api/customers/:id`
- **Método**: `GET`

##### Actualizar Cliente

- **URL**: `/api/customers/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "document_type_id": 1,
  "document_number": "34567891",
  "first_name": "Ana",
  "last_name": "Díaz",
  "email": "ana.diaz@test.com",
  "phone": "927654322",
  "address": "Calle Los Pinos 123",
  "is_adult": true
}
```

##### Eliminar Cliente

- **URL**: `/api/customers/:id`
- **Método**: `DELETE`


#### Tutores

##### Crear Tutor

- **URL**: `/api/tutors`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "document_type_id": 1,
  "document_number": "12345679",
  "first_name": "María",
  "last_name": "López",
  "email": "maria.lopez@example.com",
  "phone": "955432100"
}
```

##### Obtener Todos los Tutores

- **URL**: `/api/tutors`
- **Método**: `GET`

##### Obtener Tutor por ID

- **URL**: `/api/tutors/:id`
- **Método**: `GET`

##### Actualizar Tutor

- **URL**: `/api/tutors/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "document_type_id": 1,
  "document_number": "12345670",
  "first_name": "Gimena",
  "last_name": "López",
  "email": "gimena.lopez@example.com",
  "phone": "955432100"
}
```

##### Eliminar Tutor

- **URL**: `/api/tutors/:id`
- **Método**: `DELETE`

#### Tipos de Consumo

##### Crear Tipo de Consumo

- **URL**: `/api/consumption_types`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "name": "Producto"
}
```

##### Obtener Todos los Tipos de Consumo

- **URL**: `/api/consumption_types`
- **Método**: `GET`

##### Obtener Tipo de Consumo por ID

- **URL**: `/api/consumption_types/:id`
- **Método**: `GET`

##### Actualizar Tipo de Consumo

- **URL**: `/api/consumption_types/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "name": "Servicio"
}
```

##### Eliminar Tipo de Consumo

- **URL**: `/api/consumption_types/:id`
- **Método**: `DELETE`

#### Tipos de Reclamo

##### Crear Tipo de Reclamo

- **URL**: `/api/claim_types`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "name": "Queja"
}
```

##### Obtener Todos los Tipos de Reclamo

- **URL**: `/api/claim_types`
- **Método**: `GET`

##### Obtener Tipo de Reclamo por ID

- **URL**: `/api/claim_types/:id`
- **Método**: `GET`

##### Actualizar Tipo de Reclamo

- **URL**: `/api/claim_types/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "name": "Reclamo"
}
```

##### Eliminar Tipo de Reclamo

- **URL**: `/api/claim_types/:id`
- **Método**: `DELETE`

#### Reclamos

##### Crear Reclamo

- **URL**: `/api/claims`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "customer_id": 1,
  "tutor_id": 1,
  "consumption_type_id": 1,
  "claim_type_id": 1,
  "order_number": 12345,
  "claimed_amount": 99.00,
  "description": "Descripción del reclamo",
  "detail": "Detalle del reclamo",
  "request": "Pedido del cliente",
  "attachment": "ruta/al/archivo.pdf",
  "terms_accepted": true
}
```

##### Obtener Todos los Reclamos

- **URL**: `/api/claims`
- **Método**: `GET`

##### Obtener Reclamo por ID

- **URL**: `/api/claims/:id`
- **Método**: `GET`

##### Actualizar Reclamo

- **URL**: `/api/claims/:id`
- **Método**: `PUT`
- **Cuerpo**: (cualquier campo que desees actualizar)

```json
{
  "claimed_amount": 199.00,
  "description": "Nueva descripción del reclamo",
  "detail": "Nuevo detalle del reclamo",
  "request": "Nuevo pedido del cliente"
}
```

##### Asignar Reclamo

- **URL**: `/api/claims/:id/assign`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "assigned_user": 1
}
```

##### Resolver Reclamo

- **URL**: `/api/claims/:id/resolve`
- **Método**: `POST`
- **Cuerpo**:

```json
{
  "response": "Descripción de la resolución",
  "resolved": true
}
```

##### Eliminar Reclamo

- **URL**: `/api/claims/:id`
- **Método**: `DELETE`

#### Licencias

##### Verificación de Licencia

`GET /api/license`

##### Headers

- `Authorization`: Bearer `<token>`

##### Respuesta

- **200 OK**: Su licencia está activa.
  ```json
  {
    "licenseValid": true,
    "licenseType": "premium",
    "expirationDate": "2025-07-24T00:00:00.000Z",
    "message": "Your license is active."
  }
  ```

- **401 Unauthorized**: Acceso denegado. No se proporcionó ningún token.
  ```json
  {
    "message": "Access denied. No token provided."
  }
  ```

- **403 Forbidden**: Su licencia ha expirado.
  ```json
  {
    "licenseValid": false,
    "licenseType": "premium",
    "expirationDate": "2023-07-24T00:00:00.000Z",
    "message": "Your license has expired."
  }
  ```

- **404 Not Found**: No se encontró ninguna licencia para el usuario.
  ```json
  {
    "message": "No license was found for the user."
  }
  ```

##### Ejemplo de Uso con Postman

1. Abre Postman y selecciona el método `GET`.
2. Introduce la URL `http://yourdomain.com/api/license`.
3. En la pestaña `Headers`, añade un nuevo header:
   - Key: `Authorization`
   - Value: `Bearer <token>`
4. Haz clic en `Send`.

## Contribuir

Si deseas contribuir al proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.