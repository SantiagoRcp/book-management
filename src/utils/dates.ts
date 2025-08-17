export function addBusinessDaysUtc(startDate: Date, days: number): Date {
  const d = new Date(startDate);
  d.setUTCDate(d.getUTCDate() + days);

  // Ajuste si la fecha cae en fin de semana
  const day = d.getUTCDay(); // 0 = domingo, 6 = sábado
  if (day === 6) {
    // sábado → mover a lunes
    d.setUTCDate(d.getUTCDate() + 2);
  } else if (day === 0) {
    // domingo → mover a lunes
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return d;
}
