import { defineConfig } from '@playwright/test';

const ENV = process.env.ENV || 'qa';
const environments: Record<string, string> = {
  qa: 'https://qaxpert.com',
  prod: 'https://qaxpert.com'
};

// ✅ VALIDACIÓN DEL AMBIENTE
if (!environments[ENV]) {
  throw new Error(`❌ Ambiente "${ENV}" no soportado. Usa: ${Object.keys(environments).join(', ')}`);
}
console.log(`🚀 Ejecutando tests en el ambiente: ${ENV} (${environments[ENV]})`);

export default defineConfig({
  // 📂 Carpeta donde están los tests
  testDir: './tests',
  // ⏱️ Timeout por test (30 segundos)
  timeout: 30 * 1000,
  reporter: 'html',
  use: {
    // 🌐 URL base del sitio a probar
    baseURL: environments[ENV],
    
    // 📸 Captura de pantalla en fallos
    screenshot: 'only-on-failure',
    
    // 🎬 Video solo en fallos (ahorra espacio)
    video: 'retain-on-failure',
    
    // 📊 Trace solo en fallo (para debugging)
    trace: 'on-first-retry',
    
  }

  
});
