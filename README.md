# Delatouch — sitio estático

## Qué es esto
Estructura completa del sitio (hero, servicios, trabajo, DTH, contacto) con
animaciones GSAP + scroll suave Lenis. Todo autohospedado (fuentes y librerías
incluidas en /js y /fonts) — no depende de ningún CDN externo, así que no se
puede romper si un CDN cae.

## Estructura
```
index.html
styles.css
script.js
fonts/            (Space Grotesk, Inter, Space Mono en woff2)
js/               (gsap, ScrollTrigger, lenis — vendorizados)
CNAME             (delatouch.com)
```

## Pendiente antes de publicar
1. **Formspree**: en `index.html`, busca `YOUR_FORM_ID` dentro del `<form>` de
   contacto y sustitúyelo por tu ID real de Formspree (gratis en formspree.io).
2. **Contenido real**: sustituye las cajas "Próximamente" en la sección
   Trabajo según vayas teniendo piezas.
3. **Avatar DTH**: el círculo con antenas es un placeholder vectorial. Si
   tienes ya una imagen generada en Krea del robot, dime y la metemos como
   imagen real en vez del vector.

## Desplegar en GitHub Pages (gratis)
1. Crea un repositorio en GitHub llamado, por ejemplo, `delatouch-web`
   (público, sin plantilla).
2. Sube estos archivos a la raíz del repo (arrastra y suelta en la web de
   GitHub, o por línea de comandos):
   ```
   git init
   git add .
   git commit -m "primera versión del sitio"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/delatouch-web.git
   git push -u origin main
   ```
3. En el repo → **Settings → Pages** → Source: `main` branch, carpeta `/root`.
4. En **Settings → Pages → Custom domain**, escribe `delatouch.com` (el
   archivo `CNAME` ya lo trae preconfigurado, pero GitHub te lo pedirá
   igualmente para activar el certificado HTTPS).
5. En GoDaddy, en el DNS de delatouch.com, apunta:
   - Un registro `A` a las IPs de GitHub Pages: `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Un registro `CNAME` para `www` apuntando a `TU_USUARIO.github.io`
6. Espera la propagación DNS (minutos a un par de horas) y activa
   "Enforce HTTPS" en Settings → Pages cuando esté disponible.
