import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CategoryForm } from "./CategoryForm";
import { NewTransactionForm } from "./NewTransactionForm"

export const AddTransactionDropDownMenu = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((s) => s.ui.isAddTransactionOpen);
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