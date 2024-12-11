# Napptilus Zara Challenge

Reto frontEnd para empresa Napptilus.

## Instrucciones para ejecutar la aplicación

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/Mamutito/napptilus-frontend.git
   cd napptilus-frontend
   ```

2. Instalar las dependencias:

   ```sh
   npm install
   ```

3. Ejecutar la aplicación en modo desarrollo:

   ```sh
   npm run dev
   ```

4. Abrir el navegador y navegar a [http://localhost:5173](http://localhost:5173) para ver la aplicación en funcionamiento.

5. Ejecutar para generar el build de produccion:

   ```sh
   npm run build
   ```

## Arquitectura y estructura del proyecto

La aplicación está estructurada de la siguiente manera:

```
src/
  App.css
  App.tsx
  components/
  context/
  hooks/
  index.css
  main.tsx
  pages/
  routes/
  types/

```

## Descripción de carpetas y archivos principales

- **`src/`**: Contiene todo el código fuente de la aplicación.
- **`components/`**: Componentes reutilizables de la interfaz de usuario.
  - `__tests__/`: Pruebas unitarias para los componentes.
- **`context/`**: Proveedores de contexto para manejar el estado global de la aplicación.
- **`hooks/`**: Custom hooks para reutilizar lógica de estado.
- **`pages/`**: Páginas principales de la aplicación.
- **`routes/`**: Configuración de las rutas de la aplicación.
- **`types/`**: Definiciones de tipos TypeScript.

## Información relevante

- **Estado global**: El estado global de la aplicación se maneja utilizando el contexto de React en `StoreContext.tsx`.
- **Estilos**: La aplicación utiliza Tailwind CSS para los estilos.
- **Rutas**: La navegación se maneja utilizando `react-router-dom` en `AppRoute.tsx`.
- **Pruebas**: Las pruebas unitarias se configuran y ejecutan utilizando Vitest. Las pruebas se encuentran en la carpeta **tests** dentro de cada componente.
