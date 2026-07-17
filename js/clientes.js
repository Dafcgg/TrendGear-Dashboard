// ==========================================================================
// TrendGear Dashboard - clientes.js
// Carga el dataset de clientes desde Firebase y permite buscar y filtrar
// el directorio por nombre, correo, ciudad y tipo de membresia.
// ==========================================================================

// La obtención de datos (CSV local primero, Firebase como respaldo) vive
// en js/data-loader.js, cargado antes que este script.

const tableBody = document.getElementById("customersTableBody");
const statusMessage = document.getElementById("statusMessage");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const membershipFilter = document.getElementById("membershipFilter");

// Dataset completo obtenido de Firebase, usado como fuente para filtrar.
let allCustomers = [];

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
// Devuelve la clase de badge según el nivel de membresía.
// --------------------------------------------------------------------------
function getMembershipBadgeClass(status) {
  if (status === "VIP") return "badge--vip";
  if (status === "Pro") return "badge--pro";
  return "badge--basic";
}

// --------------------------------------------------------------------------
// Genera dinámicamente una fila de tabla para un cliente.
// --------------------------------------------------------------------------
function buildCustomerRow(customer) {
  const badgeClass = getMembershipBadgeClass(customer["Membership_Status"]);

  return `
    <tr>
      <td>${customer["Customer_ID"] ?? ""}</td>
      <td>${customer["Name"] ?? ""}</td>
      <td>${customer["Email"] ?? ""}</td>
      <td>${customer["City"] ?? ""}</td>
      <td>${customer["Payment_Method"] ?? ""}</td>
      <td>${customer["Last_Login_Date"] ?? ""}</td>
      <td><span class="badge ${badgeClass}">${customer["Membership_Status"] ?? ""}</span></td>
    </tr>
  `;
}

// --------------------------------------------------------------------------
// Aplica el texto de búsqueda y el filtro de membresía sobre el dataset
// completo, y vuelve a renderizar la tabla con el resultado.
// --------------------------------------------------------------------------
function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const membership = membershipFilter.value;

  const filtered = allCustomers.filter((customer) => {
    const matchesMembership =
      membership === "all" || customer["Membership_Status"] === membership;

    const matchesQuery =
      query === "" ||
      String(customer["Name"] ?? "").toLowerCase().includes(query) ||
      String(customer["Email"] ?? "").toLowerCase().includes(query) ||
      String(customer["City"] ?? "").toLowerCase().includes(query);

    return matchesMembership && matchesQuery;
  });

  renderResults(filtered);
}

// --------------------------------------------------------------------------
// Renderiza la tabla de resultados y el contador de coincidencias.
// --------------------------------------------------------------------------
function renderResults(customers) {
  resultsCount.textContent = `${customers.length} / ${allCustomers.length}`;

  if (customers.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7">${t("no_results")}</td></tr>`;
    return;
  }

  tableBody.innerHTML = customers.map(buildCustomerRow).join("");
}

// --------------------------------------------------------------------------
// Obtiene el dataset de clientes (CSV local primero, Firebase de respaldo).
// --------------------------------------------------------------------------
async function loadCustomers() {
  setStatusMessage(t("loading"), "loading");

  try {
    allCustomers = await loadCustomerData();

    if (allCustomers.length === 0) {
      setStatusMessage(t("error_empty"), "error");
      return;
    }

    setStatusMessage("");
    applyFilters();
  } catch (error) {
    setStatusMessage(t("error_connection"), "error");
    console.error("Error al obtener el dataset de TrendGear:", error);
  }
}

// --------------------------------------------------------------------------
// Punto de entrada: conecta los eventos de búsqueda/filtro y carga los datos.
// --------------------------------------------------------------------------
function init() {
  searchInput.addEventListener("input", applyFilters);
  membershipFilter.addEventListener("change", applyFilters);
  loadCustomers();
}

// Vuelve a renderizar (mensaje de "sin resultados", etc.) cuando cambia el idioma.
document.addEventListener("languagechange", () => {
  if (allCustomers.length > 0) {
    applyFilters();
  }
});

document.addEventListener("DOMContentLoaded", init);
