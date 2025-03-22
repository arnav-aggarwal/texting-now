export function colorFromName(name) {
  // Simple hash → color mapping
  const colors = [
    '#1E3A8A', // blue-900
    '#1D4ED8', // blue-700
    '#0C4A6E', // cyan-900
    '#155E75', // cyan-700
    '#134E4A', // teal-900
    '#0F766E', // teal-700
    '#064E3B', // emerald-900
    '#047857', // emerald-700
    '#14532D', // green-900
    '#15803D', // green-700
    '#422006', // amber-900
    '#B45309', // amber-700
    '#7C2D12', // orange-900
    '#C2410C', // orange-700
    '#7F1D1D', // red-900
    '#B91C1C', // red-700
    '#4C0519', // rose-900
    '#BE123C', // rose-700
    '#4C1D95', // violet-900
    '#7E22CE', // violet-700
    '#312E81', // indigo-900
    '#4F46E5', // indigo-700
    '#581C87', // purple-900
    '#8B5CF6', // purple-700
    '#334155', // slate-700
    '#3F3F46', // zinc-700
    '#44403C', // stone-700
    '#3F6212', // lime-700
    '#854D0E', // yellow-800
  ];

  // Simple, stable hash function
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
