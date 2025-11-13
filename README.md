# Sistema de Gestión de Citas Médicas - miPosta

## Instrucciones para Desarrolladores

Antes de subir cambios, es obligatorio notificar sobre la funcionalidad implementada. Cualquier commit realizado sin previa aprobación será rechazado.

## Patrones de Diseño y Arquitectura

### Patrones de Diseño Implementados

#### 1. Factory Pattern
- **Ubicación**: `src/js/services/AuthService.js`
- **Propósito**: Creación de instancias de servicios de autenticación de manera desacoplada.

#### 2. Module Pattern
- **Ubicación**: `src/js/utils/helpers.js`
- **Propósito**: Encapsulación de funcionalidades relacionadas en módulos independientes.

#### 3. Observer Pattern
- **Ubicación**: `src/js/auth/login.js`
- **Propósito**: Manejo de eventos del formulario de inicio de sesión.

### Principios SOLID Aplicados

#### 1. Single Responsibility Principle (SRP)
- **Ejemplo**: `AuthService` se encarga únicamente de la autenticación.
- **Ubicación**: `src/js/services/AuthService.js`

#### 2. Open/Closed Principle (OCP)
- **Ejemplo**: Los módulos están diseñados para ser extendidos sin modificar su código fuente.

#### 3. Liskov Substitution Principle (LSP)
- **Ejemplo**: Las clases hijas pueden ser sustituidas por sus clases base sin alterar el comportamiento del programa.

#### 4. Interface Segregation Principle (ISP)
- **Ejemplo**: Interfaces específicas para cada tipo de servicio.

#### 5. Dependency Inversion Principle (DIP)
- **Ejemplo**: Inyección de dependencias en los constructores de los servicios.

## 🚀 Estructura del Proyecto

```
src/
├── assets/         # Recursos estáticos
├── js/
│   ├── auth/       # Lógica de autenticación
│   ├── services/   # Servicios de la aplicación
│   └── utils/      # Utilidades y helpers
└── views/          # Vistas HTML
    ├── admin/      # Panel de administración
    ├── auth/       # Vistas de autenticación
    ├── medico/     # Vistas para personal médico
    └── public/     # Páginas públicas
```

## Seguridad
- Validación de formularios tanto en cliente como en servidor
- Manejo seguro de credenciales
- Protección contra XSS y CSRF

## Notas para Desarrolladores
1. Sigue las convenciones de código establecidas
2. Documenta todo el código nuevo
3. Realiza pruebas unitarias
4. Mantén la consistencia en el estilo de código
5. No subas credenciales ni información sensible

## Licencia
Este proyecto es de uso exclusivo para el personal autorizado de [Universidad Privada del Norte].