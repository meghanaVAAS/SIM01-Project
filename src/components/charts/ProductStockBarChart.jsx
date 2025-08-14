// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// // Example data, replace with real data/props as needed
// const data = {
//   labels: ['Product A', 'Product B', 'Product C', 'Product D'],
//   datasets: [
//     {
//       label: 'Stock Quantity',
//       data: [30, 50, 20, 40],
//       backgroundColor: '#1976d2',
//       borderRadius: 6,
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: true,
//       position: 'top',
//     },
//     tooltip: {
//       enabled: true,
//     },
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//       ticks: {
//         stepSize: 10,
//       },
//     },
//   },
// };

// export default function ProductStockBarChart() {
//   return (
//     <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
//       <h5 style={{ marginBottom: 16 }}>Product Stock Levels</h5>
//       <Bar data={data} options={options} height={220} />
//     </div>
//   );
// }
