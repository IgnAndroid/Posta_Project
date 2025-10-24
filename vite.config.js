import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/views/public/index.html'),
        login: resolve(__dirname, 'src/views/auth/login.html'),
        admin: resolve(__dirname, 'src/views/admin/admin-dashboard.html'),
        medico: resolve(__dirname, 'src/views/medico/medico-dashboard.html'),
        paciente: resolve(__dirname, 'src/views/paciente/miscitas.html'),
        campanias: resolve(__dirname, 'src/views/public/campanias.html'),
        contact: resolve(__dirname, 'src/views/public/contact.html'),
        noticias: resolve(__dirname, 'src/views/public/noticias.html'),
        soporte: resolve(__dirname, 'src/views/public/soporte.html')
      }
    }
  },
  server: {
    open: '/views/public/index.html'
  }
});