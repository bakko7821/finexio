import { useState } from 'react'
import { FloatingInput } from '../../components/UX-UI/FloatingInput'
import '../../styles/AuthPage.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmitLoginForm = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username,
                password
            });

            // ДОБАВИТЬ ВЫВОД УВЕДОМЛЕНИЯ
            console.log("Успех:", res.data);
            localStorage.setItem("token", res.data.token)
            
            navigate('/dashboard')

        } catch (err: any) {
            console.log("Ошибка авторизации:", err.response?.data);
        }
    }

    return (
        <div className="main_content flex-center login">
            <form className='flex-column flex-center g16' onSubmit={handleSubmitLoginForm}>
                <span className='headerText rem2'>Авторизация</span>
                <FloatingInput type={'text'} value={username} name={`username`} content={'@Имя пользователя'} setValue={setUsername} />
                <FloatingInput type={'password'} value={password} name={`password`} content={'Пароль'} setValue={setPassword} />
                <div className="linksBox flex-between g16">
                    <Link to={"/auth/recovery"}>Забыли пароль?</Link>
                    <Link to={"/auth/register"}>Регистрация</Link>
                </div>
                <button type="submit" className="submitButton flex-center rem1">
                    Войти в аккаунт
                </button>
            </form>
        </div>
    )
}