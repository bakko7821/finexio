import { useEffect, useState } from "react";
import "../styles/TransactionPage.scss"
import { AddIcon } from "../assets/icons";
import { TransactionComponent } from "../components/Transaction/TransactionComponent";
import { AddTransactionDropDownMenu } from "../components/Transaction/AddTransactionMenu/AddTransactionDropDownMenu";
import { fetchTransactions } from "../store/slices/transactionSlice";
import { toggleAddTransaction } from "../store/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import axios from "axios";

export interface Transaction {
    [x: string]: any;
    id: number
    name: string;
    categoryId: number;
    category: Category;
    count: number;
    createdAt: string;
}

export interface Category {
    id: number;
    name: string;
    icon: string;
    color: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    balance: number;
}

export const TransactionPage = () => {
    const userId = Number(localStorage.getItem('userId'))
    const [user, setUser] = useState<User | null>(null)
    const dispatch = useAppDispatch();
    const isOpenAddMenu = useAppSelector((s) => s.ui.isAddTransactionOpen);

    useEffect(() => {
        dispatch(fetchTransactions(userId));
    }, []);

    useEffect(() => {
        fetchUser(userId)
    }, [])

    const fetchUser = async(id: number) => {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);

        setUser(response.data)
    }

    const transactionsByMonth = useAppSelector((s) => s.transactions.byMonth);
    const months = Object.keys(transactionsByMonth).sort((a, b) => b.localeCompare(a));

    function formatMonth(key: string) {
        const [year, month] = key.split("-");
        const date = new Date(Number(year), Number(month) - 1);

        return date.toLocaleDateString("ru-RU", {
            month: "long",
        });
    }

    return (
        <div className="main_content transactions flex-column g16">
            <button className="addTransactionButton flex-center" onClick={() => dispatch(toggleAddTransaction())}><AddIcon/></button>
            <div className="titleTextBox flex-between">
                <span className="titleText rem1_5">История прошлых транзакций</span>
                <span className="balance rem1_5">Баланс: <span className="value rem1_5">{user?.balance} ₽</span></span>
            </div>
            {months.length > 0 ? (
                <div className="allTransactionsList flex-column g12">
                    {months.map((month) => (
                        <div className="monthTransactionList flex-column g8" key={month}>
                            <div className="mounthNameBox flex-center g16">
                                <span className="plug"></span>
                                <span className="monthName">{formatMonth(month)}</span>
                                <span className="plug"></span>
                            </div>
                            {transactionsByMonth[month].map((transaction: Transaction) => (
                                <TransactionComponent key={transaction.id} transaction={transaction} />
                            ))}
                        </div>
                    ))}
                </div>
            ) : (<span className="nullMessage rem1">У вас отсутствуют транзакций</span>)}
            {isOpenAddMenu ? (
                <AddTransactionDropDownMenu />
            ) : null}
        </div>
    );
};
