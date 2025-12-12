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

        if (chartRef.current) chartRef.current.destroy();

        chartRef.current = new Chart(canvasRef.current, {
                type: "doughnut",
                data: doughnutData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    cutout: "90%" as any,

                    plugins: {
                        legend: {
                            display: false,
                            labels: {
                                font: {
                                    size: 16,
                                },
                                boxWidth: 20,
                                padding: 8,
                            },
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context: any) {
                                    const item = data[context.dataIndex];
                                    return `${item.icon} ${item.name}: ${item.value} ₽`;
                                }
                            }
                        },
                    }
                } as any,
            });


        return () => {
            if (chartRef.current) chartRef.current.destroy();
        };
    }, [data]);

    return <>
    <div className="doughnutChart" style={{ position: "relative", width: 400, height: 400 }}>
        <canvas ref={canvasRef} />
        
        <div className="categoryBox">
            {data.map((item, i) => (
            <div
                className="item"
                key={item.categoryId}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "start", margin: "2px 0" }}
                onClick={() => {
                    const meta = chartRef.current?.getDatasetMeta(0);
                    if (!meta) return;
                    const arc = meta.data[i] as any;
                    arc.hidden = !arc.hidden;
                    chartRef.current?.update();
                }}
                >
                <span
                    style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    backgroundColor: item.color,
                    marginRight: 6
                    }}
                />
                <span>{item.icon} {item.name}</span>
            </div>
            ))}
        </div>
        </div>
        </>
};
