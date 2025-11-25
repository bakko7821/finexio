import { Outlet } from "react-router-dom";
import { Navigate } from "../Navigate/Navigate";
import useAuthGuard from "../../hooks/useAuthGuard";

export default function MainLayout() {
    useAuthGuard()
    
    return (
        <>
            <Navigate />
            <main>
                <Outlet />
            </main>
        </>
    )
}