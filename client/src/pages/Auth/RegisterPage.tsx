import { useState } from 'react'
import { FloatingInput } from '../../components/UX-UI/FloatingInput'
import '../../styles/AuthPage.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmitRegisterForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                email,
                username,
                password
            });

            // ДОБАВИТЬ ВЫВОД УВЕДОМЛЕНИЯ
            console.log("Успех:", res.data);

        } catch (err: any) {
            console.log("Ошибка запроса:", err.response?.data || err.message);
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username,
                password
            });

            // ДОБАВИТЬ ВЫВОД УВЕДОМЛЕНИЯ
            console.log("Успех:", res.data);
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userId", res.data.user.id)

            navigate('/dashboard')

        } catch (err: any) {
            console.log("Ошибка авторизации:", err.response?.data);
        }
    }

    return (
        <div className="main_content flex-center register">
            <form className='flex-column flex-center g16' onSubmit={handleSubmitRegisterForm}>
                <span className='headerText rem2'>Регистрация</span>
                <FloatingInput type={'email'} value={email} name={`email`} content={'Почта'} setValue={setEmail} />
                <FloatingInput type={'text'} value={username} name={`username`} content={'@Имя пользователя'} setValue={setUsername} />
                <FloatingInput type={'password'} value={password} name={`password`} content={'Пароль'} setValue={setPassword} />
                <div className="linksBox flex-between g16">
                    <Link to={"/auth/login"}>Уже есть аккаунт</Link>
                </div>
                <button type="submit" className="submitButton flex-center rem1">
                    Создать аккаунт
                </button>
            </form>
        </div>
    )
}