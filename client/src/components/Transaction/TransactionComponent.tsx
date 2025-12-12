import { useEffect, useRef, useState } from "react";
import '../../styles/TransactionsComponent.scss'
import type { Transaction } from "../../pages/TransactionPage"
import { deleteTransaction, fetchTransactions } from "../../store/slices/transactionSlice";
import { useAppDispatch } from "../../store/hooks";

export interface TransactionProps {
    transaction: Transaction
}

export const TransactionComponent = ({transaction}: TransactionProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [categoryColor, setCategoryColor] = useState('')
    const dispatch = useAppDispatch();

    const countClass = transaction.count > 0 ? "positive"
    : transaction.count < 0 ? "negative"
    : "";

    const transactionRef = useRef<HTMLDivElement | null>(null);

    const handleHideMenu = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (transactionRef.current && !transactionRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleDelete = async () => {
        const ownerId = Number(localStorage.getItem("userId"));

        await dispatch(deleteTransaction({ id: transaction.id}))
            .then(() => {
                dispatch(fetchTransactions(ownerId));
            });

    };

    function hexToRgb(hex: string) {
        if (!hex) return "0, 0, 0";
        const stripped = hex.replace("#", "");

        const bigint = parseInt(stripped, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `${r}, ${g}, ${b}`;
    }

    useEffect(() => {
        if (!transaction.category?.color) return;

        setCategoryColor(hexToRgb(transaction.category.color))
    }, [transaction])

    return (
        <div ref={transactionRef} className="transaction flex-column g4" key={transaction.id} onClick={() => handleHideMenu()}>
            <div 
                className="transactionContent flex-between"
                style={{
                    boxShadow: `0px 0px 10px 1px rgba(${categoryColor}, 0.3) inset`,
                }}>
                <div 
                className="transactionInfo flex g8">
                    {transaction.category.icon ? (<span className="transactionIcon rem2">{transaction.category.icon}</span>) : null}
                    <div className="transactionTextInfo flex-column">
                        <span className="nameText rem1">{transaction.name}</span>
                        <span className="categoryText rem0_875">{transaction.category.name}</span>
                    </div>
                </div>
                <span className={`transactionCount rem1 ${countClass}`}>{transaction.count} ₽</span>
            </div>
            {isOpen ? (
                <div className="editTransactionBox flex g8">
                    <button className="editTransactionButton flex-center rem0_875">Изменить</button>
                    <span className="circle"></span>
                    <button
                        className="deleteTransactionButton flex-center rem0_875"
                        onClick={(e) => {
                            e.stopPropagation(); // чтобы не закрывало меню
                            handleDelete();
                        }}
                    >
                        Удалить
                    </button>
                </div>
            ) : null}
        </div>
    )
}