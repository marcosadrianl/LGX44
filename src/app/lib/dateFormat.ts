export function formatDate(dateString?: string): string {
  let date: Date;

  try {
    if (dateString && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      // YYYY-MM-DD → interpretamos como local
      const [year, month, day] = dateString.split("-").map(Number);
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(); // fallback a hoy
    }

    if (isNaN(date.getTime())) {
      date = new Date();
    }
  } catch {
    date = new Date();
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatToISO(fecha: string): string {
  const [dia, mes, anio] = fecha.split("/");
  return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
}
