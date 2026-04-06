# ReadyPOS - E-commerce de Soluciones Comerciales 🚀

**ReadyPOS** es una Single Page Application (SPA) desarrollada con **React** diseñada para la comercialización de hardware y software para el sector comercial y gastronómico (impresoras fiscales, lectores de códigos, comanderas, etc.).

🔗 **[Ver el proyecto en vivo aquí](https://santiago-guzman-proyecto-final.vercel.app/#/)**

---

## 🛠️ Tecnologías Utilizadas

* **React.js**: Biblioteca principal para la construcción de interfaces de usuario.
* **React Router Dom**: Gestión de navegación dinámica (SPA) sin recarga de página.
* **Firebase / Firestore**: Base de Datos NoSQL para la gestión de productos y órdenes de compra.
* **Context API**: Manejo del estado global para el carrito de compras.
* **Bootstrap**: Estilizado y diseño responsivo para dispositivos móviles y escritorio.
* **Vite**: Herramienta de construcción de última generación para un desarrollo ágil.

## 🌟 Características Principales

- **Catálogo Dinámico**: Listado de productos consumidos en tiempo real desde Firestore.
- **Navegación por Categorías**: Filtrado dinámico de insumos (Hardware, Software, Insumos).
- **Detalle de Producto**: Vista individual con especificaciones técnicas y manejo de stock.
- **Carrito de Compras**: Gestión de ítems con persistencia durante toda la navegación.
- **Checkout con Validación**: Formulario de contacto y generación de órdenes de compra con ID de seguimiento único de Firebase.

## 🔒 Seguridad y Buenas Prácticas

El proyecto implementa **Variables de Entorno** para la protección de las credenciales de Firebase: 
* Las claves se gestionan localmente mediante un archivo `.env`.
* El archivo `.env` se encuentra ignorado en el repositorio mediante `.gitignore` para prevenir filtraciones de seguridad.
* En producción, los secretos se gestionan a través de **GitHub Actions Secrets**.

---

## 👨‍💻 Autor
**Santiago Guzmán** *Soporte Técnico en AyresIT & Desarrollador Frontend en formación.*

---
© 2026 ReadyPOS - Todos los derechos reservados.# Readypos-Ecommerce
