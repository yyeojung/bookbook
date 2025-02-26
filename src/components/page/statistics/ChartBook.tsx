import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { TooltipItem } from 'chart.js';
import { ChartColorProps } from 'page/Statistics';

interface ChartBookProps extends ChartColorProps {
  chartData: number[];
}

const ChartBook = ({ currentTheme, chartData }: ChartBookProps) => {
  const monthMaxValue = Math.max(...chartData) || 4;
  const maxValue = Math.ceil(monthMaxValue / 4) * 4;
  const stepSize = monthMaxValue > 0 ? Math.ceil(maxValue / 4) : 1;

  const data = {
    labels: ['1월', '', '3월', '', '5월', '', '7월', '', '9월', '', '11월', ''],
    datasets: [
      {
        label: '권수',
        data: chartData,
        backgroundColor: [
          currentTheme.mainColor,
          currentTheme.subColor01,
          currentTheme.subColor02
        ],
        hoverBackgroundColor: currentTheme.subColor03
      }
    ]
  };

  const options = {
    barPercentage: 0.7,
    categoryPercentage: 1,
    layout: {
      padding: {
        top: 16,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    interaction: {
      intersect: false // 교차 지점에서만 상호작용할지 여부
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          offset: false,
          color: '#d5d5d5',
          tickColor: '#f2f2f2',
          tickLength: 4
        },
        min: 0,
        max: maxValue,
        border: {
          display: false
        },
        ticks: {
          color: '#3c3c3c',
          font: {
            family: 'NanumSquareRound',
            size: 10
          },
          stepSize: stepSize
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#131212',
          maxRotation: 0, // 레이블의 기울기를 제어
          autoSkip: false,
          padding: -2,
          font: {
            family: 'NanumSquareRound',
            size: 10
          }
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        padding: {
          top: 4,
          right: 10,
          bottom: 4,
          left: 10
        },
        backgroundColor: '#fff',
        bodyColor: '#3c3c3c',
        displayColors: false,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        callbacks: {
          title: () => {
            return '';
          },
          label: (context: TooltipItem<'bar'>) => {
            const data = context.formattedValue;

            return `${data}권`;
          }
        }
      }
    }
  };

  return <Bar className='chart mt_10' data={data} options={options} />;
};

export default ChartBook;
