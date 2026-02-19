import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const optimizedDir = path.join(__dirname, 'public-optimized');

// Crear directorio de salida si no existe
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir);
}

// Configuración de optimización
const QUALITY = 80; // Calidad WebP (0-100)
const MAX_WIDTH = 1920; // Ancho máximo
const MAX_HEIGHT = 1080; // Alto máximo

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const outputPath = path.join(optimizedDir, fileName);

  try {
    const stats = fs.statSync(filePath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`Optimizando ${fileName} (${sizeMB}MB)...`);

    await sharp(filePath)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
    const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

    console.log(`✓ ${fileName}: ${sizeMB}MB → ${newSizeMB}MB (${reduction}% reducción)`);
  } catch (error) {
    console.error(`✗ Error optimizando ${fileName}:`, error.message);
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(publicDir)
    .filter(file => file.endsWith('.webp'))
    .map(file => path.join(publicDir, file));

  console.log(`\nEncontradas ${files.length} imágenes WebP para optimizar\n`);

  for (const file of files) {
    await optimizeImage(file);
  }

  console.log('\n✓ Optimización completada!');
  console.log('\nPasos siguientes:');
  console.log('1. Revisa las imágenes en public-optimized/');
  console.log('2. Si están bien, reemplaza las originales:');
  console.log('   - Haz backup de public/');
  console.log('   - Copia todo de public-optimized/ a public/');
}

optimizeAllImages();
