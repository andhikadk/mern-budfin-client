import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ income, expense, year, month }: any) => {
  const days = [];

  if (
    month === '01' ||
    month === '03' ||
    month === '05' ||
    month === '07' ||
    month === '08' ||
    month === '10' ||
    month === '12'
  ) {
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
  } else if (
    month === '04' ||
    month === '06' ||
    month === '09' ||
    month === '11'
  ) {
    for (let i = 1; i <= 30; i++) {
      days.push(i);
    }
  } else {
    for (let i = 1; i <= 28; i++) {
      days.push(i);
    }
  }

  // in income sum every data have same date
  const incomeSums: any = {};
  const expenseSums: any = {};
  days.forEach((day) => {
    const date = `${year}-${month}-${day < 10 ? '0' + day : day} 07:00:00`;
    incomeSums[date] = 0;
    expenseSums[date] = 0;
  });
  income.forEach((item: any) => {
    incomeSums[item.date] = (incomeSums[item.date] || 0) + item.amount;
  });
  expense.forEach((item: any) => {
    expenseSums[item.date] = (expenseSums[item.date] || 0) + item.amount;
  });
  const incomeSum = Object.values(incomeSums);
  const expenseSum = Object.values(expenseSums);

  return (
    <Bar
      data={{
        labels: days,
        datasets: [
          {
            label: 'Income',
            data: incomeSum,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.5)',
          },
          {
            label: 'Expense',
            data: expenseSum,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.5)',
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: `Statistic ${month}-${year}`,
          },
        },
      }}
      // height={200}
      // width={600}
    />
  );
};

export default Chart;
