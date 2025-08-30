import React, { useState } from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const [chartType, setChartType] = useState('line');
  const [dataType, setDataType] = useState('income');

  const isIncome = dataType === 'income';
  const dataSource = isIncome ? incomes : expenses;

  const sortedData = [...dataSource].sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = sortedData.map((item) => dateFormat(item.date));
  const amounts = sortedData.map((item) => item.amount);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: isIncome ? 'Income' : 'Expenses',
        data: amounts,
        backgroundColor: isIncome ? '#4CAF50' : '#FF4C4C',
        borderColor: isIncome ? '#4CAF50' : '#FF4C4C',
        tension: 0.4,
        fill: false,
      }
    ]
  };

  function groupByCategory(data) {
    const map = new Map();

    data.forEach(item => {
      const prev = map.get(item.category) || 0;
      map.set(item.category, prev + item.amount);
    });

    return {
      labels: [...map.keys()],
      data: [...map.values()],
    };
  }

  const grouped = groupByCategory(dataSource);

  const pieChartData = {
    labels: grouped.labels,
    datasets: [
      {
        data: grouped.data,
        backgroundColor: [
          '#4CAF50',
          '#FF9800',
          '#03A9F4',
          '#E91E63',
          '#9C27B0',
          '#FFEB3B'
        ],
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          }
        }
      },
      tooltip: {
        backgroundColor: '#6C5DD3',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#333' }
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#333' }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        borderWidth: 2,
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.2,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  return (
    <ChartStyled>
      <ToggleContainer>
        <ToggleButton
          active={dataType === 'income'}
          onClick={() => setDataType('income')}
        >
          Show Income
        </ToggleButton>
        <ToggleButton
          active={dataType === 'expense'}
          onClick={() => setDataType('expense')}
        >
          Show Expense
        </ToggleButton>
      </ToggleContainer>

      <ToggleContainer>
        <ToggleButton
          active={chartType === 'line'}
          onClick={() => setChartType('line')}
        >
          Line Chart
        </ToggleButton>
        <ToggleButton
          active={chartType === 'pie'}
          onClick={() => setChartType('pie')}
        >
          Pie Chart
        </ToggleButton>
      </ToggleContainer>

      {chartType === 'line' ? (
        <Line data={lineChartData} options={lineOptions} />
      ) : (
        <PieWrapper>
          <Pie data={pieChartData} options={pieOptions} />
        </PieWrapper>
      )}
    </ChartStyled>
  );
}

export default Chart;

// Styled Components
const ChartStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  gap: 10px;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.active ? '#6C5DD3' : '#eee')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #6C5DD3;
    color: #fff;
  }
`;

const PieWrapper = styled.div`
  width: 320px;
  height: 320px;
  margin-top: 20px;
`;
