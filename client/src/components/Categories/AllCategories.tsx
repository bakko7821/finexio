import { useEffect } from "react"
import { fetchCategories } from "../../store/slices/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CategoryComponent } from "../Transaction/Category/CategoryComponent";

export const AllCategories = () => {
    const dispatch = useAppDispatch();
    const userId = Number(localStorage.getItem("userId"));
    const categories = useAppSelector((s) => s.categories.list);

    useEffect(() => {
        dispatch(fetchCategories(userId));
    }, [userId]);

    return (
        <div className="categoriesBox flex g8">
            {categories.map((category) => (
                <CategoryComponent key={category.id} category={category} />
            ))}
        </div>
    )
}