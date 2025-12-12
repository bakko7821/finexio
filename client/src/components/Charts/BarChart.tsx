import { Chart, type ChartData } from "chart.js/auto";
import { useEffect, useRef } from "react";

type MonthData = {
    month: string;
    value: number;
};

type BarChartsProps = {
    data: MonthData[];
};

export const BarCharts = ({ data }: BarChartsProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (!data || data.length === 0) return;

        const labels = data.map(item => item.month);
        const values = data.map(item => item.value);

        const chartData: ChartData<"bar"> = {
            labels,
            datasets: [{
                label: "Расходы",
                data: values,
                backgroundColor: "rgba(106, 168, 249, 0.3)", // синий
                borderColor: "rgba(106, 168, 249, 1)",
                borderWidth: 2,
                borderRadius: 6, // скруглённые столбцы
            }],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false, // канвас будет растягиваться под родительский блок
            plugins: {
                legend: { 
                    display: false,
                    labels: {
                        font: {
                            size: 16 // размер шрифта легенды
                        }
                    }
                },
                tooltip: {
                    titleFont: { size: 16 },
                    bodyFont: { size: 16 },

                    callbacks: {
                        label: (context: any) => ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()} ₽`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { 
                        autoSkip: false, 
                        font: {
                            size: 16 
                        }
                    },
                    barPercentage: 1.0,
                    categoryPercentage: 1.0,
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: { 
                            size: 16 
                        },
                        callback: (value: any) => `${value.toLocaleString()} ₽`
                    }
                }
            }
        };

        if (chartRef.current) chartRef.current.destroy();

        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: chartData,
            options: options,
        });

        return () => {
            if (chartRef.current) chartRef.current.destroy();
        };
    }, [data]);

    return <canvas ref={canvasRef} className="barCharts" />;
};
