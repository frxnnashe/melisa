# Melisa PDF Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Actualizar el portfolio de Melisa segun el PDF, incorporar los recursos disponibles y mejorar UX, rendimiento, accesibilidad y SEO.

**Architecture:** La SPA React conserva sus secciones y anclas. El contenido se centraliza en datos, la mensajeria en una utilidad testeable y las interacciones complejas en componentes dedicados.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 3, Vitest, Testing Library, Sharp.

**Spec:** `docs/superpowers/specs/2026-10-04-melisa-pdf-refresh-design.md`

## Global Constraints

- El PDF es la fuente de verdad.
- No se crean galerias ni contenido fotografico sin material disponible.
- No se inicia servidor local ni se despliega.
- Las imagenes nuevas se convierten a WebP y se dimensionan para web.
- Se mantiene la identidad oscura, editorial y fotografica existente.

---

### Task 1: Infraestructura de pruebas y contratos de contenido

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/data/siteContent.js`
- Create: `src/utils/whatsapp.js`
- Test: `src/data/siteContent.test.js`
- Test: `src/utils/whatsapp.test.js`

**Interfaces:**
- Produces: `portfolioCategories`, `weddings`, `services`, `getContextualMessage(sectionId)`, `buildWhatsAppUrl(data)`.

- [ ] Agregar Vitest, jsdom y Testing Library.
- [ ] Escribir pruebas fallidas para las bodas visibles, las bodas eliminadas, precios y URL internacional de WhatsApp.
- [ ] Ejecutar las pruebas y confirmar fallos por modulos inexistentes.
- [ ] Implementar los datos y utilidades minimos.
- [ ] Ejecutar las pruebas y confirmar que pasan.

### Task 2: Recursos optimizados

**Files:**
- Modify: `public/hero/hero-1.webp` a `public/hero/hero-5.webp`
- Create: `public/album/*.webp`

**Interfaces:**
- Produces: imagenes WebP con ancho maximo 2200 px para hero y 1800 px para galerias.

- [ ] Seleccionar material disponible segun grupos del album.
- [ ] Convertir con Sharp, autorrotar y eliminar metadatos innecesarios.
- [ ] Verificar dimensiones, formato y peso total.

### Task 3: Portada y navegacion

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Hero.jsx`
- Test: `src/components/Hero.test.jsx`

**Interfaces:**
- Consumes: navegacion y hero desde `siteContent.js`.
- Produces: portada inmediata, menu accesible e Instagram visible.

- [ ] Escribir prueba fallida para H1, copy del PDF, Instagram y estado ARIA del menu.
- [ ] Ejecutar la prueba y confirmar el fallo esperado.
- [ ] Eliminar el bloqueo por precarga global e implementar el hero.
- [ ] Ejecutar la prueba y confirmar que pasa.

### Task 4: Portfolio y lightbox

**Files:**
- Create: `src/components/Lightbox.jsx`
- Modify: `src/components/Portfolio.jsx`
- Test: `src/components/Portfolio.test.jsx`
- Test: `src/components/Lightbox.test.jsx`

**Interfaces:**
- Consumes: categorias, bodas y grupos de imagenes.
- Produces: categoria activa unica y lightbox con anterior, siguiente, cierre y Escape.

- [ ] Escribir pruebas fallidas para categorias, bodas removidas y navegacion de lightbox.
- [ ] Ejecutar y confirmar fallos esperados.
- [ ] Implementar portfolio semantico y lightbox.
- [ ] Ejecutar y confirmar pruebas verdes.

### Task 5: Dron, servicios, Sobre mi y contacto

**Files:**
- Modify: `src/components/DroneSection.jsx`
- Modify: `src/components/Services.jsx`
- Modify: `src/components/About.jsx`
- Modify: `src/components/Contact.jsx`
- Modify: `src/components/Footer.jsx`
- Test: `src/components/ContentSections.test.jsx`

**Interfaces:**
- Consumes: servicios y utilidad de WhatsApp.
- Produces: precios del PDF, formulario accesible y CTA contextual.

- [ ] Escribir prueba fallida para precios, ubicacion, WhatsApp y formulario etiquetado.
- [ ] Ejecutar y confirmar fallos esperados.
- [ ] Implementar las secciones con copy del PDF.
- [ ] Ejecutar y confirmar pruebas verdes.

### Task 6: Testimonios y UX contextual

**Files:**
- Modify: `src/components/SocialProof.jsx`
- Create: `src/components/FloatingWhatsApp.jsx`
- Test: `src/components/SocialProof.test.jsx`

**Interfaces:**
- Produces: carrusel accesible de reseñas, premios y CTA contextual segun seccion.

- [ ] Escribir prueba fallida para controles del carrusel y enlace externo.
- [ ] Ejecutar y confirmar el fallo esperado.
- [ ] Implementar testimonios y boton contextual.
- [ ] Ejecutar y confirmar pruebas verdes.

### Task 7: SEO, estilos y root de Vite

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`
- Modify: `vite.config.js`
- Modify: `tailwind.config.js`

**Interfaces:**
- Produces: metadatos, tokens visuales, foco visible y build estable en rutas C:/D:.

- [ ] Escribir prueba de configuracion cuando exista comportamiento ejecutable.
- [ ] Normalizar el root de Vite con `realpathSync(process.cwd())`.
- [ ] Simplificar estilos y agregar estados de foco y movimiento reducido.
- [ ] Actualizar title, description, canonical y Open Graph.

### Task 8: Verificacion integral

**Files:**
- Review: todos los archivos modificados.

**Interfaces:**
- Produces: evidencia fresca de pruebas, lint, builds y tamaños.

- [ ] Ejecutar `npm test -- --run`.
- [ ] Ejecutar `npm run lint`.
- [ ] Ejecutar `npm run build` desde D:.
- [ ] Ejecutar `npm run build` desde la ruta enlazada C:.
- [ ] Verificar pesos y dimensiones de imagenes.
- [ ] Revisar copy visible, textos alternativos y ausencia de guion largo.
- [ ] Revisar `git diff --check` y `git status --short`.
