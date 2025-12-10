import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeCategoryMenu, toggleAddTransaction } from "../../../store/slices/uiSlice";
import { CategoryComponent } from "../Category/CategoryComponent";
import { AddIcon, BackIcon, CrossIcon, DoneIcon } from "../../../assets/icons";
import { createCategory, fetchCategories } from "../../../store/slices/categoriesSlice";

export const CategoryForm = () => {
    const dispatch = useAppDispatch();
    const userId = Number(localStorage.getItem("userId"));
    const categories = useAppSelector((s) => s.categories.list);

    const [isCreating, setIsCreate] = useState(false);
    const [newCategoryValue, setNewCategoryValue] = useState("");

    const isOpen = useAppSelector((s) => s.ui.isAddTransactionOpen);
    const transactionFormRef = useRef<HTMLFormElement | null>(null);
 
    useEffect(() => {
        dispatch(fetchCategories(userId));
    }, [userId]);

    const handleSubmit = () => {
        const chars = Array.from(newCategoryValue.trim());
        const categoryIcon = chars[0];
        const categoryName = chars.slice(1).join("").trim();

        dispatch(
            createCategory({
                ownerId: userId,
                icon: categoryIcon,
                name: categoryName
            })
        );

        setNewCategoryValue("");
        setIsCreate(false);
    };

    return (
        <form ref={transactionFormRef} className="categoryForm flex-column g8">
            <div className="formHeader flex-between">
                <button type="button" onClick={() => dispatch(closeCategoryMenu())}><BackIcon/></button>
                <span className="titleText rem1">Категория</span>
                <button type="button" onClick={() => dispatch(toggleAddTransaction())}><CrossIcon/></button>
            </div>

            <label className="myCategoriesText rem1">Мои категории</label>

            <div className="categoryList flex g8">
                {categories.map((category) => (
                    <CategoryComponent category={category} key={category.id}/>
                ))}

                {isCreating && (
                    <div className="createNewCategoryInput flex-center g4">
                        <input
                            className="newCategoryInput"
                            value={newCategoryValue}
                            onChange={(e) => setNewCategoryValue(e.target.value)}
                            type="text"
                            placeholder="Новая категория"
                        />
                        <button onClick={handleSubmit}><DoneIcon/></button>
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={() => setIsCreate(true)}
                className="createCategoryButton flex-center g8 rem1"
            >
                <AddIcon /> Создать новую
            </button>
        </form>
    );
};
