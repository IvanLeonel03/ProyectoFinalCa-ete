# 📦 Proyecto Final React JS

Este proyecto es una aplicación de e-commerce desarrollada con **React JS** como parte del proyecto final del curso. Simula un proceso de compra de productos, permitiendo agregar artículos al carrito, completar un formulario de compra y registrar la venta en una base de datos utilizando Firebase.

---

## 🛠️ Tecnologías utilizadas

- ⚛️ React JS
- 🔥 Firebase
- 📦 React Router DOM
- 🔁 React Firebase Hooks
- 🔔 React Toastify
- 🎨 FontAwesome Icons

---

## 🚀 Funcionalidades

### 🛍️ Usuario

- Navegar entre categorías de productos.
- Agregar productos al carrito.
- Ver detalle de cada producto.
- Simular una compra:
  - Completar un formulario con los datos del comprador.
  - Enviar la información a Firebase (colección `venta`).
  - Vaciar el carrito al finalizar la compra.
  - Mostrar notificaciones con `react-toastify`.

### 🔧 Admin (ruta `/admin`)

- Agregar nuevos productos.
- Editar productos existentes.
- Eliminar productos.
- Obtener productos desde Firebase (colección `productos`).

---

## 📂 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

Debes crear un archivo `firebaseConfig.js` con tus credenciales de Firebase:

```js
// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export default app;
```

### 4. Ejecutar la app

```bash
npm run dev
```

---

## 📁 Dependencias principales (`package.json`)

```json
"dependencies": {
  "@fortawesome/fontawesome-free": "^7.0.0",
  "firebase": "^12.0.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-firebase-hooks": "^5.1.1",
  "react-router-dom": "^7.6.3",
  "react-toastify": "^11.0.5"
}
```

---

## 📌 Estado

🧪 Proyecto desarrollado con fines educativos como entrega final del curso de React JS.  
🔒 No cuenta con autenticación ni funcionalidades avanzadas de seguridad.
