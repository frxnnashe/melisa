# 📚 Documentación: Optimización de Rendimiento del Portfolio

## 📋 Índice
1. [Problema Inicial](#problema-inicial)
2. [Diagnóstico](#diagnóstico)
3. [Soluciones Implementadas](#soluciones-implementadas)
4. [Resultados Obtenidos](#resultados-obtenidos)
5. [Guía de Replicación](#guía-de-replicación)
6. [Lecciones Aprendidas](#lecciones-aprendidas)

---

## 🔴 Problema Inicial

### Síntomas Reportados
- **Pantallas negras** durante el scroll en el portfolio
- **Múltiples requests duplicados** de las mismas imágenes
- **Tiempos de carga extremadamente lentos** (varios segundos por imagen)
- **Imágenes desaparecían** al cambiar entre categorías (Bodas, Retratos, Eventos)

### Impacto en UX
- Experiencia de usuario deficiente
- Frustración al navegar el portfolio
- Posible pérdida de clientes potenciales
- Alto consumo de datos móviles

---

## 🔍 Diagnóstico

### Problema 1: Imágenes Excesivamente Pesadas
**Causa Raíz:** Las imágenes WebP no estaban optimizadas

**Evidencia:**
```
invierno-2.webp     32,469 KB (32 MB)
invierno-3.webp     29,957 KB (30 MB)
fiesta-3.webp       29,750 KB (29 MB)
boda-natalia-3.webp 26,077 KB (26 MB)
```

**Análisis:**
- Portfolio completo: ~2GB de imágenes
- Tiempo de carga por imagen: 5-15 segundos
- Más de 100 imágenes en total
- Formato WebP sin compresión adecuada

### Problema 2: Desmontaje del DOM
**Causa Raíz:** Renderizado condicional destruía componentes

**Código Problemático:**
```javascript
{selectedCategory === "bodas" && <div>...</div>}
{selectedCategory === "retratos" && <div>...</div>}
```

**Consecuencias:**
- Al cambiar categorías, el DOM se destruía completamente
- Las imágenes ya cargadas se descartaban de memoria
- Nuevas requests al volver a la categoría anterior
- Re-renderizado innecesario

### Problema 3: Lazy Loading Ineficiente
**Causa Raíz:** IntersectionObserver con rootMargin muy pequeño

**Código Original:**
```javascript
rootMargin: "100px"
```

**Problema:**
- Las imágenes empezaban a cargar muy tarde
- Con imágenes de 30MB, no daba tiempo a cargar antes de ser visibles
- Resultado: pantallas negras durante scroll

### Problema 4: Precarga Bloqueante
**Causa Raíz:** App.jsx intentaba precargar todas las imágenes antes de renderizar

**Código Problemático:**
```javascript
preloadImagesStrategic((progress) => {
  if (progress.stage === 'critical' && !isReady) {
    setIsReady(true);
  }
});
```

**Consecuencias:**
- Pantalla de carga inicial muy larga
- Intentaba cargar 2GB antes de mostrar contenido
- Bloqueaba la UI completamente

---

## ✅ Soluciones Implementadas

### Solución 1: Optimización de Imágenes

**Script Creado:** `optimize-images.js`

```javascript
import sharp from 'sharp';

const QUALITY = 80;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

await sharp(filePath)
  .resize(MAX_WIDTH, MAX_HEIGHT, {
    fit: 'inside',
    withoutEnlargement: true
  })
  .webp({ quality: QUALITY })
  .toFile(outputPath);
```

**Parámetros de Optimización:**
- **Formato:** WebP
- **Calidad:** 80%
- **Dimensiones máximas:** 1920x1080px
- **Estrategia:** Mantener aspect ratio, no agrandar

**Proceso:**
1. Instalar Sharp: `npm install --save-dev sharp`
2. Ejecutar: `node optimize-images.js`
3. Revisar resultados en `public-optimized/`
4. Backup y reemplazo de originales

**Resultados:**
- Reducción promedio: **97-99%**
- De 32MB a 0.4MB por imagen
- Portfolio total: De ~2GB a ~100MB

### Solución 2: DOM Persistente

**Antes:**
```javascript
{selectedCategory === "bodas" && (
  <div className="space-y-32">
    {/* Contenido de bodas */}
  </div>
)}
```

**Después:**
```javascript
<div className={`space-y-32 ${selectedCategory !== "bodas" ? "hidden" : ""}`}>
  {/* Contenido de bodas */}
</div>
```

**Beneficios:**
- Todas las categorías siempre en el DOM
- Solo se ocultan con CSS (`hidden`)
- Imágenes cargadas permanecen en memoria del navegador
- Cambio instantáneo entre categorías
- Cero re-requests de imágenes

### Solución 3: Componente LazyImage Optimizado

**Implementación Final:**
```javascript
const LazyImage = ({ src, alt, className, onClick, eager = false }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  return (
    <div ref={imgRef} className="relative w-full h-full bg-gray-900">
      <img
        src={src}
        alt={alt}
        className={`${className} ${
          loaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        onClick={onClick}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      {/* Skeleton loader */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      )}
    </div>
  );
};
```

**Características:**
- **Lazy loading nativo:** Usa `loading="lazy"` del navegador
- **Skeleton loader:** Gradiente animado mientras carga
- **Transición suave:** Fade-in de 300ms
- **Prop eager:** Para primeras imágenes críticas
- **Decoding async:** No bloquea el thread principal

### Solución 4: Precarga Inteligente por Categoría

**Implementación:**
```javascript
useEffect(() => {
  if (!isVisible) return;

  let imagesToPreload = [];
  
  if (selectedCategory === 'bodas') {
    imagesToPreload = [
      ...weddingsCouples.flatMap(w => w.images),
      ...partyImages,
      ...momentsImages,
      ...postWeddingImages,
    ];
  } else if (selectedCategory === 'retratos') {
    imagesToPreload = [
      ...portraitsPart1.flatMap(p => p.images),
      ...portraitsPart2.flatMap(p => p.images),
    ];
  } else if (selectedCategory === 'eventos') {
    imagesToPreload = eventsData.map(e => e.src);
  }

  if (imagesToPreload.length > 0) {
    setTimeout(() => {
      preloadImages(imagesToPreload);
    }, 100);
  }
}, [selectedCategory, isVisible]);
```

**Estrategia:**
- Solo precarga la categoría activa
- Espera 100ms para no bloquear UI
- Se activa cuando el portfolio es visible
- Cambia dinámicamente al cambiar categoría

### Solución 5: Eliminación de Precarga Bloqueante

**En App.jsx:**

**Antes:**
```javascript
const [isReady, setIsReady] = useState(false);

if (!isReady) {
  return <LoadingScreen />;
}
```

**Después:**
```javascript
// Renderizado inmediato, sin esperar precarga
return (
  <ThemeProvider>
    <div className="min-h-screen bg-gray-900">
      <Hero />
      <Portfolio />
      {/* ... */}
    </div>
  </ThemeProvider>
);
```

**Beneficio:**
- App carga instantáneamente
- Imágenes se cargan progresivamente
- No hay pantalla de carga bloqueante

---

## 📊 Resultados Obtenidos

### Métricas de Rendimiento

**Peso de Imágenes:**
- **Antes:** 2GB total, 16-32MB por imagen
- **Después:** ~100MB total, 0.1-0.5MB por imagen
- **Mejora:** 95% reducción de peso total

**Tiempo de Carga:**
- **Antes:** 5-15 segundos por imagen
- **Después:** 0.3-1 segundo por imagen
- **Mejora:** 10-20x más rápido

**Experiencia de Usuario:**
- ✅ Cero pantallas negras durante scroll
- ✅ Transiciones suaves con skeleton loader
- ✅ Cambio instantáneo entre categorías
- ✅ Sin requests duplicados
- ✅ Carga inicial instantánea

**Consumo de Datos:**
- **Antes:** ~2GB para ver todo el portfolio
- **Después:** ~100MB para ver todo el portfolio
- **Mejora:** 95% menos consumo de datos

### Ejemplos Específicos de Optimización

| Imagen | Antes | Después | Reducción |
|--------|-------|---------|-----------|
| fiesta-3.webp | 29.05 MB | 0.40 MB | 98.6% |
| invierno-2.webp | 31.71 MB | 0.44 MB | 98.6% |
| instante-8.webp | 12.53 MB | 0.10 MB | 99.2% |
| otoño-7.webp | 22.04 MB | 0.22 MB | 99.0% |
| verano-6.webp | 20.59 MB | 0.34 MB | 98.4% |

---

## 🔧 Guía de Replicación

### Para Proyectos Similares

#### Paso 1: Diagnosticar Imágenes Pesadas

**PowerShell:**
```powershell
Get-ChildItem -Path "public" -Filter "*.webp" | 
  Select-Object Name, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}} | 
  Sort-Object "Size(MB)" -Descending
```

**Bash/Linux:**
```bash
find public -name "*.webp" -exec ls -lh {} \; | sort -k5 -hr
```

#### Paso 2: Crear Script de Optimización

**Archivo:** `optimize-images.js`

```javascript
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const optimizedDir = path.join(__dirname, 'public-optimized');

if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir);
}

