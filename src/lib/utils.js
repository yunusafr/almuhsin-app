import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value) {
  const number = Number(value ?? 0);

  if (Number.isNaN(number)) return "Rp0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

/**
 * Normalisasi data list dari respons API (API v2).
 *
 * Menerima tiga bentuk:
 *  - `{ success, data: { items: [...], pagination } }` (baru, paginated)
 *  - `{ success, data: [...] }` (lama, array langsung)
 *  - array langsung
 */
export function listData(response) {
  if (Array.isArray(response)) return response;

  const data = response?.data;

  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.items)) return data.items;

  return [];
}

/**
 * Metadata pagination dari respons API v2 — `null` bila tidak ada.
 */
export function listPagination(response) {
  const data = response?.data;

  return data?.pagination ?? null;
}

export function formatDate(value, locale = "id-ID") {
  if (!value) return "-";

  try {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function downloadCsv({ filename, columns, rows }) {
  const escape = (value) => {
    const text = String(value ?? "");

    if (/[",\n;]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }

    return text;
  };

  const header = columns.map((column) => escape(column.label)).join(";");
  const body = rows
    .map((row) =>
      columns
        .map((column) => escape(column.value ? column.value(row) : row[column.key]))
        .join(";"),
    )
    .join("\n");

  const blob = new Blob([`\uFEFF${header}\n${body}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
