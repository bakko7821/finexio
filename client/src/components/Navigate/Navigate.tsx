import { NavLink } from "react-router-dom"
import { BrushIcon, CategoryIcon, GraphIcon, HelpIcon, JsonIcon, LogOutIcon, SettingsIcon, TransactionIcon, } from "../../assets/icons"
import '../../styles/navigate.scss'
import { useTheme } from "../../hooks/useTheme"

export const Navigate = () => {

    const handleLogOut = async() => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const [theme, toggleTheme] = useTheme();

    return (
        <nav className="flex-column flex-between">
            <div className="headLinksBox flex-column g8">
                <NavLink to={'/dashboard'}><GraphIcon/> Панель</NavLink>
                <NavLink to={'/categories'}><CategoryIcon/> Категории</NavLink>
                <NavLink to={'/transactions'}><TransactionIcon/> Транзакции</NavLink>
                <button className="logOutButton" onClick={() => handleLogOut()}><LogOutIcon/> Выйти</button>
            </div>
            <div className="bottomLinksBox flex-column g8">
                <button onClick={toggleTheme}><BrushIcon />{theme === "dark" ? "Светлая" : "Тёмная"} тема
                </button>
                <button className="helpButton"><HelpIcon/> Помощь</button>
                <button className="settingsButton"><SettingsIcon/> Настройки</button>
                <button className="jsonButton"><JsonIcon/> Получить .json</button>
            </div>
        </nav>
    )
}