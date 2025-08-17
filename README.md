# 📚 Sistema de Gestión de Biblioteca (book-management API)

## 🚀 Descripción del Proyecto
book-management API es un sistema de gestión de biblioteca basica, robusto y escalable, construido con Node.js, Express y Prisma (ORM). Su objetivo principal es ofrecer una API RESTful para
la administración eficiente de libros, autores, géneros y préstamos, sirviendo como backend para futuras aplicaciones frontend.

Este proyecto se enfoca en la integridad de los datos, la seguridad mediante autenticación JWT y autorización basada en roles, y la escalabilidad a través de una arquitectura
limpia y el uso de transacciones de base de datos para operaciones críticas.

 ## Características Principales:
### Gestión de Usuarios:
  - Registro y autenticación de usuarios (JWT).
  - Roles de usuario (ADMIN, USER).
  - Manejo seguro de contraseñas (hashing).

### Gestión de Autores:
  - CRUD (Crear, Leer, Actualizar, Eliminar) de autores.
  - Asociación de autores a libros.
  - Gestión de Géneros:

### CRUD de géneros.
  - Relación de muchos a muchos con libros (un libro puede tener varios géneros, un género puede aplicarse a varios libros).
    
##Gestión de Libros:
  - CRUD completo de libros.
  - Manejo de stock de libros.
  - Asociación con autores y múltiples géneros.
  - Validaciones de datos robustas (ISBN único, formatos de fecha, etc.).

### Gestión de Préstamos:
  - Registro y devolución de préstamos de libros por parte de los usuarios.
  - Actualización atómica del stock de libros durante préstamos y devoluciones (usando transacciones de Prisma).
  - Restricción de préstamos a usuarios autenticados.
  - Visualización de préstamos activos e históricos por usuario.

## 🛠️ Tecnologías Utilizadas
  - Node.js: Entorno de ejecución de JavaScript.
  - Express.js: Framework web para construir la API REST.
  - TypeScript: Lenguaje que añade tipado estático a JavaScript.
  - Prisma ORM: ORM de próxima generación para interacción con la base de datos (MySQL).
  - MySQL: Base de datos relacional robusta.
  -Zod: Biblioteca para la validación de esquemas de datos.
  - JSON Web Tokens (JWT): Para autenticación y autorización segura.
  - Bcrypt.js: Para el hashing de contraseñas.
  - Dotenv: Para la gestión de variables de entorno.

## 🔐 Autenticación y Autorización
La API utiliza JWT (JSON Web Tokens) para la autenticación de usuarios.
Para acceder a la mayoría de los endpoints, necesitas incluir un token JWT válido en el encabezado Authorization como Bearer <tu_token_jwt>. 

Algunos endpoints están protegidos con autorización basada en roles. Por ejemplo:
  - La creación, actualización y eliminación de usuarios, autores, géneros y libros generalmente requieren el rol ADMIN.

## ⚙️ Configuración y Ejecución Local
Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

Prerrequisitos
  - Node.js (versión 18 o superior)
  - npm (o yarn)
  - Una instancia de MyeSQL en ejecución

1. Clonar el Repositorio
``` bash
   git clone https://github.com/tu-usuario/bookwave-api.git # Reemplaza con la URL de tu repositorio
   cd bookwave-api
```
2. Instalar Dependencias
``` bash
  npm install
  # o
  yarn install
```
3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto y configura las siguientes variables:
```env
  DATABASE_URL=""mysql://johndoe:randompassword@localhost:3306/mydb""
  JWT_SECRET="tu_secreto_jwt_muy_seguro_y_largo"
  PORT=3000
```
4. Configurar la Base de Datos con Prisma
Aplica las migraciones de Prisma para crear las tablas necesarias en tu base de datos:
```bash
  npm run prisma:migrate:dev
```
5. Iniciar la Aplicación
```bash
  npm run dev
  # o
  yarn dev
```

  
