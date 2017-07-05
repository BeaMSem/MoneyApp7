var Application = React.createClass({



    getInitialState(){
        return({
            categories: this.props.categories,
            settings: this.props.settings,
            budget_units: this.props.budget_units,
            records: this.props.records,
            appBody: this.props.settings.length == 0 ? 'Budget Settings' : 'Expenses',
            recurring_expenses_categories: this.props.recurring_expenses_categories,
            recurring_expenses: this.props.recurring_expenses,
        })
    },
    addIntoRecurringExpenses(new_expense){
        var recurring_expenses_array = this.state.recurring_expenses;
        recurring_expenses_array.unshift(new_expense);
        this.setState({
            recurring_expenses: recurring_expenses_array
        });
    },
    deleteFromRecurringExpenses(array_index){
        var recurring_expenses_array = this.state.recurring_expenses;
        recurring_expenses_array.splice(array_index, 1);
        this.setState({
            recurring_expenses: recurring_expenses_array
        });
    },
    updateRecurringExpenses(updated_recurring_expense, array_index){
        var recurring_expenses_array = this.state.recurring_expenses;
        recurring_expenses_array[array_index] = updated_recurring_expense;
        this.setState({
            recurring_expenses: recurring_expenses_array
        });
    },
    setAppBodyState(appBody){
        this.setState({
            appBody: appBody
        })
    },
    paymentMethodsArray: function(){
        return this.state.budget_units.filter(function(value){
            return value.is_payment_method == true
        });
    },
    addIntoRecords(new_record){
        var records_array = this.state.records;
        records_array.unshift(new_record);
        this.setState({
            records: records_array
        });
    },
    updateRecords(updated_record, array_index){

        // console.log('recordUpdated');
        // console.log(this.state.records);
        // console.log(updated_record);
        // console.log(array_index);

        console.log('array_index from updateRecords');
        console.log(array_index);

        var records_array = this.state.records;
        records_array[array_index] = updated_record;
        this.setState({
            records: records_array
        });

        // console.log('recordUpdated');
        // console.log(this.state.records);
    },
    deleteFromRecords(array_index){
        var records_array = this.state.records;
        records_array.splice(array_index, 1);
        this.setState({
            records: records_array
        });
    },

    addToSettings(new_setting){
        var  settings = this.state.settings;
        settings.push(new_setting);

        this.setState({
            settings: settings
        });
    },
    updateSettings (updated_setting, setting_id){
        var settings = this.state.settings;
        var array_index = settings.findIndex(function(setting){
            return setting.id == setting_id
        });
        settings[array_index] = updated_setting;
        this.setState({settings: settings});
        console.log('UPDATE SETTINGS');
        console.log('this.state');
        console.log(this.state);
    },
    addToBudgetUnits(new_budget_unit){
        var  budget_units = this.state.budget_units;
        budget_units.push(new_budget_unit);
        this.setState({
            budget_units: budget_units
        });
    },
    updateBudgetUnits(updated_budget_unit, budget_unit_id){
        console.log('UPDATE BUDGET UNITS');
        // console.log('updated_budget_unit');
        // console.log(updated_budget_unit);
        // console.log('budget_unit_index');
        // console.log(budget_unit_index);
        // console.log('END of APPLICATION');
        // var budget_unit = this.state.budget_units.find(function(budget_unit){
        //     return budget_unit.id == budget_unit_id
        // });
        // budget_unit = updated_budget_unit;
        var budget_units = this.state.budget_units;
        var array_index = budget_units.findIndex(function(budget_unit){
            return budget_unit.id == budget_unit_id
        });
        // console.log('updated_budget_unit');
        // console.log(updated_budget_unit);
        // console.log('budget_unit_array_index');
        // console.log(array_index);
        // console.log('budget_unit_id');
        // console.log(budget_unit_id);
        budget_units[array_index] = updated_budget_unit;
        this.setState({budget_units: budget_units});
        console.log('this.state');
        console.log(this.state);
    },
    recalculateBudgetUnit(record){

        var budget_unit_payment_method = this.state.budget_units.find(function(budget_unit){
            return budget_unit.id == record.payment_method_id
        });

        var budget_unit_transfer_into = this.state.budget_units.find(function(budget_unit){
            return budget_unit.id == record.transfer_into_id
        });

        // console.log(record);
        // console.log('budget_unit_payment_method');
        // console.log(budget_unit_payment_method);
        // console.log('budget_unit_transfer_into');
        // console.log(budget_unit_transfer_into);


        if (budget_unit_payment_method === undefined &&  budget_unit_transfer_into === undefined){
            // console.log('income');
            var budget_unit_family_budget = this.state.budget_units.find(function(budget_unit){
                return budget_unit.name == 'Family Income'
            });
            budget_unit_family_budget.in_credit  =  budget_unit_family_budget.in_credit != null  ? budget_unit_family_budget.in_credit += record.amount   : null;
            this.updateBudgetUnits(budget_unit_family_budget, budget_unit_family_budget.id);
        }
        if (budget_unit_payment_method === undefined){
            // console.log('record  null');
            null
        }else{
            // console.log('record not null');
            budget_unit_payment_method.in_credit  =  budget_unit_payment_method.in_credit != null   ? budget_unit_payment_method.in_credit -= record.amount : null;
            // console.log(budget_unit_payment_method.in_credit);
            budget_unit_payment_method.in_debt    =  budget_unit_payment_method.in_debt != null  ? budget_unit_payment_method.in_debt += record.amount     : null;
            // console.log(budget_unit_payment_method.in_debt);
            // console.log('record.payment_method_id');
            // console.log(record.payment_method_id);
            this.updateBudgetUnits(budget_unit_payment_method, budget_unit_payment_method.id);
        }
        if (budget_unit_transfer_into === undefined){
            // console.log('record  null');
            null
        }else{
        // console.log('record not null');
            budget_unit_transfer_into.in_credit  =  budget_unit_transfer_into.in_credit != null  ? budget_unit_transfer_into.in_credit += record.amount   : null;
            budget_unit_transfer_into.in_debt    =  budget_unit_transfer_into.in_debt != null   ? budget_unit_transfer_into.in_debt -= record.amount     : null;
            // console.log('record.transfer_into_id');
            // console.log(record.transfer_into_id);
            this.updateBudgetUnits(budget_unit_transfer_into, budget_unit_transfer_into.id);
        }



    },


    // RENDER METHODS

    renderNavigation(){
        return(
            <ApplicationNavigation
                setAppBodyState = {this.setAppBodyState}
            />
        )
    },
    renderTopComponent(){
        return(
            <BudgetUnitTableList
                budget_units = {this.state.budget_units}
                paymentMethodsArray = {this.paymentMethodsArray()}
            />
        )
    },
    renderSettingsSection(){
        return(
            <SettingsSection
                categories = {this.state.categories}
                settings = {this.state.settings}
                budget_units = {this.state.budget_units}
                addToSettings = {this.addToSettings}
                updateSettings = {this.updateSettings}
                addToBudgetUnits = {this.addToBudgetUnits}
                updateBudgetUnits = {this.updateBudgetUnits}
            />
        )
    },
    renderRecordsSection(){
        return(
            <RecordsSection
                records =               {this.state.records}
                updateRecords =         {this.updateRecords}
                deleteFromRecords =     {this.deleteFromRecords}
                addIntoRecords =        {this.addIntoRecords}
                recalculateBudgetUnit = {this.recalculateBudgetUnit}
                updateBudgetUnits = {this.updateBudgetUnits}
                paymentMethodsArray =   {this.paymentMethodsArray()}
                budget_units =          {this.state.budget_units}
            />
            )
    },
    renderRecurringExpensesSection(){
        return(
            <RecurringExpensesSection
                recurring_expenses_categories = {this.state.recurring_expenses_categories}
                recurring_expenses = {this.state.recurring_expenses}
                deleteFromRecurringExpenses = {this.deleteFromRecurringExpenses}
                updateRecurringExpenses = {this.updateRecurringExpenses}
                addIntoRecurringExpenses = {this.addIntoRecurringExpenses}
            />
        )
    },
    renderAppBody(){
            switch(this.state.appBody){
                case ('Budget Settings'):
                    return(this.renderSettingsSection());
                    break;
                case ('Expenses'):
                    return(this.renderRecordsSection());
                    break;
                case ('Wish List'):
                    return('Wish List');
                    break;
                case ('Stats'):
                    return('Stats');
                    break;
                case ('Recurring Expenses'):
                    return(this.renderRecurringExpensesSection());
                    break;
                default:
                    ''
            }
    },
    render(){
        // console.log('RENDER from APPLICATION');
        // console.log('this.state.categories');
        // console.log(this.state.categories);
        // console.log('this.state.settings');
        // console.log(this.state.settings);
        // console.log('this.state.budget_units');
        // console.log(this.state.budget_units);
        // console.log('this.state.records');
        // console.log(this.state.records);
        // console.log('this.paymentMethodsArray()');
        // console.log(this.paymentMethodsArray());
        // console.log('END of APPLICATION');

        return(
            <div className="money_app">
                <Container class_name="white_section">
                    {this.renderTopComponent()}
                    {this.renderNavigation()}
                </Container>
                <Container class_name="light_grey_section">
                    {this.renderAppBody()}
                </Container>

            </div>
        )
    }

});