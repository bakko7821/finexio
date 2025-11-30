import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CategoryComponent } from "../Category/CategoryComponent";
import type { Category } from "../../../pages/TransactionPage";
import { AddIcon, BackIcon, CrossIcon, DoneIcon } from "../../../assets/icons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeCategoryMenu, toggleAddTransaction } from "../../../store/slices/uiSlice";

export const CategoryForm = () => {
    const dispatch = useAppDispatch();
    const userId = Number(localStorage.getItem("userId"))
    const [categoriesList, setCategoriesList] = useState<Category[]>([])
    const isOpen = useAppSelector((s) => s.ui.isAddTransactionOpen);
    const [isCreating, setIsCreate] = useState(false)
    const [newCategoryValue, setNewCategoryValue] = useState("")

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

    async function putNewCategory(ownerId: number, categoryIcon: string, categoryName: string) {
        if (!ownerId || !categoryIcon || !categoryName) return;

        const response = await axios.post(`http://localhost:5000/api/categories/add`, {
            ownerId,
            icon: categoryIcon,
            name: categoryName
        })
    }

    const handleCreateCategory = () => {
        setIsCreate(true)
    }
    
    const handleSumbitChanges = async () => {
        setIsCreate(false)

        const chars = Array.from(newCategoryValue.trim());
        const categoryIcon = chars[0];
        const categoryName = chars.slice(1).join("").trim();

        await putNewCategory(userId, categoryIcon, categoryName);

        fetchAllCategories(userId);

        setNewCategoryValue("");
    };


    useEffect(() => {
        fetchAllCategories(userId);
    }, [userId]);

    return <form ref={transactionFormRef} className="categoryForm flex-column g8">
        <div className="formHeader flex-between">
            <button className="backButton" type="button" onClick={() => dispatch(closeCategoryMenu())}><BackIcon/></button>
            <span className="titleText rem1">Категория</span>
            <button className="closeButton" type="button" onClick={() => dispatch(toggleAddTransaction())}><CrossIcon/></button>
        </div>
        <label htmlFor="" className="myCategoriesText rem1">Мои категории</label>
        <div className="categoryList">
            {categoriesList.map((category) => (
                <CategoryComponent category={category} />
            ))}
            {isCreating ? (
                <>
                <div className="createNewCategoryInput">
                    <input 
                        className="newCategoryInput" 
                        value={newCategoryValue}
                        onChange={(e) => setNewCategoryValue(e.target.value)}
                        type="text" 
                        placeholder="Новая категория"/>
                    <button className="saveNewCategoryButton" onClick={() => handleSumbitChanges()}><DoneIcon/></button>
                </div>
                </>) : null}
        </div>
        <button 
            type="button" 
            onClick={() => handleCreateCategory()}
            className="createCategoryButton flex-center g8 rem1"><AddIcon/> Создать новую</button>
    </form>
}