import { useAppSelector } from "../../../store/hooks";
import { CategoryForm } from "./CategoryForm";
import { NewTransactionForm } from "./NewTransactionForm"

export const AddTransactionDropDownMenu = () => {
    const isCategoryMenuOpen = useAppSelector((s) => s.ui.isCategoryMenuOpen);
    const isAddMenuOpen = useAppSelector((s) => s.ui.isAddTransactionOpen);

    return (
        <div className="addTransactionMenu flex-center">
            {isAddMenuOpen && (
                isCategoryMenuOpen 
                    ? <CategoryForm /> 
                    : <NewTransactionForm />
            )}
        </div>
    )
}