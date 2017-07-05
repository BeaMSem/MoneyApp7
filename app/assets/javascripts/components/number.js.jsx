var Number = React.createClass({

    getInitialState(){
        return({
            amount: this.props.amount,
            name: this.props.name
        })
    },
    render(){
        // console.log('render from Number');
        return(
            <div className='budget_unit'>
                <div className="budget_unit_title">{this.state.name} : </div>
                <div className="budget_unit_amount"> £ {this.props.children}</div>
            </div>
        )
    }
});