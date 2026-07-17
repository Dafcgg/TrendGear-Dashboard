# TrendGear Dashboard

## Prompt utilizado para el desarrollo del proyecto con Inteligencia Artificial

Actúa como un desarrollador Front-End senior con experiencia en JavaScript vanilla y en integración con Firebase Realtime Database.

Necesito que me ayudes a construir un proyecto web llamado "TrendGear Dashboard", siguiendo la guía metodológica que te voy a adjuntar en PDF. Antes de escribir código, léela completa y asegúrate de entender bien qué se pide, para no dejar nada por fuera ni inventar cosas que no estén en el documento.

Requisitos generales


Solo HTML5, CSS3 y JavaScript puro (Vanilla). Nada de Bootstrap, Tailwind, React, Vue, Angular ni jQuery.
El código debe quedar organizado en archivos separados (HTML, CSS y JS), no todo mezclado.
Evita duplicar lógica; separa responsabilidades entre archivos.


Interfaz

Quiero un Dashboard con:


Header con logo/nombre del proyecto.
Navegación responsive con menú hamburguesa para móvil.
Sección principal con tarjetas (cards) que muestren métricas resumen.
Tabla dinámica con el listado de clientes.
Footer.


Sobre el estilo visual: en vez del esquema plano que menciona la guía, quiero que la interfaz tenga un estilo glassmorphism — paneles semitransparentes con efecto de desenfoque (backdrop-filter: blur), bordes sutiles translúcidos, fondo con degradado de color y tarjetas que reaccionen un poco al pasar el cursor (hover). Que se vea moderno y no un dashboard plano.

Dataset

Genera un dataset sintético de clientes con estos campos exactos:


Customer ID
Name
Email
Product Purchased
Purchase Date
Amount Spent ($)
Age
City
Payment Method
Last Login Date
Membership Status


Los datos deben ser coherentes: IDs únicos, correos con dominios de prueba, fechas en formato ISO (YYYY-MM-DD), edades razonables y montos positivos.

Firebase

Conecta la aplicación a Firebase Realtime Database usando Fetch API, con async/await y manejo de errores con try/catch. Si la conexión falla, debe mostrarse un mensaje claro al usuario en vez de romper la página.

Los datos deben renderizarse dinámicamente en el DOM (tarjetas y tabla), no pueden estar escritos a mano en el HTML.

Buenas prácticas


Nombres descriptivos para variables y funciones.
Funciones pequeñas y reutilizables, evitando duplicación.
Comentarios solo donde realmente aporten claridad, no en cada línea.
Código organizado pensando en que se pueda mantener y ampliar después.


## Antes de terminar

Revisa que todos los requisitos del documento PDF quedaron cubiertos y dime en qué archivo implementaste cada uno, para poder verificarlo yo mismo antes de dar el proyecto por terminado.

---

## Descripción del Proyecto

**TrendGear Dashboard** es una aplicación web de tres páginas desarrollada con HTML5, CSS3 y JavaScript vanilla, cuyo objetivo es visualizar datos sintéticos de clientes de una tienda tecnológica ficticia llamada **TrendGear**. La aplicación consume el dataset desde un archivo CSV local y, en caso de que este no esté disponible, recurre automáticamente a **Firebase Realtime Database** como fuente de respaldo.

El proyecto ofrece un panel de resumen (Dashboard), un directorio de clientes con búsqueda y filtros, y una sección de reportes agregados, todo bajo una interfaz bilingüe (Español/Inglés) con un diseño moderno tipo *glassmorphism*.

## Objetivos

**Objetivo general:**

Desarrollar un dashboard web funcional que permita visualizar, consultar y analizar datos sintéticos de clientes de forma dinámica, aplicando buenas prácticas de desarrollo frontend.

**Objetivos específicos:**

- Implementar la carga y el renderizado dinámico de datos de clientes mediante JavaScript, sin frameworks.
- Integrar una estrategia de obtención de datos con doble fuente (CSV local y Firebase Realtime Database) para garantizar disponibilidad de la información.
- Diseñar una interfaz responsive, accesible y bilingüe (Español/Inglés) mediante un sistema de internacionalización propio.
- Aplicar buenas prácticas de organización de código, separando responsabilidades en módulos independientes (carga de datos, traducciones y lógica de cada página).
- Ofrecer herramientas de búsqueda, filtrado y análisis agregado sobre el dataset de clientes.

## Características

