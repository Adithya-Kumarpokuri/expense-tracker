// import React from 'react'
// import {Chart as ChartJs, 
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
// } from 'chart.js'

// import {Line} from 'react-chartjs-2'
// import styled from 'styled-components'
// import { useGlobalContext } from '../../context/globalContext'
// import { dateFormat } from '../../utils/dateFormat'

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
// )

// function Chart() {
//     const {incomes, expenses} = useGlobalContext()

//     const data = {
//         labels: incomes.map((inc) =>{
//             const {date} = inc
//             return dateFormat(date)
//         }),
//         datasets: [
//             {
//                 label: 'Income',
//                 data: [
//                     ...incomes.map((income) => {
//                         const {amount} = income
//                         return amount
//                     })
//                 ],
//                 backgroundColor: 'green',
//                 tension: .2
//             },
//             {
//                 label: 'Expenses',
//                 data: [
//                     ...expenses.map((expense) => {
//                         const {amount} = expense
//                         return amount
//                     })
//                 ],
//                 backgroundColor: 'red',
//                 tension: .2
//             }
//         ]
//     }


//     return (
//         <ChartStyled >
//             <Line data={data} />
//         </ChartStyled>
//     )
// }



// const ChartStyled = styled.div`
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1rem;
//     border-radius: 20px;
//     height: 100%;
// `;

// export default Chart

import React, { useState } from 'react'
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
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

function Chart() {
  const { incomes, expenses } = useGlobalContext()
  const [chartType, setChartType] = useState('income')

  const isIncome = chartType === 'income'

const sortedData = isIncome
  ? [...incomes].sort((a, b) => new Date(a.date) - new Date(b.date))
  : [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date))

const labels = sortedData.map((item) => dateFormat(item.date))
const amounts = sortedData.map((item) => item.amount)

const data = {
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
}


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: '#6C5DD3',
        titleColor: '#fff',
        bodyColor: '#fff',
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#333',
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#333',
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6
      },
      line: {
        borderWidth: 2
      }
    }
  }

  return (
    <ChartStyled>
      <ToggleContainer>
        <ToggleButton
          active={chartType === 'income'}
          onClick={() => setChartType('income')}
        >
          Show Income
        </ToggleButton>
        <ToggleButton
          active={chartType === 'expense'}
          onClick={() => setChartType('expense')}
        >
          Show Expenses
        </ToggleButton>
      </ToggleContainer>
      <Line data={data} options={options} />
    </ChartStyled>
  )
}

const ChartStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`

const ToggleContainer = styled.div`
  margin-bottom: 1rem;
  background: #f5f5f5;
  padding: 0.8rem;
  border-radius: 12px;
  display: flex;
  justify-content: center;
`

const ToggleButton = styled.button`
  background: ${(props) => (props.active ? '#6C5DD3' : '#EEE')};
  color: ${(props) => (props.active ? '#FFF' : '#333')};
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.active ? '#5A48B0' : '#DDD')};
  }
`

export default Chart

