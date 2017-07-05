var RecurringExpensesSection = React.createClass({

    //
    // recurring_expenses_categories = {this.state.recurring_expenses_categories}
    // recurring_expenses = {this.state.recurring_expenses}
    // deleteFromRecurringExpenses = {this.deleteFromRecurringExpenses()}
    // updateRecurringExpenses = {this.updateRecurringExpenses()}
    // addIntoRecurringExpenses = {this.addIntoRecurringExpenses()}

    renderRecurringExpensesRow(recurring_expense, index){
        return(
            <RecurringExpense
                    key         = {index}
                    array_index = {index}
                    recurring_expense = {recurring_expense}
            />
        )
    },
    arrayRecurringExpensesFilteredByCategoryName(category_name){
        return(
            this.props.recurring_expenses.filter(function(expense){
                return expense.category == category_name
            })
        )
    },
    renderAddRecurringExpensesForm(category, index){
        return(
            <RecurringExpenseForm
                key = {index}
                array_index = {index}
                category = {category}
                addIntoRecurringExpenses = {this.props.addIntoRecurringExpenses}
            />
        )
    },
    renderRecurringExpensesCategory(category, index){
        return(
            <Container key = {index} class_name="setting_category_single">
                <Container class_name = {'settings_category_single_left_container'}>
                    <Container className="category_title">{category.name}</Container>
                </Container>
                <Container class_name = {'settings_category_single_right_container'}>
                    <Container class_name="single_settings_list">{this.arrayRecurringExpensesFilteredByCategoryName(category.name).map(this.renderRecurringExpensesRow)}</Container>
                    <Container class_name="add_setting_form">{this.renderAddRecurringExpensesForm(category, index)}</Container>
                </Container>
            </Container>
        );
    },
    renderRecurringExpensesSection(){
        return(
            <Container class_name = {'recurring_expenses_section'}>
                <Container class_name = {'recurring_expenses_category_list'}>
                    {this.props.recurring_expenses_categories.map(this.renderRecurringExpensesCategory)}
                </Container>
            </Container>
        )
    },
    render: function(){
        console.log('RecurringExpenses Categories');
        console.log(this.props.recurring_expenses_categories);
        console.log('RecurringExpenses ');
        console.log(this.props.recurring_expenses);
        return(
            this.renderRecurringExpensesSection()
        )
    }
});