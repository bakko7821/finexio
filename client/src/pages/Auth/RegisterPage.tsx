import { useState } from 'react'
import { FloatingInput } from '../../components/UX-UI/FloatingInput'
import '../../styles/AuthPage.scss'

export const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmitRegisterForm = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(email)
        console.log(`${username}:${password}`)
    }

    return (
        <div className="main_content flex-center register">
            <form className='flex-column g16' onSubmit={handleSubmitRegisterForm}>
                <FloatingInput type={'email'} value={email} name={`email`} content={'Почта'} setValue={setEmail} />
                <FloatingInput type={'text'} value={username} name={`username`} content={'@Имя пользователя'} setValue={setUsername} />
                <FloatingInput type={'password'} value={password} name={`password`} content={'Пароль'} setValue={setPassword} />
                <button type="submit" className="submitButton flex-center rem1">
                    Войти в аккаунт
                </button>
            </form>
        </div>
    )
}