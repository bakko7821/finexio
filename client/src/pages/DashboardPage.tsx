import { useEffect, useState } from 'react'
import { RadarCharts } from '../components/Charts/RadarChart'
import '../styles/DashboardPage.scss'
import axios from 'axios'
import { DoughnutChart, type CategoryItem } from '../components/Charts/DoughnutChart'

export const DashboardPage = () => {
    const token = localStorage.getItem("token")
    const userId = Number(localStorage.getItem("userId"))

    const [monthData, setMonthData] = useState<CategoryItem[]>([]);

    async function fetchDataOnMonth(monthNumber: number, id: number) {
        const response = await axios.get(`http://localhost:5000/api/transactions/now-month/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data
    }

    useEffect(() => {
        (async () => {
            const data = await fetchDataOnMonth(12, userId)
            setMonthData(data)
        })()
    }, [])

    return (
        <div className="main_content dashboard">
            <DoughnutChart data={monthData} />
        </div>
    )
}
