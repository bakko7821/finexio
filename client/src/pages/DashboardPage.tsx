import { useEffect, useState } from 'react'
import { RadarCharts } from '../components/Charts/RadarChart'
import '../styles/DashboardPage.scss'
import axios from 'axios'
import { DoughnutChart, type CategoryItem } from '../components/Charts/DoughnutChart'
import { BarCharts } from '../components/Charts/BarChart'

export const DashboardPage = () => {
    const token = localStorage.getItem("token")
    const userId = Number(localStorage.getItem("userId"))

    const [monthData, setMonthData] = useState<CategoryItem[]>([]);
    const [allMonthData, setAllMonthData] = useState([])

    const today = new Date();
    const currentMonth = today.getMonth() + 1;

    const monthNames = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    const currentMonthName = monthNames[today.getMonth()];

    async function fetchDataOnMonth(monthNumber: number, id: number) {
        const response = await axios.get(`http://localhost:5000/api/transactions/${monthNumber}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log(response.data)
        return response.data
    }
    
    async function fetchDataAllMonth(id: number) {
        const response = await axios.get(`http://localhost:5000/api/transactions/all-value/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log(response.data)
        return response.data
    }

    useEffect(() => {
        (async () => {
            const data = await fetchDataOnMonth(currentMonth, userId)
            setMonthData(data)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const data = await fetchDataAllMonth(userId)
            setAllMonthData(data)
        })()
    }, [])

    return (
        <div className="main_content dashboard flex-column g16">
            <div className="graphicsBox flex g16">
                <div className="chart doughnut flex-column g16">
                    <span className='titleText'>Траты за {currentMonthName}</span>
                    <DoughnutChart data={monthData} />
                </div>
                <div className="chart bar flex-column g16">
                    <span className='titleText'>Траты за прошлые месяцы</span>
                    <BarCharts data={allMonthData} />
                </div>
            </div>
            <div className="lastTransactionsBox">
                <span className='titleText'>Список прошлых транзакций</span>
            </div>
        </div>
    )
}
