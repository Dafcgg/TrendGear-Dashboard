// ==========================================================================
// TrendGear Dashboard - i18n.js
// Diccionario de traducciones ES/EN y lógica de menú hamburguesa.
// Se incluye en todas las páginas del sitio.
// ==========================================================================

const TRANSLATIONS = {
  es: {
    brand: "TrendGear",
    nav_dashboard: "Dashboard",
    nav_clientes: "Clientes",
    nav_reportes: "Reportes",

    dash_title: "Resumen de Clientes",
    dash_subtitle: "Datos sintéticos de la operación de TrendGear en tiempo real.",
    card_total: "Total de Clientes",
    card_revenue: "Ingresos Totales",
    card_average: "Gasto Promedio",
    card_vip: "Miembros VIP",
    th_id: "ID Cliente",
    th_name: "Nombre",
    th_email: "Correo",
    th_product: "Producto Comprado",
    th_date: "Fecha de Compra",
    th_amount: "Monto ($)",
    th_age: "Edad",
    th_city: "Ciudad",
    th_payment: "Método de Pago",
    th_login: "Último Ingreso",
    th_status: "Membresía",

    clientes_title: "Directorio de Clientes",
    clientes_subtitle: "Busca y filtra la base de clientes de TrendGear.",
    search_placeholder: "Buscar por nombre, correo o ciudad...",
    filter_all: "Todas las membresías",
    filter_basic: "Basic",
    filter_pro: "Pro",
    filter_vip: "VIP",
    no_results: "No se encontraron clientes con ese criterio.",

    reportes_title: "Reportes y Estadísticas",
    reportes_subtitle: "Análisis agregado del comportamiento de compra de los clientes.",
    report_by_city: "Ingresos por Ciudad",
    report_by_membership: "Clientes por Membresía",
    report_by_payment: "Métodos de Pago",
    report_top_products: "Productos Más Vendidos",

    loading: "Cargando datos desde Firebase...",
    error_connection: "No fue posible cargar los datos. Verifica tu conexión a Firebase.",
    error_empty: "No se encontraron registros en la base de datos.",

    footer_text: "© 2026 TrendGear. Proyecto académico con datos sintéticos.",
  },

  en: {
    brand: "TrendGear",
    nav_dashboard: "Dashboard",
    nav_clientes: "Customers",
    nav_reportes: "Reports",

    dash_title: "Customer Overview",
    dash_subtitle: "Synthetic data from TrendGear's live operation.",
    card_total: "Total Customers",
    card_revenue: "Total Revenue",
    card_average: "Average Spend",
    card_vip: "VIP Members",
    th_id: "Customer ID",
    th_name: "Name",
    th_email: "Email",
    th_product: "Product Purchased",
    th_date: "Purchase Date",
    th_amount: "Amount ($)",
    th_age: "Age",
    th_city: "City",
    th_payment: "Payment Method",
    th_login: "Last Login",
    th_status: "Membership",

    clientes_title: "Customer Directory",
    clientes_subtitle: "Search and filter TrendGear's customer base.",
    search_placeholder: "Search by name, email or city...",
    filter_all: "All memberships",
    filter_basic: "Basic",
    filter_pro: "Pro",
    filter_vip: "VIP",
    no_results: "No customers match that search.",

    reportes_title: "Reports & Statistics",
    reportes_subtitle: "Aggregated analysis of customer purchase behavior.",
    report_by_city: "Revenue by City",
    report_by_membership: "Customers by Membership",
    report_by_payment: "Payment Methods",
    report_top_products: "Best-Selling Products",

    loading: "Loading data from Firebase...",
    error_connection: "Could not load the data. Check your Firebase connection.",
    error_empty: "No records were found in the database.",

    footer_text: "© 2026 TrendGear. Academic project using synthetic data.",
  },
};

const LANG_STORAGE_KEY = "trendgear-lang";

// --------------------------------------------------------------------------
// Devuelve el idioma activo guardado, o "es" por defecto.
// --------------------------------------------------------------------------
function getCurrentLang() {
  return localStorage.getItem(LANG_STORAGE_KEY) || "es";
}

// --------------------------------------------------------------------------
// Traduce una clave del diccionario según el idioma activo.
// --------------------------------------------------------------------------
function t(key) {
  const lang = getCurrentLang();
  return TRANSLATIONS[lang][key] ?? key;
}

// --------------------------------------------------------------------------
// Aplica las traducciones a todos los elementos marcados con data-i18n.
// --------------------------------------------------------------------------
function applyTranslations() {
  const lang = getCurrentLang();
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });

  document.querySelectorAll(".lang-toggle__option").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  // Notifica a otros scripts (por ejemplo, para re-renderizar tablas dinámicas).
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

// --------------------------------------------------------------------------
// Cambia el idioma activo y vuelve a aplicar las traducciones.
// --------------------------------------------------------------------------
function setLang(lang) {
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyTranslations();
}

// --------------------------------------------------------------------------
// Inicializa el selector de idioma (botones ES / EN).
// --------------------------------------------------------------------------
function initLangToggle() {
  document.querySelectorAll(".lang-toggle__option").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
}

// --------------------------------------------------------------------------
// Menú hamburguesa: alterna la visibilidad del menú en pantallas pequeñas.
// --------------------------------------------------------------------------
function initNavToggle() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// --------------------------------------------------------------------------
// Marca el enlace de navegación correspondiente a la página actual.
// --------------------------------------------------------------------------
function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach((link) => {
    const linkPage = link.getAttribute("href");
    link.classList.toggle("is-active", linkPage === currentPage);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initLangToggle();
  highlightActiveNavLink();
  applyTranslations();
});
