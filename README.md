# Task Manager Frontend

Aplicación de gestión de tareas desarrollada con Next.js, TypeScript, PrimeReact y Zustand.

## 🚀 Características

- CRUD completo de tareas
- Filtrado y búsqueda en tiempo real
- Paginación
- Ordenamiento de columnas
- Notificaciones y diálogos de confirmación
- Diseño responsive
- Estado de tareas (completadas/pendientes)

## 🛠️ Tecnologías

- Next.js 14.0.3
- React 18.2.0
- TypeScript
- PrimeReact 10.8.5
- Zustand (manejo de estado)
- TailwindCSS

## 📋 Prerrequisitos

- Node.js 18.x o superior
- npm o yarn

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/JUNIORCEDE/task-manager-frontend.git
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env.local` en la raíz del proyecto:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🗂️ Estructura del Proyecto

```
src/
  ├── app/
  │   ├── layout.tsx
  │   ├── page.tsx
  │   └── globals.css
  ├── components/
  │   ├── taskList.tsx
  │   └── taskDialog.tsx
  ├── providers/
  │   └── confirmProvider.tsx
  ├── store/
  │   └── useTaskStore.ts
  └── types/
      └── task.ts
```

## 🚢 Despliegue

Para construir la aplicación para producción:

```bash
npm run build
```

Para iniciar la versión de producción:

```bash
npm start
```

## 🔍 Variables de Entorno

- `NEXT_PUBLIC_API_URL`: URL base de la API

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm start`: Inicia la aplicación en modo producción
- `npm run lint`: Ejecuta el linter

## 🤝 Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ⚙️ Configuración del Backend

Esta aplicación frontend está diseñada para trabajar con una API REST que debe proporcionar los siguientes endpoints:

```
GET    /api/tasks         - Obtener todas las tareas
POST   /api/tasks         - Crear una nueva tarea
PUT    /api/tasks/:id     - Actualizar una tarea
DELETE /api/tasks/:id     - Eliminar una tarea
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✨ Características Adicionales

- Filtrado global y por columnas
- Toasts para notificaciones
- Diálogos de confirmación
- Diseño responsivo
- Validación de formularios

## 🎨 Personalización

El proyecto utiliza PrimeReact para los componentes UI y TailwindCSS para estilos adicionales. Puedes personalizar el tema modificando:

- El tema de PrimeReact en `layout.tsx`
- Los estilos de Tailwind en `tailwind.config.js`
- Estilos globales en `globals.css`