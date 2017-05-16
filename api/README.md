# API del curso de Now
Este es un API GrahpQL que usa PostgreSQL como base de datos.

Fue hecho para hacerle deploy en el curso de Now.sh de Platzi.

## Variables de entorno
- NODE_ENV = entorno de ejecución (development)
- PORT     = puerto del servidor (3000)
- HOST     = host del servidor (localhost)
- DB_USER  = el nombre de usuario de la base de datos
- DB_PASS  = el password de la base de datos
- DB_HOST  = el host de la base de datos
- DB_NAME  = el nombre de la base de datos
- DB_PORT  = el puerto de la base de datos

## Endpoints
### `/graphql`
La URL desde la cual se van a poder hacer peticiones al API.

### `/ide` (desarrollo)
La URL para probar nuestros endpoints de GraphQL. Solo funciona en desarrollo.
