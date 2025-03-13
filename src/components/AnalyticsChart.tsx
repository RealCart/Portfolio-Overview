import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Asset } from '../features/portfolioSlice';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  assets: Asset[];
}

const AnalyticsChart: React.FC<Props> = ({ assets }) => {
  if (assets.length === 0) return null;

  const labels = assets.map((asset) => asset.name);
  const dataPoints = assets.map((asset) => asset.totalValue);

  const data = {
    labels,
    datasets: [
      {
        label: 'Доли в портфеле',
        data: dataPoints,
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
          '#ffce56',
          '#28a745',
          '#fd7e14',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div style={{ width: '400px', margin: '1rem auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default AnalyticsChart;
