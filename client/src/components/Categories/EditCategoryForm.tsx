import { useEffect, useState } from "react"
import { TrashIcon } from "../../assets/icons"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateCategory } from "../../store/slices/categoriesSlice";

export const EditCategoryForm = () => {
    const category = useAppSelector(s => s.categories.selectedCategory);
    const dispatch = useAppDispatch()
    const [categoryValue, setCategoryValue] = useState('')
    const [categoryColor, setCategoryColor] = useState('')
    
    useEffect(() => {
        if (category != null) {
            setCategoryValue(category.icon + category.name)
            setCategoryColor(category.color)
        }
    }, [category])
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!category) return;

        const chars = Array.from(categoryValue.trim());
        const categoryIcon = chars[0];
        const categoryName = chars.slice(1).join("").trim();

        dispatch(updateCategory({
            id: category.id,
            icon: categoryIcon,
            name: categoryName,
            color: categoryColor,
        }));
    }

    return <form onSubmit={handleFormSubmit} className="changeCategoryForm flex-column g8">
        <input 
            type="text" 
            className="categoryInput flex"
            name="contentInput"
            value={categoryValue} 
            onChange={(e) => setCategoryValue(e.target.value)}/>
        <label htmlFor="colorInput">Цвет:</label>
        <input 
            type="color"
            className="colorInput"
            name="colorInput"
            value={categoryColor}
            onChange={(e) => setCategoryColor(e.target.value)}
            />
        <div className="buttonsBox flex-center g8">
            <button type="submit" className="saveChangesButton flex-center">Сохранить изменения</button>
            <button type="button" className="deleteButton flex-center"><TrashIcon /></button>
        </div>
    </form>
}