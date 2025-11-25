import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.clear();
      navigate("/auth/login");
      return;
    }

    const checkToken = async () => {
      try {
        const res = await fetch("/api/auth/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.clear();
          navigate("/auth/login");
        }
      } catch {
        localStorage.clear();
        navigate("/auth/login");
      }
    };

    checkToken();
  }, [navigate]);
}