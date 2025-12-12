import { Chart, type ChartData } from "chart.js/auto";
import { useEffect, useRef } from "react";

export type CategoryItem = {
    categoryId: number;
    color: string;
    name: string;
    icon: string;
    value: number;
};

type DoughnutChartProps = {
    data: CategoryItem[];
};

export const DoughnutChart = ({ data }: DoughnutChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (!data || data.length === 0) return;

        // labels = имена категорий
        const labels = data.map((item) => item.name);

        // values = абсолютные значения расходов
        const values = data.map((item) => Math.abs(item.value));

        // colors = массив hex цветов
        const colors = data.map((item) => item.color);

        const doughnutData: ChartData<"doughnut"> = {
            labels,
            datasets: [{
                label: "Расходы",
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 2,
                
            } as any ],
        };

        const centerTextPlugin = {
            id: "centerTextPlugin",
            beforeDraw(chart: any) {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.font = "16px sans-serif";
                ctx.textAlign = "center";
                ctx.fillStyle = "#fff";

                const sum = values.reduce((a, b) => a + b, 0);
                ctx.fillText(`-${sum} ₽`, width / 2, height / 2);
            }
        };

        if (chartRef.current) chartRef.current.destroy();

        chartRef.current = new Chart(canvasRef.current, {
                type: "doughnut",
                data: doughnutData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    cutout: "80%" as any,

                    plugins: {
                        legend: {
                            labels: {
                                font: { size: 14 },
                            },
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context: any) {
                                    const item = data[context.dataIndex];
                                    return `${item.icon} ${item.name}: ${item.value} ₽`;
                                }
                            }
                        }
                    }
                } as any,
                plugins: [centerTextPlugin]
            });


        return () => {
            if (chartRef.current) chartRef.current.destroy();
        };
    }, [data]);

    return <canvas ref={canvasRef} className="doughnutChart" />;
};
