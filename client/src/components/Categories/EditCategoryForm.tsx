import { useEffect, useState } from "react"
import type { CategoryComponentProps } from "../Transaction/Category/CategoryComponent"
import { TrashIcon } from "../../assets/icons"
import { useAppSelector } from "../../store/hooks";

export const EditCategoryForm = () => {
    const category = useAppSelector(s => s.categories.selectedCategory);
    const [categoryValue, setCategoryValue] = useState('')
    
    useEffect(() => {
        if (category != null) {
            setCategoryValue(category.icon + category.name)
        }
    })
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return <form onSubmit={handleFormSubmit} className="changeCategoryForm flex-column g8">
        <span className="titleText">Изменение категории</span>
        <input 
            type="text" 
            className="categoryInput flex"
            value={categoryValue} 
            onChange={(e) => setCategoryValue(e.target.value)}/>
        <div className="buttonsBox flex-center g8">
            <button type="submit" className="saveChangesButton flex-center">Сохранить изменения</button>
            <button type="button" className="deleteButton flex-center"><TrashIcon /></button>
        </div>
    </form>
}