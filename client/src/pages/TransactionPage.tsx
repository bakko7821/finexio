import axios from "axios";
import { useEffect, useState } from "react";

export interface Transaction {
    icon: string;
    name: string;
    categoryId: number;
    count: number;
    createdAt: string;
}

export const TransactionPage = () => {
    const userId = Number(localStorage.getItem("userId"));

    const [transactionList, setTransactionList] = useState<Record<string, Transaction[]>>({});

    async function fetchAllTransactions(ownerId: number) {
        if (!ownerId) return;

        const response = await axios.get(`http://localhost:5000/api/transactions/all/${ownerId}`);
        const data = response.data;

        setTransactionList(data);
    }

    useEffect(() => {
        fetchAllTransactions(userId);
    }, []);

    const months = Object.keys(transactionList).sort((a, b) => b.localeCompare(a));

    function formatMonth(key: string) {
        const [year, month] = key.split("-");
        const date = new Date(Number(year), Number(month) - 1);

        return date.toLocaleDateString("ru-RU", {
            month: "long",
            // year: "numeric"
        });
    }

    return (
        <div className="main_content transaction">
            {months.map((month) => (
                <div key={month}>
                    <h2>{formatMonth(month)}</h2>

                    {transactionList[month].map((t, index) => (
                        <div key={index}>
                            <p>{t.name}</p>
                            <p>{t.count}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
