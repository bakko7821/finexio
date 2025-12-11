import { useEffect } from 'react'
import { RadarCharts } from '../components/Charts/RadarChart'
import '../styles/DashboardPage.scss'
import axios from 'axios'

export const DashboardPage = () => {
    useEffect (() => {
        const response = axios.get('')
    }, [])
    return (
        <div className="main_content dashboard">
            <RadarCharts />
        </div>
    )
}
