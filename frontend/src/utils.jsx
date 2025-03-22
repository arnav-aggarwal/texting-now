export function colorFromName(name) {
  // Simple hash → color mapping
  const colors = [
    '#1E3A8A', // blue-900
    '#1E40AF', // blue-800
    '#1D4ED8', // blue-700
    '#0C4A6E', // cyan-900
    '#164E63', // cyan-800
    '#155E75', // cyan-700
    '#134E4A', // teal-900
    '#115E59', // teal-800
    '#0F766E', // teal-700
    '#064E3B', // emerald-900
    '#065F46', // emerald-800
    '#047857', // emerald-700
    '#14532D', // green-900
    '#166534', // green-800
    '#15803D', // green-700
    '#422006', // amber-900
    '#78350F', // amber-800
    '#B45309', // amber-700
    '#7C2D12', // orange-900
    '#9A3412', // orange-800
    '#C2410C', // orange-700
    '#7F1D1D', // red-900
    '#991B1B', // red-800
    '#B91C1C', // red-700
    '#4C0519', // rose-900
    '#881337', // rose-800
    '#BE123C', // rose-700
    '#4C1D95', // violet-900
    '#6D28D9', // violet-800
    '#7E22CE', // violet-700
    '#312E81', // indigo-900
    '#4338CA', // indigo-800
    '#4F46E5', // indigo-700
    '#581C87', // purple-900
    '#7C3AED', // purple-800
    '#8B5CF6', // purple-700
    '#1E293B', // slate-800
    '#334155', // slate-700
    '#3F3F46', // zinc-700
    '#44403C', // stone-700
    '#3F6212', // lime-700
    '#854D0E', // yellow-800
    '#92400E', // yellow-700
  ];


  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % colors.length);
  return colors[index];
};