- **Doble fuente de datos:** el sistema intenta cargar primero el dataset desde un archivo CSV local (`data/trendgear_dataset.csv`) y, si falla la carga o el archivo está vacío/corrupto, recurre automáticamente a Firebase Realtime Database.
- **Parser de CSV propio:** procesamiento manual del archivo CSV, con soporte para valores entre comillas, comas internas y saltos de línea.
- **Renderizado dinámico con JavaScript:** las tarjetas resumen y las filas de las tablas se generan en tiempo de ejecución a partir de los datos obtenidos, sin contenido estático en el HTML.
- **Tres páginas funcionales:**
  - `index.html` — Dashboard con tarjetas resumen (total de clientes, ingresos totales, gasto promedio, miembros VIP) y tabla completa de clientes.
  - `clientes.html` — Directorio de clientes con búsqueda en tiempo real por nombre, correo o ciudad, y filtro por tipo de membresía (Basic, Pro, VIP).
  - `reportes.html` — Reportes agregados en forma de barras: ingresos por ciudad, clientes por membresía, métodos de pago y productos más vendidos.
- **Internacionalización (i18n):** selector de idioma Español/Inglés que traduce dinámicamente todos los textos de la interfaz (menú, títulos, encabezados de tabla, mensajes de estado). La preferencia se guarda en `localStorage` y se mantiene entre páginas.
- **Diseño responsive:** adaptación de la interfaz a distintos tamaños de pantalla mediante media queries.
- **Menú hamburguesa:** navegación colapsable para dispositivos móviles, con atributos ARIA para accesibilidad.
- **Manejo de errores:** mensajes de estado (`cargando`, `error de conexión`, `sin registros`) mostrados al usuario mediante una región `aria-live`.
- **Interfaz moderna tipo glassmorphism:** paneles translúcidos con efecto de desenfoque (`backdrop-filter`), degradados de color y tarjetas con animaciones sutiles al pasar el cursor.
- **Datos sintéticos:** el dataset contiene información ficticia de clientes (ID, nombre, correo, producto comprado, fecha de compra, monto gastado, edad, ciudad, método de pago, último ingreso y estado de membresía), utilizada exclusivamente con fines académicos.

## Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica de las tres páginas del sitio |
| CSS3 | Diseño visual, tema glassmorphism y responsive design |
| JavaScript (Vanilla) | Lógica de la aplicación, manipulación del DOM, `async/await` |
| Fetch API | Consumo del archivo CSV local y de Firebase Realtime Database |
| Firebase Realtime Database | Fuente de datos de respaldo en caso de fallo del CSV local |
| Google Fonts | Tipografías "Poppins" e "Inter" |
| Git | Control de versiones |
| GitHub | Repositorio del proyecto |

## Estructura del Proyecto

```
TrendGear-Dashboard/
│
├── index.html              # Página del Dashboard (tarjetas + tabla completa)
├── clientes.html            # Página de directorio de clientes (búsqueda y filtros)
├── reportes.html             # Página de reportes agregados
│
├── css/
│   └── style.css            # Estilos generales (tema glassmorphism, responsive)
│
├── js/
│   ├── data-loader.js        # Carga de datos: CSV local primero, Firebase de respaldo
│   ├── i18n.js               # Diccionario de traducciones ES/EN, menú hamburguesa, navegación activa
│   ├── script.js              # Lógica del Dashboard (tarjetas resumen y tabla)
│   ├── clientes.js            # Lógica de búsqueda y filtrado del directorio de clientes
│   └── reportes.js            # Lógica de agregación y renderizado de reportes
│
├── img/
│   └── logo.svg               # Logo de TrendGear
│
├── data/
│   └── trendgear_dataset.csv   # Dataset sintético de clientes (fuente primaria)
│
└── README.md
```

## Instalación

1. Clona o descarga este repositorio en tu equipo.
2. Abre la carpeta `TrendGear-Dashboard` en tu editor de código (por ejemplo, Visual Studio Code).
3. No se requiere instalar dependencias ni gestores de paquetes: el proyecto es HTML, CSS y JavaScript puro.
4. Verifica que el archivo `data/trendgear_dataset.csv` esté presente dentro de la carpeta `data/` para que la aplicación cargue los datos localmente.
5. Abre `index.html` en tu navegador o utiliza una extensión como **Live Server** de VS Code para servir el proyecto localmente.

## Configuración de Firebase

Firebase Realtime Database se utiliza únicamente como **fuente de respaldo**, en caso de que el archivo CSV local no pueda cargarse. Para configurarlo:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Habilita **Realtime Database** dentro de tu proyecto.
3. Importa el dataset sintético de clientes en la raíz de la base de datos (en formato de objeto o arreglo de clientes).
4. Copia la URL de tu Realtime Database, con el sufijo `.json`, por ejemplo:

   ```
   https://tu-proyecto-default-rtdb.firebaseio.com/.json
   ```

5. En el archivo `js/data-loader.js`, reemplaza el valor de la constante `FIREBASE_URL` por la URL de tu propio proyecto:

   ```javascript
   const FIREBASE_URL = "https://tu-proyecto-default-rtdb.firebaseio.com/.json";
   ```

6. Durante el desarrollo, configura las reglas de lectura de tu Realtime Database en modo de prueba (lectura pública) para evitar errores de conexión al consultar los datos desde el navegador.

