// ==========================================================================
// TrendGear Dashboard - data-loader.js
// Fuente de datos con estrategia "CSV primero, Firebase de respaldo":
//   1. Intenta leer el dataset local data/trendgear_dataset.csv
//   2. Si falla (archivo ausente, error de red, CSV vacío/corrupto),
//      cae automáticamente a Firebase Realtime Database.
// Se incluye en todas las páginas antes de script.js / clientes.js / reportes.js
// ==========================================================================

const CSV_URL = "data/trendgear_dataset.csv";
const FIREBASE_URL = "https://trendgear-dashboard-e6fe0-default-rtdb.firebaseio.com/.json";

// --------------------------------------------------------------------------
// Parser simple de CSV. Soporta valores entre comillas dobles (incluyendo
// comas y comillas escapadas "" dentro del valor) y saltos de línea \n o \r\n.
// --------------------------------------------------------------------------
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  // Última fila si el archivo no termina con salto de línea.
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

// --------------------------------------------------------------------------
// Convierte las filas del CSV (con encabezado) en un arreglo de objetos
// cliente, igual que los que devuelve Firebase.
// --------------------------------------------------------------------------
function csvRowsToCustomers(rows) {
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((row) => {
    const customer = {};
    headers.forEach((header, index) => {
      customer[header] = (row[index] ?? "").trim();
    });
    return customer;
  });
}

// --------------------------------------------------------------------------
// Normaliza la respuesta de Firebase (objeto o arreglo) a un arreglo simple.
// --------------------------------------------------------------------------
function normalizeCustomers(data) {
  if (!data) return [];
  return Array.isArray(data) ? data.filter(Boolean) : Object.values(data);
}

// --------------------------------------------------------------------------
// Intenta cargar el dataset desde el CSV local.
// --------------------------------------------------------------------------
async function loadFromCSV() {
  const response = await fetch(CSV_URL);

  if (!response.ok) {
    throw new Error(`No se encontró el CSV: ${response.status}`);
  }

  const text = await response.text();
  const customers = csvRowsToCustomers(parseCSV(text));

  if (customers.length === 0) {
    throw new Error("El CSV está vacío o no se pudo interpretar.");
  }

  return customers;
}

// --------------------------------------------------------------------------
// Intenta cargar el dataset desde Firebase Realtime Database.
// --------------------------------------------------------------------------
async function loadFromFirebase() {
  const response = await fetch(FIREBASE_URL);

  if (!response.ok) {
    throw new Error(`Error de conexión con Firebase: ${response.status}`);
  }

  const data = await response.json();
  return normalizeCustomers(data);
}

// --------------------------------------------------------------------------
// Punto de entrada único usado por script.js, clientes.js y reportes.js:
// intenta CSV primero y, si falla por cualquier motivo, recurre a Firebase.
// Lanza un error solo si ambas fuentes fallan.
// --------------------------------------------------------------------------
async function loadCustomerData() {
  try {
    const customers = await loadFromCSV();
    console.info("TrendGear: datos cargados desde el CSV local.");
    return customers;
  } catch (csvError) {
    console.warn("TrendGear: no se pudo cargar el CSV, se usará Firebase.", csvError);
    const customers = await loadFromFirebase();
    console.info("TrendGear: datos cargados desde Firebase (respaldo).");
    return customers;
  }
}
