var BudgetUnitTableList = React.createClass({


    debtArray: function(){
        return this.props.budget_units.filter(function(budget_unit){
            return budget_unit.in_debt > 0
        });
    },
    debtTotal: function(){
        return this.debtArray().reduce(function(total, value){
            return total + value.in_debt
        }, 0);
    },
    renderDebtsTotal: function(){
        return(
            <Number
                name = 'Total debts'
                className = 'total'
            >{this.debtTotal()}</Number>
        )
    },
    renderDebtsArray: function(){
        return(
            this.debtArray().map(function(debt, index){
                return(
                    <Number
                        name = {debt.name}
                        key = {index}
                        className = 'array'
                    >{debt.in_debt}</Number>
                )
            })
        )
    },
    savingsArray: function(){
        return this.props.budget_units.filter(function(budget_unit){
            return budget_unit.is_savings == true;
        });
    },
    savingsTotal: function(){
        return this.savingsArray().reduce(function(total, current){
            return total + current.in_credit
        }, 0);
    },
    renderSavingsTotal: function(){
        return(
            <Number
                name = 'Total Savings'
                className = 'total'
            >{this.savingsTotal()}</Number>
        )
    },
    renderSavingsArray: function(){
        return(

            this.savingsArray().map(function(savings, index){
                return(
                    <Number
                        name = {savings.name}
                        key = {index}
                        className = 'array'
                    >{savings.in_credit}</Number>
                )
            })
        )
    },
    familyBudgetArray: function(){
        return  this.props.budget_units.filter(function(value){
            return value.is_income == true
        });
    },
    familyBudgetTotal: function(){
        return this.familyBudgetArray().reduce(function(total, value){
            return total + value.in_credit
        }, 0);
    },
    renderFamilyBudgetTotal: function(){
        return(
            <Number
                name = 'Family Budget in May'
                className = 'total'
            >{this.familyBudgetTotal()}</Number>
        )
    },
    otherResources: function(){
        return(
            this.props.paymentMethodsArray.filter(function(value, index){
                return value.is_savings == false && value.is_income == false
            })
        )
    },
    renderOtherResources: function(){
        return(

            this.otherResources().map(function(pay_met, index){
                return(
                    <Number
                        name = {pay_met.name}
                        key = {index}
                        className = 'array'
                    >{pay_met.in_credit}</Number>
                )
            })
        )
    },


    render:function(){


        {/*console.log('RENDER from BudgetUnitTableList');*/}
        {/*console.log('this.debtArray()');*/}
        {/*console.log(this.debtArray());*/}
        {/*console.log('this.debtTotal()');*/}
        // console.log(this.debtTotal());
        // console.log('this.savingsArray()');
        // console.log(this.savingsArray());
        // console.log('this.savingsTotal()');
        // console.log(this.savingsTotal());
        // console.log('this.incomesArray()');
        // console.log(this.state.paymentMethodsArray);
        // console.log('this.incomesTotal()');
        // console.log(this.familyBudgetTotal());
        // console.log();

        return(
            <div className="budget_unit_table_list">
                <BudgetUnitTableSingle key = {1} color = {'#429DD6'}>
                            <BudgetUnitTableTopContainer>
                                {this.renderFamilyBudgetTotal()}
                            </BudgetUnitTableTopContainer>
                            <BudgetUnitTableBottomContainer>{
                                this.renderOtherResources()}
                            </BudgetUnitTableBottomContainer>
                </BudgetUnitTableSingle>

                <BudgetUnitTableSingle key={2} color = {'#1BBC9C'}>
                    <BudgetUnitTableTopContainer>
                        {this.renderSavingsTotal()}
                        </BudgetUnitTableTopContainer>
                    <BudgetUnitTableBottomContainer>
                        {this.renderSavingsArray()}
                        </BudgetUnitTableBottomContainer>
                </BudgetUnitTableSingle>

                <BudgetUnitTableSingle key={3} color = {'#E14A3B'}>
                    <BudgetUnitTableTopContainer>
                        {this.renderDebtsTotal()}
                        </BudgetUnitTableTopContainer>
                    <BudgetUnitTableBottomContainer>
                        {this.renderDebtsArray()}
                        </BudgetUnitTableBottomContainer>
                </BudgetUnitTableSingle>

            </div>
        )
    }

});