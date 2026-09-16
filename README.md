# Delatouch — delatouch.com

Sitio estático. HTML/CSS/JS vanilla + GSAP, ScrollTrigger y Lenis vendorizados
en `/js` (sin CDN externo: no puede romperse si cae un CDN).
Tipografía: Helvetica / Helvetica Neue del sistema. Sin fuentes descargadas.

## Estructura (mantenerla al subir a GitHub)
```
index.html
404.html
styles.css
script.js
robots.txt
sitemap.xml
CNAME             (delatouch.com)
img/              (logo, retrato, banner, piezas, firma, about-bg)
js/               (gsap, ScrollTrigger, lenis)
```

## Lo único pendiente de tu parte

### 1. Formspree — HECHO
Cuenta creada con mail@delatouch.com, formulario `delatouch.com`,
ID `xoevazvz` ya puesto en `script.js` (línea 11). Plan gratuito: 50 envíos/mes.

Aviso para abril 2027: el buzón mail@delatouch.com (Microsoft 365 vía GoDaddy)
expira entonces. Antes de esa fecha hay que añadir delatouch@gmail.com en
Formspree → Account → Linked Emails, o se pierde el acceso a la cuenta.

### 2. Contenido real (cuando lo tengas)
- **Process**: bocetos reales en las 3 cajas de `#proceso`.
- **Customization**: fotos de personalización en `#personalizacion`.
- **Sketches**: hojas mensuales en `#sketches`.
- **Brands**: la sección existe en el HTML con el atributo `hidden`.
  Quita ese `hidden` sólo cuando haya casos de estudio reales detrás.
- **about-bg.jpg** está a 385x277 px: si aparece una versión mayor, sustituirla.

## Subir cambios a GitHub
Arrastrar respetando carpetas: `img/` e `js/` como carpetas, no sueltos en la raíz.
Si ya hay archivos sueltos duplicados en la raíz del repo, borrarlos desde la web
de GitHub (⋯ → Delete file): duplican peso y confunden.

Tras subir, si algo "no se ve": **Ctrl+Shift+R** antes de dar nada por roto.
La caché del navegador y la del CDN de GitHub Pages tardan unos minutos.
