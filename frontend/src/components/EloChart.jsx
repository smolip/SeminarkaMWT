import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function EloGraph({eloData}) {

  console.log(eloData);
  const chartData = {
    labels: eloData.graph_data.elo.dates,
    datasets: [
      {
        label: 'ELO',
        data: eloData.graph_data.elo.values, 
        borderColor: 'rgb(249, 115, 22)', 
        backgroundColor: 'rgba(249, 115, 22, 0.5)', 
        tension: 0.1, 
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
