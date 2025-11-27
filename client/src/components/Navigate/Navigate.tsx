import { NavLink } from "react-router-dom"
import { GraphIcon, HelpIcon, JsonIcon, LogOutIcon, MoneyBagIcon, SettingsIcon, TransactionIcon, UserIcon } from "../../assets/icons"
import '../../styles/navigate.scss'

export const Navigate = () => {

    const handleLogOut = async() => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <nav className="flex-column flex-between">
            <div className="headLinksBox flex-column g8">
                <NavLink to={'/dashboard'}><GraphIcon/> Панель</NavLink>
                <NavLink to={'/account'}><UserIcon/> Аккаунт</NavLink>
                <NavLink to={'/fincance'}><MoneyBagIcon/> Финансы</NavLink>
                <NavLink to={'/transaction'}><TransactionIcon/> Транзакции</NavLink>
                <button className="logOutButton" onClick={() => handleLogOut()}><LogOutIcon/> Выйти</button>
            </div>
            <div className="bottomLinksBox flex-column g8">
                <button className="helpButton"><HelpIcon/> Помощь</button>
                <button className="settingsButton"><SettingsIcon/> Настройки</button>
                <button className="jsonButton"><JsonIcon/> Получить .json</button>
            </div>
        </nav>
    )
}