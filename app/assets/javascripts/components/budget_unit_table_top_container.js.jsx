var BudgetUnitTableTopContainer = React.createClass({
    render:function(){
        return(
            <Container class_name="budget_unit_table_top_container">
                {this.props.children}
            </Container>
        )
    }
});