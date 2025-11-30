import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CategoryComponent } from "../Category/CategoryComponent";
import type { Category } from "../../../pages/TransactionPage";
import { BackIcon, CrossIcon } from "../../../assets/icons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeCategoryMenu, toggleAddTransaction } from "../../../store/slices/uiSlice";

export const CategoryForm = () => {
    const dispatch = useAppDispatch();
    const userId = Number(localStorage.getItem("userId"))
    const [categoriesList, setCategoriesList] = useState<Category[]>([])
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

    async function fetchAllCategories(ownerId: number) {
        if (!ownerId) return;

        const response = await axios.get(`http://localhost:5000/api/categories/all/${ownerId}`);
        const data = response.data;

        setCategoriesList(data);
    }

    useEffect(() => {
        fetchAllCategories(userId);
    }, []);

    return <form ref={transactionFormRef} className="categoryForm">
        <div className="formHeader flex-between">
            <button className="backButton" type="button" onClick={() => dispatch(closeCategoryMenu())}><BackIcon/></button>
            <span className="titleText">Категория</span>
            <button className="closeButton" type="button" onClick={() => dispatch(toggleAddTransaction())}><CrossIcon/></button>
        </div>
        <label htmlFor="" className="myCategoriesText rem1">Мои категории</label>
        <div className="categoryList">
            {categoriesList.map((category) => (
                <CategoryComponent category={category} />
            ))}
        </div>
    </form>
}