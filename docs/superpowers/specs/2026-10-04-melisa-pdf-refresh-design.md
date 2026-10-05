# Actualizacion web Melisa desde PDF

## Objetivo

Aplicar como fuente de verdad el documento `CAMBIOS WEB MELI.pdf`, aprovechar solo las imagenes disponibles en el album compartido y corregir los problemas tecnicos detectados sin cambiar la identidad de Melisa Santa Cruz.

## Alcance

- Conservar el sitio como SPA React y mantener los anclajes principales.
- Actualizar portada, copy, navegacion e Instagram.
- Reordenar el portfolio en Historias de Bodas, Sesiones y Retratos, Cobertura de Eventos, Arquitectura y Producto, y Video y Dron.
- Mostrar solo bodas con material disponible. Mantener Sol y Darko, Marcelo y Michelli, Barby y Luis, y Emma y Dante. Quitar Taty y Eloy, Maxi y Cami, y Natalia y Pablo.
- No crear galerias vacias para Poli y Jona, Belen y Juan, Estefi y Javo, o Estefi y Nata mientras no haya fotos identificadas.
- Incorporar imagenes disponibles de fiesta, postboda, opiniones y premios.
- Actualizar sesiones, locaciones, eventos, tarifas, servicios, Sobre mi y contacto con el texto del PDF.
- Implementar lightbox navegable, testimonios dinamicos, enlace a Google, WhatsApp contextual y video optimizado.
- Mejorar semantica, teclado, foco, textos alternativos, dimensiones de imagenes y carga diferida.
- Corregir el root de Vite para la ruta enlazada C:/D:, enlaces muertos, numero de WhatsApp y MIME de video.
- Dejar fuera por falta de contenido confirmado el blog de bodas, el blog de arte y las galerias de nuevas bodas.

## Direccion visual

Rediseño de preservacion. Se mantiene la paleta oscura y la fotografia como protagonista. La composicion sera editorial y limpia, con una sola familia de radios, contraste reforzado y movimiento moderado que respeta `prefers-reduced-motion`.

- DESIGN_VARIANCE: 7
- MOTION_INTENSITY: 4
- VISUAL_DENSITY: 3

## Arquitectura

- `src/data/siteContent.js` centraliza copy, categorias, bodas, servicios y rutas de imagenes.
- `src/utils/whatsapp.js` genera enlaces contextuales y mensajes del formulario.
- `src/components/Lightbox.jsx` concentra dialogo, navegacion, Escape y restauracion de foco.
- Los componentes de seccion consumen datos y renderizan solo la categoria activa.
- Los JPEG seleccionados del album se convierten a WebP con dimensiones acotadas antes de entrar en `public`.

## Rendimiento

- Solo la primera imagen del hero sera prioritaria.
- Las demas imagenes usaran `loading="lazy"`, `decoding="async"`, ancho, alto y `sizes`.
- No se precargaran galerias completas.
- Los videos usaran `preload="metadata"`, poster y tipos MIME correctos.
- Los archivos nuevos se limitaran a los necesarios para la pagina.

## Accesibilidad y SEO

- Un H1 unico y jerarquia H2/H3 natural con palabras clave del PDF.
- Navegacion y menu movil con estados ARIA y cierre por Escape.
- Lightbox con `role="dialog"`, foco y controles etiquetados.
- Formulario con `form`, `label`, tipos, autocompletado y validacion nativa.
- Alt descriptivo por foto y metadatos principales en `index.html`.

## Verificacion

- Pruebas unitarias y de componentes para contenido, WhatsApp, categorias y lightbox.
- ESLint sin errores.
- Build de produccion desde la ruta real `D:\Marib\appweb\melisa` y desde la ruta enlazada `C:\Users\marib\OneDrive\Escritorio\appweb\melisa`.
- Auditoria de tamaños de imagenes y ausencia de em dash visible.

