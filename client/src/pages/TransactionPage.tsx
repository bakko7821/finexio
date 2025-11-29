import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/TransactionPage.scss"
import { AddIcon } from "../assets/icons";
import { TransactionComponent } from "../components/TransactionComponent";

export interface Transaction {
    id: number
    icon: string;
    name: string;
    categoryId: number;
    category: Category;
    count: number;
    createdAt: string;
}

export interface Category {
    id: number;
    name: string;
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
        });
    }

    return (
        // <div className="main_content transaction">
        //     
        // </div>
        <div className="main_content transactions flex-column g16">
            <button className="addTransactionButton flex-center"><AddIcon/></button>
            <span className="titleText">История прошлых транзакций</span>
            <div className="allTransactionsList flex-column g12">
                {months.map((month) => (
                    <div className="monthTransactionList flex-column g8" key={month}>
                        <span className="monthName">{formatMonth(month)}</span>
                        {transactionList[month].map((transaction) => (
                            <TransactionComponent transaction={transaction} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
