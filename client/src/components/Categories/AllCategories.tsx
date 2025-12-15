import { useEffect, useState } from "react";
import { createCategory, fetchCategories } from "../../store/slices/categoriesSlice";
import { CategoryComponent } from "../Transaction/Category/CategoryComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { DoneIcon } from "../../assets/icons";

interface AllCategoriesProps {
    isCreating: boolean;
    setIsCreating: (value: boolean) => void;
}

export const AllCategories = ({ isCreating, setIsCreating }: AllCategoriesProps) => {
    const [newCategoryValue, setNewCategoryValue] = useState("");
    const [color, setColor] = useState("#ffffffff")

    const dispatch = useAppDispatch();
    const userId = Number(localStorage.getItem("userId"));
    const categories = useAppSelector((s) => s.categories.list);

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
                name: categoryName,
                color
            })
        );

        setNewCategoryValue("");
        setIsCreating(false);
    };

    return (
        <div className="categoriesBox flex g8">
            {categories.map((category) => (
                <CategoryComponent key={category.id} category={category} />
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
                    <input 
                        type="color" 
                        value={color}
                        onChange={(e) => setColor(e.target.value)}/>
                    <button onClick={handleSubmit}><DoneIcon/></button>
                </div>
            )}
        </div>
    )
}
