import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import jsonData from './data.json'; // Předpokládá, že data.json je ve stejné složce

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function EloGraph() {
  const eloData = jsonData.graph_data.elo;

  const chartData = {
    labels: eloData.dates, // Datumy jako popisky na ose X
    datasets: [
      {
        label: 'ELO', // Popisek pro ELO data
        data: eloData.values, // Hodnoty ELO
        borderColor: 'rgb(249, 115, 22)', // Barva linie
        backgroundColor: 'rgba(249, 115, 22, 0.5)', // Barva pozadí (např. pro vyplněnou oblast pod linií)
        tension: 1, // Zakřivení linie
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Pozice legendy
      },
      title: {
        display: true,
        text: 'Vývoj ELO', // Titulek grafu
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Datum', // Popisek osy X
        },
      },
      y: {
        title: {
          display: true,
          text: 'ELO Hodnota', // Popisek osy Y
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-orange-500 font-semibold mb-4">Graf vývoje ELA</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};
