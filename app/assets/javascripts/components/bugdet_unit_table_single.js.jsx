var BudgetUnitTableSingle = React.createClass({
    render:function(){
        return(
            <div
                className="budget_unit_table_single"
                style = {{backgroundColor: this.props.color}}
            >
                {this.props.children}
            </div>
        )
    }
});