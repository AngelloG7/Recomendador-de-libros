# Recomendador-de-libros
Sistema de Recomendación de Libros con IA - Descubre tu próxima lectura favorita utilizando algoritmos de inteligencia artificial y la API de Google Books

---

## Características Principales

- Búsqueda de Libros: Encuentra libros por título, autor o tema usando la API de Google Books.
- Sistema de Favoritos: Marca libros como favoritos para personalizar tus recomendaciones.
- Recomendaciones con IA: Obtén sugerencias personalizadas gracias a Google Gemini, eligiendo entre algoritmos híbrido, colaborativo o basado en contenido.
- Configuración Personalizada: Selecciona tus géneros y autores preferidos para afinar las recomendaciones.
- Métricas del Sistema: Visualiza precisión, recall, F1-score y tiempo de respuesta simulados tras cada recomendación IA.
- Interfaz Moderna: Diseño responsivo, efectos visuales atractivos y experiencia de usuario optimizada.
- Persistencia Local: Guarda tu configuración y favoritos en el navegador (localStorage).

---

## Tecnologías Utilizadas

- React 18 – Framework frontend
- Tailwind CSS – Framework de estilos
- Google Books API – Búsqueda de libros
- Google Gemini API – Inteligencia artificial para recomendaciones
- LocalStorage – Persistencia de configuración y favoritos

---

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Clave API de Google Gemini (opcional, solo para recomendaciones IA)

---

## Instalación y Primeros Pasos

1. Clona el repositorio
   ```bash
   git clone https://github.com/tu-usuario/mi-recomendador-de-libros.git
   cd mi-recomendador-de-libros
   ```

2. Instala las dependencias
   ```bash
   npm install
   ```

3. Configuración de la API de Gemini (Opcional)
   - Obtén una clave API de Google AI Studio
   - Abre el archivo `src/App.js`
   - Busca la línea `const apiKey = "";`
   - Reemplaza las comillas vacías con tu clave API:
     ```javascript
     const apiKey = "tu-clave-api-aqui";
     ```

4. Inicia el servidor de desarrollo
   ```bash
   npm start
   ```

5. Abre tu navegador
   - Ve a `http://localhost:3000`

---

## Cómo Usar

### 1. Configuración Inicial
- Selecciona tu algoritmo de recomendación preferido
- Elige tus géneros literarios favoritos
- Añade autores preferidos (opcional)
- Guarda la configuración

### 2. Búsqueda de Libros
- Usa la barra de búsqueda para encontrar libros
- Explora los resultados con portadas y detalles
- Haz clic en "Ver Detalles" para más información

### 3. Gestión de Favoritos
- Marca libros como "Me Gusta" para añadirlos a favoritos
- Visualiza tu colección en la barra lateral
- Elimina libros de favoritos cuando desees

### 4. Obtener Recomendaciones
- Añade al menos un libro a favoritos
- Haz clic en "Obtener Recomendaciones IA"
- Explora las sugerencias personalizadas

---

## Configuración de APIs

### Google Books API
La aplicación utiliza la API pública de Google Books que no requiere autenticación para búsquedas básicas.

### Google Gemini API
Para usar las recomendaciones IA:

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva clave API
3. Copia la clave en el archivo `src/App.js`

**Nota**: Sin la API de Gemini, el sistema seguirá funcionando pero no podrás obtener recomendaciones IA.

---

## Algoritmos de Recomendación

### Sistema Híbrido (Recomendado)
Utiliza Google Gemini para combinar análisis de contenido y patrones de usuario, ofreciendo las recomendaciones más precisas.

### Filtrado por Contenido
Recomienda libros basándose en las características de los libros que te gustan (géneros, autores, temas).

### Filtrado Colaborativo
Simula recomendaciones basadas en usuarios con gustos similares a los tuyos.

---

## Personalización

### Estilos
El proyecto utiliza Tailwind CSS. Puedes personalizar:
- Colores del tema en las clases de Tailwind
- Efectos de glassmorphism en los componentes
- Animaciones y transiciones

### Funcionalidades
- Añadir nuevos géneros literarios
- Modificar métricas del sistema
- Integrar APIs adicionales

---

## Solución de Problemas

### Error: "Module not found"
```bash
npm install
```

### Las recomendaciones no funcionan
- Verifica que tengas una clave API de Gemini válida
- Asegúrate de tener al menos un libro en favoritos
- Revisa la consola del navegador para errores

### Problemas de CORS
- Ejecuta el proyecto con `npm start`
- No abras el archivo HTML directamente en el navegador

---

## Compatibilidad

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móviles

---

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## Créditos

- **Google Books API** - Búsqueda de libros
- **Google Gemini** - Inteligencia artificial
- **Tailwind CSS** - Framework de estilos
- **React** - Framework frontend

---

## Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue en el repositorio.

---

**¡Disfruta descubriendo tu próxima lectura favorita! 📚✨**
