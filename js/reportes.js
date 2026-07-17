// ==========================================================================
// TrendGear Dashboard - reportes.js
// Agrega el dataset de clientes por ciudad, membresía, método de pago
// y producto, y renderiza los resultados como barras dinámicas.
// ==========================================================================

// La obtención de datos (CSV local primero, Firebase como respaldo) vive
// en js/data-loader.js, cargado antes que este script.

const statusMessage = document.getElementById("statusMessage");
const reportByCity = document.getElementById("reportByCity");
const reportByMembership = document.getElementById("reportByMembership");
const reportByPayment = document.getElementById("reportByPayment");
const reportTopProducts = document.getElementById("reportTopProducts");

// Dataset completo, guardado para poder re-renderizar al cambiar de idioma.
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
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// --------------------------------------------------------------------------
// Agrupa un arreglo de clientes por una clave, sumando un valor numérico
// (o contando registros si no se indica un campo numérico).
// --------------------------------------------------------------------------
function groupBy(customers, keyField, valueField) {
  const totals = {};

  customers.forEach((customer) => {
    const key = customer[keyField] ?? "N/A";
    const amount = valueField ? Number(customer[valueField]) || 0 : 1;
    totals[key] = (totals[key] || 0) + amount;
  });

  return Object.entries(totals).sort((a, b) => b[1] - a[1]);
}

// --------------------------------------------------------------------------
// Renderiza una lista de barras dentro de un contenedor, mostrando
// el porcentaje relativo al valor más alto del grupo.
// --------------------------------------------------------------------------
function renderBars(container, entries, formatValue) {
  const maxValue = Math.max(...entries.map(([, value]) => value), 1);

  container.innerHTML = entries
    .slice(0, 8)
    .map(([label, value]) => {
      const percentage = Math.round((value / maxValue) * 100);
      return `
        <div class="bar-row">
          <span class="bar-row__label">${label}</span>
          <span class="bar-row__track">
            <span class="bar-row__fill" style="width: ${percentage}%"></span>
          </span>
          <span class="bar-row__value">${formatValue(value)}</span>
        </div>
      `;
    })
    .join("");
}

// --------------------------------------------------------------------------
// Calcula y renderiza los cuatro reportes agregados del dataset.
// --------------------------------------------------------------------------
function renderReports(customers) {
  const byCity = groupBy(customers, "City", "Amount_Spent");
  renderBars(reportByCity, byCity, formatCurrency);

  const byMembership = groupBy(customers, "Membership_Status");
  renderBars(reportByMembership, byMembership, (value) => String(value));

  const byPayment = groupBy(customers, "Payment_Method");
  renderBars(reportByPayment, byPayment, (value) => String(value));

  const byProduct = groupBy(customers, "Product_Purchased");
  renderBars(reportTopProducts, byProduct, (value) => String(value));
}

// --------------------------------------------------------------------------
// Obtiene el dataset de clientes (CSV local primero, Firebase de respaldo)
// y dispara el cálculo de los reportes.
// --------------------------------------------------------------------------
async function loadCustomers() {
  setStatusMessage(t("loading"), "loading");

  try {
    currentCustomers = await loadCustomerData();

    if (currentCustomers.length === 0) {
      setStatusMessage(t("error_empty"), "error");
      return;
    }

    setStatusMessage("");
    renderReports(currentCustomers);
  } catch (error) {
    setStatusMessage(t("error_connection"), "error");
    console.error("Error al obtener el dataset de TrendGear:", error);
  }
}

document.addEventListener("languagechange", () => {
  if (currentCustomers.length > 0) {
    renderReports(currentCustomers);
  }
});

document.addEventListener("DOMContentLoaded", loadCustomers);
