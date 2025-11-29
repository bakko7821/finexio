import { useEffect, useRef, useState } from "react";
import type { Transaction } from "../pages/TransactionPage"

export interface TransactionProps {
    transaction: Transaction
}

export const TransactionComponent = ({transaction}: TransactionProps) => {
    const [isOpen, setIsOpen] = useState(false)

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

    return (
        <div ref={transactionRef} className="transaction flex-column g4" key={transaction.id} onClick={() => handleHideMenu()}>
            <div className="transactionContent flex-between">
                <div className="transactionInfo flex g8">
                    {transaction.icon ? (<img src={`http://localhost:5000${transaction.icon}`}/>) : null}
                    <div className="transactionTextInfo flex-column">
                        <span className="nameText">{transaction.name}</span>
                        <span className="categoryText">{transaction.category.name}</span>
                    </div>
                </div>
                <span className={`transactionCount ${countClass}`}>{transaction.count}</span>
            </div>
            {isOpen ? (
                <div className="editTransactionBox">

                </div>
            ) : null}
        </div>
    )
}