import { useEffect, useState } from 'react'
import '../styles/DashboardPage.scss'
import axios from 'axios'
import { DoughnutChart, type CategoryItem } from '../components/Charts/DoughnutChart'
import { BarCharts } from '../components/Charts/BarChart'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { TransactionComponent } from '../components/Transaction/TransactionComponent'
import type { Transaction } from './TransactionPage'
import { fetchTransactions } from '../store/slices/transactionSlice'

export const DashboardPage = () => {
    const token = localStorage.getItem("token")
    const userId = Number(localStorage.getItem("userId"))
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        dispatch(fetchTransactions(userId));
    }, []);

    const transactionsByMonth = useAppSelector((s) => s.transactions.byMonth);
    const months = Object.keys(transactionsByMonth).sort((a, b) => b.localeCompare(a));

    return (
        <div className="main_content dashboard flex-column g16">
            <div className="graphicsBox flex g16">
                <div className="chart doughnut flex-column g16">
                    <span className='titleText'>Траты за {currentMonthName}</span>
                    <DoughnutChart data={monthData} />
                </div>
                <div className="chart bar flex-column g16">
                    <span className='titleText'>Траты за всё время</span>
                    <BarCharts data={allMonthData} />
                </div>
            </div>
            <div className="lastTransactionsBox flex-column g16">
                <span className='titleText'>Список последних транзакций</span>
                {months.length > 0 ? (
                    <div className="allTransactionsList flex-column g12">
                        {transactionsByMonth[months[0]]
                            .slice(0, 5) // берем только первые 5 транзакций
                            .map((transaction: Transaction) => (
                            <TransactionComponent key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                ) : (
                    <span className="nullMessage rem1">У вас отсутствуют транзакций</span>
                )}

            </div>
        </div>
    )
}
