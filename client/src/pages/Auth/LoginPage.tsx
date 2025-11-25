import { useState } from 'react'
import { FloatingInput } from '../../components/UX-UI/FloatingInput'
import '../../styles/AuthPage.scss'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmitLoginForm = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(`${username}:${password}`)
    }

    return (
        <div className="main_content flex-center login">
            <form className='flex-column g16' onSubmit={handleSubmitLoginForm}>
                <FloatingInput type={'text'} value={username} name={`username`} content={'@Имя пользователя'} setValue={setUsername} />
                <FloatingInput type={'password'} value={password} name={`password`} content={'Пароль'} setValue={setPassword} />
                <button type="submit" className="submitButton flex-center rem1">
                    Войти в аккаунт
                </button>
            </form>
        </div>
    )
}