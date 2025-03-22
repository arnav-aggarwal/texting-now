export function colorFromName(name) {
  // Simple hash → color mapping
  const colors = [
    '#3B82F6', // blue-500
    '#2563EB', // blue-600
    '#1D4ED8', // blue-700
    '#0EA5E9', // sky-500
    '#0284C7', // sky-600
    '#0369A1', // sky-700
    '#14B8A6', // teal-500
    '#0D9488', // teal-600
    '#0F766E', // teal-700
    '#10B981', // emerald-500
    '#059669', // emerald-600
    '#047857', // emerald-700
    '#22C55E', // green-500
    '#16A34A', // green-600
    '#15803D', // green-700
    '#84CC16', // lime-500
    '#65A30D', // lime-600
    '#4D7C0F', // lime-700
    '#FACC15', // yellow-400
    '#EAB308', // yellow-500
    '#CA8A04', // yellow-600
    '#F59E0B', // amber-500
    '#D97706', // amber-600
    '#B45309', // amber-700
    '#FB923C', // orange-400
    '#F97316', // orange-500
    '#EA580C', // orange-600
    '#F87171', // red-400
    '#EF4444', // red-500
    '#DC2626', // red-600
    '#E879F9', // fuchsia-400
    '#D946EF', // fuchsia-500
    '#C026D3', // fuchsia-600
    '#A855F7', // purple-500
    '#9333EA', // purple-600
    '#7E22CE', // purple-700
    '#8B5CF6', // violet-500
    '#7C3AED', // violet-600
    '#6D28D9', // violet-700
    '#60A5FA', // indigo-400
    '#4F46E5', // indigo-600
    '#4338CA', // indigo-700
    '#38BDF8', // cyan-400
    '#06B6D4', // cyan-500
    '#0891B2', // cyan-600
    '#A3A3A3', // neutral-400
    '#737373', // neutral-600
    '#525252'  // neutral-700
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % colors.length);
  return colors[index];
};
