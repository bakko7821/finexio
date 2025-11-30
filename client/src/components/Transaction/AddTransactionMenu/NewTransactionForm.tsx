import { useEffect, useRef, useState } from "react"
import { AddIcon2, CrossIcon } from "../../../assets/icons"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { openCategoryMenu, toggleAddTransaction } from "../../../store/slices/uiSlice"

export const NewTransactionForm = () => {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [count, setCount] = useState("")

    const dispatch = useAppDispatch();
    const transactions = useAppSelector((s) => s.transactions.byMonth);
    const isOpenAddMenu = useAppSelector((s) => s.ui.isAddTransactionOpen);
    const isOpen = useAppSelector((s) => s.ui.isAddTransactionOpen);

    const transactionFormRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isOpen &&
                transactionFormRef.current &&
                !transactionFormRef.current.contains(e.target as Node)
            ) {
                dispatch(toggleAddTransaction());
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, dispatch]);

    return <form ref={transactionFormRef} className="newTransactionForm flex-column g8">
        <div className="formHeader flex-between">   
                <span className="titleText rem1">Новая транзакция</span>
                <button className="closeButton" type="button" onClick={() => dispatch(toggleAddTransaction())}><CrossIcon/></button>
            </div>
        <div className="nameBox flex-column g4">
            <label htmlFor="name" className="rem1">Название предприятия</label>
            <input 
                type="text"
                placeholder="Магнит"
                className="nameInput rem1"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="categoryBox flex-column g4">
            <div className="categoryHeader flex-between">
                <label htmlFor="category" className="rem1">Название предприятия</label>
                <button type="button" className="setCategoryButton" onClick={() => dispatch(openCategoryMenu())}><AddIcon2 /></button>
            </div>
            <div className="chooseCategory">

            </div>
        </div>
        <div className="countBox flex-column g4">
            <label htmlFor="count" className="rem1">Сумма</label>
            <input 
                type="number"
                placeholder="100 ₽"
                className="countInput rem1"
                name="count"
                id="count"
                value={count}
                onChange={(e) => setCount(e.target.value)} />
        </div>
        <div className="buttonsBox flex g8">
            <button type="submit" className="addNewTransactionButton rem1">Добавить</button>
            <button type="button" className="cancelButton rem1" onClick={() => dispatch(toggleAddTransaction())}>Отмена</button>
        </div>
    </form>
}