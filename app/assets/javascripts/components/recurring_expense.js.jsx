var RecurringExpense = React.createClass({

    getInitialState(){
        return({
            editing: false,
            name: this.props.recurring_expense.name,
            amount: this.props.recurring_expense.amount,
        })
    },
    toggleEditingState(){
        this.setState({
            editing: !this.state.editing
        })
    },
    onChange(e){
        var value = e.target.value;
        var name = e.target.name;
        var obj = {};
        obj[name] = value;

        this.setState(obj);
    },
    onUpdate(){
        var updated_reccuring_expense = {
            name: this.refs.name.value,
            amount: this.refs.amount.value
        }

    },
    onDelete(){

    },
    renderEditingState(){
        return(
            <div>
                <div>
                    <input type="text"
                            value={this.state.name}
                            name = "name"
                            ref = "name"
                            onChange={this.onChange}
                    />
                    <input type="text"
                           value={this.state.amount}
                           name = "amount"
                           ref = "amount"
                           onChange={this.onChange}
                    />
                </div>
                <   input
                    type = "button"
                    value = 'update'
                />
                <   input
                    type = "button"
                    value = 'cancel'
                    onClick={this.toggleEditingState}
                />
            </div>
        )
    },
    renderDisplayState(){
        return(
            <div>
                <div>
                    <div>{this.props.recurring_expense.name}</div>
                    <div>{this.props.recurring_expense.amount}</div>
                    <div>{this.props.recurring_expense.cron_code}</div>
                </div>
                <   input
                    type = "button"
                    value = 'edit'
                    onClick={this.toggleEditingState}
                />
                <   input
                    type = "button"
                    value = 'delete'
                />
            </div>

        )
    },
    render: function(){
            console.log('RecurringExpense RENDER');
            console.log('this.props');
            console.log(this.props);
            console.log('this.state');
            console.log(this.state);

        return(
            this.state.editing ? this.renderEditingState() : this.renderDisplayState()
        )

    }
});