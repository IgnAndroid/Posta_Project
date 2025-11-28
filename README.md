# Sistema de Gestión de Citas Médicas

Sistema integral para la gestión de citas médicas en centros de salud

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Knex.js](https://img.shields.io/badge/Knex.js-FF6B6B?logo=knex.js&logoColor=white)](https://knexjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

## Características Principales

### Gestión de Usuarios y Accesos
- Autenticación segura con múltiples roles (administrador, médico, paciente, personal)
- Control de acceso basado en roles (RBAC)
- Registro y perfil de pacientes
- Gestión de personal médico

### Gestión de Citas
- Programación flexible de citas
- Seguimiento en tiempo real del estado de citas
- Recordatorios automáticos
- Historial médico accesible

### Seguridad y Cumplimiento
- Autenticación JWT
- Encriptación de contraseñas con bcrypt
- Protección contra ataques comunes (XSS, CSRF, etc.)
- Cumplimiento de normativas de privacidad

### Arquitectura y Rendimiento
- API RESTful documentada con OpenAPI
- Base de datos optimizada para alto rendimiento
- Interfaz de usuario responsiva
- Configuración para múltiples entornos (desarrollo, pruebas, producción)

## Requisitos Técnicos

### Entorno de Desarrollo
- Node.js 18 o superior
- NPM 9 o superior
- SQLite 3.35+
- Navegadores web modernos (Chrome, Firefox, Edge, Safari)

### Producción
- Node.js 18 LTS o superior
- PostgreSQL 13+
- Servidor web (Nginx/Apache)
- Certificado SSL/TLS

### Dependencias Principales
- Express.js - Framework web
- Knex.js - Constructor de consultas SQL
- JWT - Autenticación
- Bcrypt - Encriptación
- Winston - Logging

## Instalación

### Requisitos Previos
Asegúrese de tener instalados los siguientes componentes:
- Node.js 18+
- NPM 9+
- Base de datos (SQLite para desarrollo, PostgreSQL para producción)

### Pasos de Instalación

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/tu-empresa/mi-posta.git
   cd mi-posta
   ```

2. **Configuración del Entorno**
   ```bash
   # Instalar dependencias
   npm install
   
   # Configurar variables de entorno
   cp .env.example .env
   # Editar el archivo .env con sus credenciales
   ```

3. **Configuración de la Base de Datos**
   ```bash
   # Instalar migraciones
   npm run db:migrate:latest
   
   # Poblar datos iniciales (opcional)
   npm run db:seed
   ```

4. **Iniciar el Servidor**
   ```bash
   # Modo desarrollo
   npm run dev
   
   # Modo producción
   npm run build
   npm start
   ```

5. **Acceder a la Aplicación**
   Abra su navegador y visite: http://localhost:3000
   
   # Poblar con datos de prueba (opcional)
   npm run db:seed
   ```

4. **Iniciar el servidor**
   ```bash
   # Modo desarrollo
   npm run dev
   
   # Modo producción
   npm start
   ```

## Estructura del Proyecto

```
src/
├── config/           # Configuraciones
│   └── database.js   # Configuración de la base de datos
├── controllers/      # Controladores de la API
├── models/           # Modelos de datos
├── routes/           # Rutas de la API
├── services/         # Lógica de negocio
├── utils/            # Utilidades y helpers
├── migrations/       # Migraciones de base de datos
├── scripts/          # Scripts de utilidad
├── assets/           # Recursos estáticos
└── views/            # Vistas HTML
    ├── admin/        # Panel de administración
    ├── auth/         # Autenticación
    ├── medico/       # Área de médicos
    └── paciente/     # Área de pacientes
```

## Seguridad

- Autenticación basada en JWT
- Hash de contraseñas con bcrypt
- Protección contra inyección SQL
- Headers de seguridad con Helmet
- Rate limiting
- Validación de entrada

## 📊 Base de Datos

### Diagrama Entidad-Relación

```mermaid
erDiagram
    USERS ||--o{ DOCTORS : "1:1"
    USERS ||--o{ PATIENTS : "1:1"
    DOCTORS ||--o{ APPOINTMENTS : "1:N"
    PATIENTS ||--o{ APPOINTMENTS : "1:N"
    
    USERS {
        int id PK
        string name
        string email UK
        string password_hash
        enum role
        boolean is_active
        datetime created_at
        datetime updated_at
    }
    
    DOCTORS {
        int id PK
        int user_id FK
        string specialty
        string license_number UK
        time schedule_start
        time schedule_end
        datetime created_at
        datetime updated_at
    }
    
    PATIENTS {
        int id PK
        int user_id FK
        date birth_date
        string blood_type
        decimal height
        decimal weight
        text allergies
        text conditions
        datetime created_at
        datetime updated_at
    }
    
    APPOINTMENTS {
        int id PK
        int doctor_id FK
        int patient_id FK
        datetime start_time
        datetime end_time
        string status
        text notes
        datetime created_at
        datetime updated_at
    }
```

## 🚀 Despliegue

### Producción con PM2

1. Instalar PM2 globalmente:
   ```bash
   npm install -g pm2
   ```

2. Iniciar la aplicación en producción:
   ```bash
   NODE_ENV=production pm2 start src/app.js --name "mi-posta"
   ```

3. Configurar reinicio automático:
   ```bash
   pm2 startup
   pm2 save
   ```

##  Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

##  Contribución

Las contribuciones son bienvenidas. Por favor, lee las [pautas de contribución](CONTRIBUTING.md) antes de enviar un pull request.

##  Contacto

- **Correo Electrónico**: desarrollo@miposta.com
- **Sitio Web**: [https://miposta.com](https://miposta.com)

---

<div>
  Hecho con ❤️ por el equipo de miPosta
</div>

## Tabla de Contenidos
- [Características Principales](#características-principales)
- [Requisitos Técnicos](#requisitos-técnicos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Seguridad](#seguridad)
- [Base de Datos](#base-de-datos)
- [Arquitectura](#arquitectura)
- [API Endpoints](#api-endpoints)
- [Pruebas](#pruebas)
- [Despliegue](#despliegue)
- [Licencia](#licencia)
- [Contribución](#contribución)
- [Contacto](#contacto)

## Características Principales

- Autenticación segura con múltiples roles (administrador, médico, paciente, personal)
- Gestión completa de citas médicas con seguimiento de estado
- Calendario de disponibilidad de personal médico
- Historial clínico electrónico de pacientes
- Panel de administración integral
- API RESTful documentada para integraciones externas
- Interfaz de usuario intuitiva y responsiva

## Requisitos Técnicos

- Node.js 16 o superior
- NPM 8 o superior
- SQLite (entorno de desarrollo)
- PostgreSQL (entorno de producción)
- Navegadores web modernos (últimas 2 versiones de Chrome, Firefox, Safari, Edge)

## Instalación

### Requisitos Previos

Asegúrese de tener instalado Node.js y NPM en su sistema.

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/mi-posta.git
   cd mi-posta
   ```

2. Instalar dependencias del proyecto:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   NODE_ENV=development
   PORT=3000
   JWT_SECRET=clave_secreta_segura_aqui
   DATABASE_URL=sqlite:./dev.sqlite3
   ```

4. Ejecutar migraciones de base de datos:
   ```bash
   npx knex migrate:latest
   ```

5. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

```
src/
├── assets/                 # Recursos estáticos (CSS, imágenes, etc.)
├── config/                 # Configuraciones de la aplicación
├── controllers/            # Controladores de la API
├── migrations/             # Migraciones de base de datos
├── models/                 # Modelos de datos
├── routes/                 # Rutas de la API
├── services/               # Lógica de negocio
│   ├── AuthService.js      # Autenticación y autorización
│   ├── AppointmentService.js # Gestión de citas
│   └── BaseService.js      # Servicio base con operaciones CRUD
├── utils/                  # Utilidades y helpers
└── views/                  # Vistas HTML
    ├── admin/              # Panel de administración
    ├── auth/               # Autenticación
    ├── medico/             # Área de médicos
    └── paciente/           # Área de pacientes
```

## Seguridad

El sistema implementa las siguientes medidas de seguridad:

- Autenticación basada en JWT (JSON Web Tokens)
- Hashing de contraseñas con bcrypt
- Validación de entrada en todos los endpoints
- Protección contra CSRF (Cross-Site Request Forgery)
- Prevención de XSS (Cross-Site Scripting)
- Configuración segura de CORS (Cross-Origin Resource Sharing)
- Headers de seguridad HTTP
- Rate limiting para prevenir ataques de fuerza bruta

## Base de Datos

### Diagrama Entidad-Relación

El sistema utiliza un modelo de datos relacional con las siguientes entidades principales:

- **USERS**: Información de autenticación y perfiles de usuario
- **DOCTORS**: Especialización de usuarios con rol médico
- **PATIENTS**: Especialización de usuarios con rol de paciente
- **APPOINTMENTS**: Registro de citas médicas

```mermaid
erDiagram
    USERS ||--o{ DOCTORS : "1:1"
    USERS ||--o{ PATIENTS : "1:1"
    DOCTORS ||--o{ APPOINTMENTS : "1:N"
    PATIENTS ||--o{ APPOINTMENTS : "1:N"
    
    USERS {
        int id PK
        string name
        string email
        string password_hash
        enum role
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    DOCTORS {
        int id PK
        int user_id FK
        string specialty
        string license_number
        time working_hours_start
        time working_hours_end
    }
    
    PATIENTS {
        int id PK
        int user_id FK
        string blood_type
        decimal height
        decimal weight
    }
    
    APPOINTMENTS {
        int id PK
        int patient_id FK
        int doctor_id FK
        timestamp start_time
        timestamp end_time
        enum status
        text notes
        timestamp created_at
        timestamp updated_at
    }
```

## Arquitectura

### Patrones de Diseño

1. **Repository Pattern**
   - Ubicación: `src/services/BaseService.js`
   - Propósito: Abstraer el acceso a datos y centralizar las operaciones CRUD

2. **Service Layer**
   - Ubicación: `src/services/`
   - Propósito: Separar la lógica de negocio de los controladores

3. **Middleware Pattern**
   - Ubicación: `src/middleware/`
   - Propósito: Manejar autenticación, validación y manejo de errores

4. **Factory Pattern**
   - Ubicación: `src/factories/`
   - Propósito: Creación de objetos complejos

### Principios SOLID

1. **Single Responsibility Principle (SRP)**: Cada clase tiene una única responsabilidad
2. **Open/Closed Principle (OCP)**: Las entidades están abiertas a extensión pero cerradas a modificación
3. **Liskov Substitution Principle (LSP)**: Las clases derivadas pueden sustituir a sus clases base
4. **Interface Segregation Principle (ISP)**: Las interfaces son específicas para cada cliente
5. **Dependency Inversion Principle (DIP)**: Dependencia de abstracciones, no de implementaciones

## API Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | /api/auth/register | Registrar nuevo usuario |
| POST   | /api/auth/login | Iniciar sesión |
| GET    | /api/auth/me | Obtener información del usuario actual |
| POST   | /api/auth/refresh | Refrescar token de acceso |
| POST   | /api/auth/logout | Cerrar sesión |

### Citas Médicas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | /api/appointments | Listar citas (con filtros) |
| POST   | /api/appointments | Crear nueva cita |
| GET    | /api/appointments/:id | Obtener detalles de cita |
| PUT    | /api/appointments/:id | Actualizar cita |
| DELETE | /api/appointments/:id | Cancelar cita |
| GET    | /api/appointments/doctor/:doctorId | Obtener citas por médico |
| GET    | /api/appointments/patient/:patientId | Obtener citas por paciente |

### Médicos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | /api/doctors | Listar médicos |
| GET    | /api/doctors/:id | Obtener perfil de médico |
| GET    | /api/doctors/:id/availability | Ver disponibilidad |
| GET    | /api/doctors/specialties | Listar especialidades |

### Pacientes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | /api/patients | Listar pacientes |
| GET    | /api/patients/:id | Obtener perfil de paciente |
| GET    | /api/patients/:id/medical-history | Obtener historial médico |

## Pruebas

El proyecto incluye pruebas unitarias y de integración. Para ejecutar las pruebas:

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Generar cobertura de código
npm run test:coverage
```

## Despliegue

### Requisitos para Producción

- Servidor con Node.js 16 o superior
- Base de datos PostgreSQL
- Servidor web (Nginx o Apache) como proxy inverso
- Gestor de procesos (PM2 recomendado)
- Certificado SSL (recomendado)

### Variables de Entorno de Producción

Crear un archivo `.env` en producción con las siguientes variables:

```env
NODE_ENV=production
PORT=3000
JWT_SECRET=clave_secreta_muy_segura_aqui
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/miposta_prod
```

### Pasos de Despliegue

1. Instalar dependencias de producción:
   ```bash
   npm install --production
   ```

2. Construir la aplicación:
   ```bash
   npm run build
   ```

3. Iniciar la aplicación con PM2:
   ```bash
   pm2 start dist/app.js --name "mi-posta"
   ```

4. Configurar Nginx como proxy inverso (ejemplo de configuración):
   ```nginx
   server {
       listen 80;
       server_name tuejemplo.com;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name tuejemplo.com;

       ssl_certificate /ruta/a/tu/certificado.crt;
       ssl_certificate_key /ruta/a/tu/llave_privada.key;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. Configurar PM2 para inicio automático:
   ```bash
   pm2 startup
   pm2 save
   ```

## Licencia

Este proyecto es de uso exclusivo para el personal autorizado de [Universidad Privada del Norte]. Queda estrictamente prohibida su distribución, modificación o uso sin autorización expresa.

## Contribución

Las contribuciones son bienvenidas. Por favor, siga estos pasos:

1. Haga un fork del repositorio
2. Cree una rama para su característica (`git checkout -b feature/nueva-caracteristica`)
3. Haga commit de sus cambios (`git commit -am 'Añadir nueva característica'`)
4. Haga push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abra un Pull Request

## Contacto

Para más información, por favor contacte al equipo de desarrollo:

- **Correo Electrónico**: desarrollo@miposta.com
- **Sitio Web**: [https://www.miposta.com](https://www.miposta.com)
- **Teléfono**: +51 123 456 789

---

**Nota**: Este documento está sujeto a cambios sin previo aviso. Última actualización: Noviembre 2025.