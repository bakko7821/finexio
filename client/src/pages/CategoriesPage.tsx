import { AllCategories } from "../components/Categories/AllCategories"
import { EditCategoryForm } from "../components/Categories/EditCategoryForm";
import { CategoryComponent } from "../components/Transaction/Category/CategoryComponent"
import { useAppSelector } from "../store/hooks";
import '../styles/CategoriesPage.scss'

export const CategoriesPage = () => {
    const selected = useAppSelector(s => s.categories.selectedCategory);

    return (
        <div className="main_content categories flex g16">
            <div className="allCategoriesBox flex-column g16">
                <span className="titleText rem1_5">Мои категории</span>
                <AllCategories />
            </div>
            {selected !== null
            ? <div className="editCategoryForm flex-column g16">
                <span className="titleText rem1_5">Изменение категории</span>
                <EditCategoryForm />
            </div>
            : null}
        </div>
    )
}