const QUALITY = 80;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const outputPath = path.join(optimizedDir, fileName);

  await sharp(filePath)
    .resize(MAX_WIDTH, MAX_HEIGHT, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: QUALITY })
    .toFile(outputPath);
}

async function optimizeAllImages() {
  const files = fs.readdirSync(publicDir)
    .filter(file => file.endsWith('.webp'))
    .map(file => path.join(publicDir, file));

  for (const file of files) {
    await optimizeImage(file);
  }
}

optimizeAllImages();
```

#### Paso 3: Ejecutar Optimización

```bash
# Instalar dependencia
npm install --save-dev sharp

# Ejecutar script
node optimize-images.js

# Backup de originales
mkdir public-backup
xcopy public\*.webp public-backup\ /Y

# Reemplazar con optimizadas
xcopy public-optimized\*.webp public\ /Y
```

#### Paso 4: Implementar DOM Persistente

**Patrón a seguir:**

```javascript
// ❌ MAL - Desmonta el DOM
{condition && <Component />}

// ✅ BIEN - Mantiene en DOM, oculta con CSS
<div className={condition ? "" : "hidden"}>
  <Component />
</div>
```

#### Paso 5: Crear Componente LazyImage

```javascript
const LazyImage = ({ src, alt, className, onClick, eager = false }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-gray-900">
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        onClick={onClick}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      )}
    </div>
  );
};
```

#### Paso 6: Implementar Precarga Inteligente

```javascript
useEffect(() => {
  if (!isVisible) return;

  const imagesToPreload = getCurrentCategoryImages();
  
  if (imagesToPreload.length > 0) {
    setTimeout(() => {
      preloadImages(imagesToPreload);
    }, 100);
  }
}, [selectedCategory, isVisible]);
```

---

## 💡 Lecciones Aprendidas

### 1. El Peso de las Imágenes es Crítico
**Lección:** Nunca asumas que las imágenes están optimizadas.

**Acción:**
- Siempre verificar el peso de las imágenes antes de deployment
- Usar herramientas de optimización automática
- Establecer límites máximos (ej: 500KB por imagen)

### 2. El Renderizado Condicional Tiene Costos
**Lección:** `{condition && <Component />}` desmonta completamente el componente.

**Acción:**
- Usar `className={condition ? "" : "hidden"}` para ocultar
- Mantener componentes pesados en el DOM
- Solo desmontar si realmente es necesario (ej: modales)

### 3. El Lazy Loading Nativo es Poderoso
**Lección:** No siempre necesitas librerías complejas.

**Acción:**
- Usar `loading="lazy"` del navegador
- Combinar con IntersectionObserver solo si es necesario
- Aprovechar `decoding="async"`

### 4. La Precarga Debe Ser Estratégica
**Lección:** Precargar TODO es tan malo como no precargar nada.

**Acción:**
- Precargar solo lo visible o próximo a ser visible
- Usar setTimeout para no bloquear UI
- Dividir en categorías o secciones

### 5. Los Skeleton Loaders Mejoran la Percepción
**Lección:** Una pantalla negra se siente más lenta que un skeleton loader.

**Acción:**
- Siempre mostrar algo mientras carga
- Usar gradientes o animaciones sutiles
- Transiciones suaves (opacity)

### 6. Medir es Fundamental
**Lección:** No puedes optimizar lo que no mides.

**Herramientas:**
- Chrome DevTools (Network tab)
- Lighthouse
- WebPageTest
- Scripts personalizados para analizar imágenes

---

## 🎯 Checklist para Futuros Proyectos

### Antes de Lanzar un Portfolio/Galería

- [ ] Verificar peso de todas las imágenes
- [ ] Optimizar imágenes (WebP, calidad 80%, max 1920x1080)
- [ ] Implementar lazy loading
- [ ] Agregar skeleton loaders
- [ ] Usar DOM persistente para navegación
- [ ] Precarga inteligente (no todo a la vez)
- [ ] Probar en conexión lenta (throttling)
- [ ] Verificar que no hay requests duplicados
- [ ] Medir con Lighthouse (score > 90)
- [ ] Probar en móvil con datos limitados

### Durante el Desarrollo

- [ ] Establecer límite de peso por imagen (ej: 500KB)
- [ ] Automatizar optimización en build process
- [ ] Usar formatos modernos (WebP, AVIF)
- [ ] Implementar responsive images (srcset)
- [ ] Considerar CDN para imágenes
- [ ] Monitorear bundle size

---

## 📚 Referencias y Recursos

### Herramientas Utilizadas
- **Sharp:** https://sharp.pixelplumbing.com/
- **Squoosh:** https://squoosh.app/
- **TinyPNG:** https://tinypng.com/

### Documentación
- **MDN - Lazy Loading:** https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading
- **Web.dev - Optimize Images:** https://web.dev/fast/#optimize-your-images
- **React Performance:** https://react.dev/learn/render-and-commit

### Conceptos Clave
- IntersectionObserver API
- Lazy Loading nativo
- WebP optimization
- DOM persistence
- Skeleton loaders
- Progressive image loading

---

## 🔄 Mantenimiento Futuro

### Al Agregar Nuevas Imágenes

1. **Optimizar antes de agregar:**
```bash
node optimize-images.js
```

2. **Verificar peso:**
```bash
Get-ChildItem -Path "public" -Filter "*.webp" | Where-Object {$_.Length -gt 500KB}
```

3. **Probar carga:**
- Abrir DevTools > Network
- Throttling: Fast 3G
- Verificar tiempos de carga

### Monitoreo Continuo

- Revisar Lighthouse score mensualmente
- Verificar que no se agreguen imágenes sin optimizar
- Actualizar script de optimización si es necesario
- Considerar migrar a AVIF cuando tenga mejor soporte

---

## ✅ Conclusión

**Problema resuelto:** Portfolio con carga lenta y pantallas negras

**Solución aplicada:**
1. Optimización masiva de imágenes (97-99% reducción)
2. DOM persistente (sin desmontaje)
3. LazyImage con skeleton loader
4. Precarga inteligente por categoría
5. Eliminación de precarga bloqueante

**Resultado final:**
- ⚡ Carga 10-20x más rápida
- ✨ Experiencia de usuario fluida
- 📱 95% menos consumo de datos
- 🎨 Transiciones profesionales

**Tiempo de implementación:** ~2 horas
**Impacto:** Crítico para UX y conversión

---

**Fecha de documentación:** Febrero 2026  
**Proyecto:** Portfolio Melisa  
**Tecnologías:** React, Vite, Sharp, WebP
