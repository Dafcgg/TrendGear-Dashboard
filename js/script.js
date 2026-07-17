// ==========================================================================
// TrendGear Dashboard - script.js
// Conecta con Firebase Realtime Database, procesa el dataset sintético
// y renderiza dinámicamente las tarjetas y la tabla del Dashboard.
// ==========================================================================

// La obtención de datos (CSV local primero, Firebase como respaldo) vive
// en js/data-loader.js, cargado antes que este script.

// Referencias a elementos del DOM utilizados en varias funciones.
// El menú hamburguesa y el selector de idioma se inicializan en i18n.js.
const cardsContainer = document.getElementById("cardsContainer");
const tableBody = document.getElementById("customersTableBody");
const statusMessage = document.getElementById("statusMessage");

// Se guarda el último dataset cargado para poder re-renderizar
// las tarjetas y textos cuando el usuario cambia de idioma (ES/EN).
let currentCustomers = [];

// --------------------------------------------------------------------------
// Muestra un mensaje de estado (carga o error) al usuario.
// --------------------------------------------------------------------------
function setStatusMessage(text, type) {
  statusMessage.textContent = text;
  statusMessage.className = "status-message";
  if (type) {
    statusMessage.classList.add(`status-message--${type}`);
  }
}

// --------------------------------------------------------------------------
// Formatea un valor numérico como moneda en dólares.
// --------------------------------------------------------------------------
function formatCurrency(amount) {
  const value = Number(amount) || 0;
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

// --------------------------------------------------------------------------
// Calcula las métricas resumen (tarjetas) a partir del listado de clientes.
// --------------------------------------------------------------------------
function calculateSummary(customers) {
  const totalCustomers = customers.length;

  const totalSpent = customers.reduce(
    (sum, customer) => sum + (Number(customer["Amount_Spent"]) || 0),
    0
  );

  const averageSpent = totalCustomers > 0 ? totalSpent / totalCustomers : 0;

  const vipMembers = customers.filter(
    (customer) => customer["Membership_Status"] === "VIP"
  ).length;

  return { totalCustomers, totalSpent, averageSpent, vipMembers };
}

// --------------------------------------------------------------------------
// Genera dinámicamente las tarjetas de resumen usando template literals.
// --------------------------------------------------------------------------
function renderCards(customers) {
  const { totalCustomers, totalSpent, averageSpent, vipMembers } =
    calculateSummary(customers);

  cardsContainer.innerHTML = `
    <div class="card">
      <p class="card__label">${t("card_total")}</p>
      <p class="card__value">${totalCustomers}</p>
    </div>
    <div class="card">
      <p class="card__label">${t("card_revenue")}</p>
      <p class="card__value">${formatCurrency(totalSpent)}</p>
    </div>
    <div class="card">
      <p class="card__label">${t("card_average")}</p>
      <p class="card__value">${formatCurrency(averageSpent)}</p>
    </div>
    <div class="card">
      <p class="card__label">${t("card_vip")}</p>
      <p class="card__value">${vipMembers}</p>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Genera dinámicamente una fila de tabla para un cliente.
// --------------------------------------------------------------------------
function getMembershipBadgeClass(status) {
  if (status === "VIP") return "badge--vip";
  if (status === "Pro") return "badge--pro";
  return "badge--basic";
}

function buildCustomerRow(customer) {
  const badgeClass = getMembershipBadgeClass(customer["Membership_Status"]);

  return `
    <tr>
      <td>${customer["Customer_ID"] ?? ""}</td>
      <td>${customer["Name"] ?? ""}</td>
      <td>${customer["Email"] ?? ""}</td>
      <td>${customer["Product_Purchased"] ?? ""}</td>
      <td>${customer["Purchase_Date"] ?? ""}</td>
      <td>${formatCurrency(customer["Amount_Spent"])}</td>
      <td>${customer["Age"] ?? ""}</td>
      <td>${customer["City"] ?? ""}</td>
      <td>${customer["Payment_Method"] ?? ""}</td>
      <td>${customer["Last_Login_Date"] ?? ""}</td>
      <td><span class="badge ${badgeClass}">${customer["Membership_Status"] ?? ""}</span></td>
    </tr>
  `;
}

// --------------------------------------------------------------------------
// Renderiza todas las filas de la tabla a partir del listado de clientes.
// --------------------------------------------------------------------------
function renderTable(customers) {
  tableBody.innerHTML = customers.map(buildCustomerRow).join("");
}

// --------------------------------------------------------------------------
// Obtiene el dataset de clientes (CSV local primero, Firebase de respaldo)
// y dispara el renderizado dinámico de tarjetas y tabla.
// --------------------------------------------------------------------------
async function loadCustomers() {
  setStatusMessage(t("loading"), "loading");

  try {
    const customers = await loadCustomerData();

    if (customers.length === 0) {
      setStatusMessage(t("error_empty"), "error");
      return;
    }

    currentCustomers = customers;
    renderCards(currentCustomers);
    renderTable(currentCustomers);
    setStatusMessage("");
  } catch (error) {
    setStatusMessage(t("error_connection"), "error");
    console.error("Error al obtener el dataset de TrendGear:", error);
  }
}

// --------------------------------------------------------------------------
// Punto de entrada: carga los datos al iniciar la página.
// El menú y el selector de idioma ya se inicializan en i18n.js.
// --------------------------------------------------------------------------
function init() {
  loadCustomers();
}

// Vuelve a renderizar las tarjetas con las etiquetas del nuevo idioma
// sin necesidad de volver a consultar Firebase.
document.addEventListener("languagechange", () => {
  if (currentCustomers.length > 0) {
    renderCards(currentCustomers);
  }
});

document.addEventListener("DOMContentLoaded", init);
