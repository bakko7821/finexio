import { useEffect, useRef, useState } from "react"
import { AddIcon2, CrossIcon } from "../../../assets/icons"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { openCategoryMenu, resetTempTransactionForm, setTempTransactionField, toggleAddTransaction } from "../../../store/slices/uiSlice"
import { CategoryComponent } from "../Category/CategoryComponent"
import { fetchTransactions, postTransaction } from "../../../store/slices/transactionSlice"

export const NewTransactionForm = () => {
    const userId = Number(localStorage.getItem("userId"))
    const temp = useAppSelector(s => s.ui.tempTransactionForm);
    const [name, setName] = useState(temp.name);
    const [count, setCount] = useState(temp.count);

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((s) => s.ui.isAddTransactionOpen);
    const selectedCategory = useAppSelector(s => s.categories.selectedCategory);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(resetTempTransactionForm());

        if (!name.trim()) {
            console.log("Название не указано");
            return;
        }

        if (!selectedCategory) {
            console.log("Категория не выбрана");
            return;
        }

        if (!count ) {
            console.log("Неверная сумма");
            return;
        }

        dispatch(postTransaction({
            ownerId: userId,
            name,
            categoryId: selectedCategory.id,
            count: Number(count)
        })).then(() => {
            dispatch(fetchTransactions(userId));
        });

        dispatch(toggleAddTransaction());

        setName("");
        setCount("");
    };


    return <form ref={transactionFormRef} onSubmit={handleSubmit} className="newTransactionForm flex-column g8">
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
                onChange={(e) => {
                    setName(e.target.value);
                    dispatch(setTempTransactionField({ field: "name", value: e.target.value }));
                }} />
        </div>
        <div className="categoryBox flex-column g4">
            <div className="categoryHeader flex-between">
                <label htmlFor="category" className="rem1">Название предприятия</label>
                <button type="button" className="setCategoryButton" onClick={() => dispatch(openCategoryMenu())}><AddIcon2 /></button>
            </div>
            <div className="chooseCategory flex">
                {selectedCategory ? (
                    <CategoryComponent category={selectedCategory} />
                ) : (
                    <span className="placeholder rem1">
                        Категория не выбрана
                    </span>
                )}
            </div>
        </div>
        <div className="countBox flex-column g4">
            <label htmlFor="count" className="rem1">Сумма</label>
            <input 
                type="text"
                placeholder="100 ₽"
                className="countInput rem1"
                name="count"
                id="count"
                value={count}
                onChange={(e) => {
                    setCount(e.target.value);
                    dispatch(setTempTransactionField({ field: "count", value: e.target.value }));
                }}/>
            <label htmlFor="count" className="descrptionLabel rem0_875">Используйте "-" в начале если хотите добавить расходы.</label>
        </div>
        <div className="buttonsBox flex g8">
            <button type="submit" className="addNewTransactionButton rem1">Добавить</button>
            <button type="button" className="cancelButton rem1" onClick={() => dispatch(toggleAddTransaction())}>Отмена</button>
        </div>
    </form>
}