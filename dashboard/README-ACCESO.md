# Acceso a la plataforma de organizadores

## 1. Envío automático de solicitudes a tu correo

El formulario de solicitud está configurado para enviar los datos **en automático** a **eauniversidadesmexico@gmail.com** al hacer clic en "Enviar solicitud", sin abrir el cliente de correo.

Se usa **Formspree** (gratis, sin instalar servidor):

1. Entra a [formspree.io](https://formspree.io) y crea una cuenta.
2. Crea un formulario nuevo y en "Email" pon **eauniversidadesmexico@gmail.com**.
3. Copia el **Form ID** (algo como `xyzwabcd`).
4. En `solicitud.html`, busca en el script la variable `FORMSPREE_ID` y sustituye `'TU_FORM_ID'` por tu ID real.

```javascript
var FORMSPREE_ID = 'xyzwabcd';  // reemplaza con tu ID de Formspree
```

Con eso, cada envío del formulario llegará como correo a eauniversidadesmexico@gmail.com.

---

## 2. Cómo lograr que solo entren quienes tengan las credenciales que tú das

Hoy el login es **simulado** (cualquier correo/contraseña en la página de login deja entrar). Para que **solo** puedan entrar las personas a las que tú les envías usuario y contraseña, hace falta que el login esté respaldado por un sistema que tú controles.

### Opción A: Backend propio (recomendado si ya tienes o vas a tener servidor)

- Tienes una **base de datos** (o lista) de **usuarios permitidos**: solo los que tú das de alta (por ejemplo tras aprobar una solicitud).
- No hay registro público: nadie puede “crear cuenta” desde la web. Tú creas la cuenta (correo + contraseña) y se las envías por correo.
- La página de **login** envía correo y contraseña a **tu backend**. El backend:
  - Comprueba que exista ese usuario en tu base de datos.
  - Comprueba que la contraseña coincida (guardando contraseñas encriptadas, por ejemplo con bcrypt).
  - Si todo es correcto, devuelve una sesión o token; el dashboard solo se muestra si hay sesión válida.

Así, **solo tienen acceso quienes tienen credenciales que tú has creado y enviado**.

### Opción B: Servicios de autenticación (Firebase, Supabase, Auth0)

- Usas un servicio que guarda usuarios y hace el login por ti.
- Tú **creas los usuarios a mano** en el panel del servicio (o con un pequeño panel interno tuyo): pones correo y contraseña temporal, y esa contraseña se la envías al organizador por correo.
- Desactivas el “registro” público para que nadie pueda darse de alta solo.
- La página de login usa el SDK del servicio; solo los usuarios que existan en ese sistema podrán entrar.

Igual que antes: **solo entran quienes tienen las credenciales que tú les proporcionas**.

### Resumen del flujo que tú quieres

1. La persona pide acceso con el formulario → tú recibes el correo en **eauniversidadesmexico@gmail.com**.
2. Tú apruebas y **creas** su usuario (en tu backend o en Firebase/Supabase/Auth0) con un correo y una contraseña que tú eliges.
3. Le envías por correo esas **credenciales** (y, si quieres, el enlace a la página de login).
4. Esa persona solo puede entrar si usa **exactamente** ese correo y esa contraseña; nadie más puede “registrarse” ni obtener acceso sin que tú des de alta un usuario.

Si más adelante quieres que te proponga código concreto (por ejemplo Node.js + base de datos o Supabase), se puede hacer en otro paso.
