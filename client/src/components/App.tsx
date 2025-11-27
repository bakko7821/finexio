import { Route, Routes } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import MainLayout from "./layouts/MainLayout"
import { DashboardPage } from "../pages/DashboardPage"
import { AccountPage } from "../pages/AccountPage"
import { TransactionPage } from "../pages/TransactionPage"
import { LoginPage } from "../pages/Auth/LoginPage"
import { RegisterPage } from "../pages/Auth/RegisterPage"

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Route>
    </Routes>
  )
}

export default App
