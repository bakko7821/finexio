import axios from "axios";
import { Chart, type ChartData } from "chart.js/auto";
import { useEffect, useRef } from "react";

export const RadarCharts = () => {
    const userId = Number(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const fetchAndRenderChart = async () => {
            if (!canvasRef.current) return;

            try {
                const response = await axios.get(`http://localhost:5000/api/transactions/last-and-now/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const { thisMonth, lastMonth } = response.data;

                const categoriesSet = new Set<string>();
                [...thisMonth, ...lastMonth].forEach((c: any) => categoriesSet.add(`${c.icon} ${c.name}`));
                const labels = Array.from(categoriesSet);

                const thisMonthData = labels.map(label => {
                    const found = thisMonth.find((c: any) => `${c.icon} ${c.name}` === label);
                    return found ? Math.abs(found.value) : 0;
                });

                const lastMonthData = labels.map(label => {
                    const found = lastMonth.find((c: any) => `${c.icon} ${c.name}` === label);
                    return found ? Math.abs(found.value) : 0;
                });

                const radarData: ChartData = {
                    labels,
                    datasets: [
                        {
                            label: "Расходы текущего месяца",
                            data: thisMonthData,
                            fill: true,
                            backgroundColor: "rgba(255, 99, 132, 0.2)", // красный
                            borderColor: "rgb(255, 99, 132)"
                        },
                        {
                            label: "Расходы прошлого месяца",
                            data: lastMonthData,
                            fill: true,
                            backgroundColor: "rgba(54, 162, 235, 0.2)", // синий
                            borderColor: "rgb(54, 162, 235)"
                        }
                    ]
                };

                if (chartRef.current) chartRef.current.destroy();
                chartRef.current = new Chart(canvasRef.current, {
                    type: "radar",
                    data: radarData,
                    options: {
                        plugins: {
                            legend: {
                                labels: {
                                    font: {
                                        size: 16,
                                    }
                                }
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                angleLines: {
                                    display: true,       // линии от центра к вершинам
                                    color: "rgba(255, 255, 255, 0.1)" // цвет этих линий
                                },
                                grid: {
                                    circular: true,      // делает круги, а не квадраты
                                    color: "rgba(255, 255, 255, 0.05)", // цвет паутинки
                                    lineWidth: 1         // толщина линий
                                },
                                pointLabels: {
                                    font: {
                                        size: 16,
                                    }
                                },
                                ticks: {
                                    display: false
                                }
                            }
                        },
                        elements: { 
                            line: { 
                                borderWidth: 3 
                            } 
                        }
                    }
                });

            } catch (err) {
                console.error("Ошибка загрузки данных для графика:", err);
            }
        };

        fetchAndRenderChart();
    }, [userId, token]);

    return <canvas ref={canvasRef} className="radarChart"/>;
};