## Funcionamiento

1. El usuario abre cualquiera de las tres páginas del sitio (`index.html`, `clientes.html` o `reportes.html`).
2. Al cargar el DOM, `i18n.js` inicializa el menú de navegación, el selector de idioma y aplica las traducciones correspondientes al idioma guardado en `localStorage`.
3. Cada página invoca `loadCustomerData()`, definida en `data-loader.js`, la cual intenta obtener el dataset primero desde el archivo CSV local (`data/trendgear_dataset.csv`). Si la solicitud falla o el archivo está vacío, la función recurre automáticamente a Firebase Realtime Database.
4. Mientras se obtienen los datos, se muestra un mensaje de estado ("Cargando datos..."). Si ocurre un error en ambas fuentes, se muestra un mensaje de error correspondiente.
5. Una vez obtenidos los datos:
   - En el **Dashboard**, `script.js` calcula métricas (total de clientes, ingresos totales, gasto promedio, miembros VIP) y renderiza dinámicamente las tarjetas y la tabla completa de clientes.
   - En **Clientes**, `clientes.js` almacena el dataset completo y renderiza la tabla filtrada según el texto de búsqueda y la membresía seleccionada, actualizándose en tiempo real con cada interacción del usuario.
   - En **Reportes**, `reportes.js` agrupa los datos por ciudad, membresía, método de pago y producto, y genera barras dinámicas que reflejan el peso relativo de cada categoría.
6. Si el usuario cambia el idioma mediante el selector ES/EN, se dispara el evento `languagechange`, que provoca que cada página vuelva a renderizar sus textos y componentes dinámicos sin necesidad de recargar los datos.

## Buenas Prácticas Implementadas

- **Código organizado por responsabilidades:** la carga de datos (`data-loader.js`), las traducciones (`i18n.js`) y la lógica particular de cada página están separadas en archivos independientes.
- **HTML semántico:** uso de etiquetas como `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` y atributos ARIA (`aria-label`, `aria-live`, `aria-expanded`) para mejorar la accesibilidad.
- **CSS modular mediante variables:** uso de variables CSS (`:root`) para colores, tipografías, radios de borde y transiciones, facilitando la mantenibilidad del tema visual.
- **JavaScript limpio y funciones reutilizables:** funciones puras y de propósito único, como `formatCurrency()`, `groupBy()`, `setStatusMessage()` y `getMembershipBadgeClass()`, reutilizadas en varios módulos.
- **Uso de `async/await`:** todas las operaciones de obtención de datos (CSV y Firebase) se manejan de forma asíncrona con `async/await`.
- **Manejo de errores con `try/catch`:** las funciones de carga de datos capturan errores de red o de formato y muestran mensajes claros al usuario en lugar de fallar silenciosamente.
- **Responsive Design:** uso de `grid-template-columns` con `auto-fit`/`minmax` y media queries para adaptar tarjetas, tablas, formularios y navegación a distintos tamaños de pantalla.
- **Accesibilidad básica:** etiquetas `scope="col"` en encabezados de tabla, región `aria-live="polite"` para mensajes de estado, y controles de navegación con atributos ARIA apropiados.


## Autor

**Autor:** Dilan Andrés Fonseca Téllez

**Programa:** Análisis y Desarrollo de Software

**Proyecto:** TrendGear Dashboard

## Licencia

Este proyecto fue desarrollado con **fines académicos**, como parte de un taller sobre manejo de datos sintéticos, buenas prácticas de desarrollo frontend e integración con servicios en la nube. No está destinado a un uso comercial.

## Conclusiones

El desarrollo de TrendGear Dashboard permitió aplicar de forma práctica conceptos fundamentales del desarrollo web frontend, como la manipulación dinámica del DOM, el consumo de datos mediante `Fetch API` y el manejo de estructuras asíncronas con `async/await`. La implementación de una estrategia de doble fuente de datos (CSV local con respaldo en Firebase Realtime Database) permitió comprender la importancia de diseñar sistemas resilientes ante posibles fallos de conexión o disponibilidad de datos. Asimismo, la construcción de un sistema de internacionalización propio y de una interfaz responsive reforzó buenas prácticas de organización de código y de experiencia de usuario, sin depender de frameworks externos.

## Recomendaciones

Como posibles mejoras futuras para el proyecto se identifican:

- Incorporar gráficos estadísticos (por ejemplo, con librerías como Chart.js) para complementar las barras de los reportes.
- Implementar paginación en la tabla del Dashboard y del directorio de clientes para mejorar el rendimiento con datasets más grandes.
- Agregar un sistema de autenticación para restringir el acceso a la información de clientes.
- Ampliar los filtros del directorio de clientes (por ejemplo, por rango de edad, ciudad o método de pago).
- Añadir ordenamiento de columnas en las tablas (por nombre, monto gastado, fecha de compra, etc.).
