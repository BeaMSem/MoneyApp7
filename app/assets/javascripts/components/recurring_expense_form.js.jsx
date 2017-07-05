var RecurringExpenseForm = React.createClass({

    getInitialState:function(){
        var date = new Date;
        return({
            name:       '',
            amount:      '',
            visible: false,
            cron_code: date.getDate()
        })
    },
    setCronCode(cron_code){
        this.setState({
            cron_code: cron_code
        })
    },
    toggleVisibleState(){
        this.setState({visible: !this.state.visible})
    },
    onChange:function(e){
        var name = e.target.name;
        var value = e.target.value;
        var obj = {};
        obj[name] = value;
        this.setState(obj);

        // console.log('IncomeForm onChange');
        // console.log('name');
        // console.log(name);
        // console.log('value');
        // console.log(value);
        // console.log('this.state');
        // console.log(this.state);
    },
    onAdd: function(){
        var new_recurring_expense = {
            name:          this.refs.name      != null ? this.refs.name.value   : null,
            amount:        this.refs.amount   != null ? parseFloat(this.refs.amount.value)  : null,
            category:      this.props.category.name,
            category_id:   this.props.category.id,
            cron_code:     this.state.cron_code
        };

        $.ajax({
            method: 'post',
            url: '/recurring_expenses',
            dataType: 'JSON',
            data: {
                recurring_expense: new_recurring_expense,
            },
            context: this,
            success: function(data){

                this.setState({
                    name:       '',
                    amount:      '',
                    visible: false
                });

                console.log('data reccurinf form');
                console.log(data);

                this.props.addIntoRecurringExpenses(data);

            }
        });

    },
    renderForm(){
        return(
            <div className="form">
                <div className="form_inputs">
                        <input
                        type="text"
                        name="name"
                        ref='name'
                        placeholder="Name"
                        value = {this.state.name}
                        onChange={this.onChange}
                        />
                    <div className="input_with_pound">
                        <div className="pound">£</div>
                        <input
                        type="text"
                        name="amount"
                        ref='amount'
                        placeholder="amount"
                        value = {this.state.total}
                        onChange={this.onChange}
                        />
                    </div>
                    <DatePicker
                        cron_code = {this.state.cron_code}
                        setCronCode = {this.setCronCode}
                    />
                </div>
                <div className="form_buttons">
                    <div className="add">
                        <input type="button" value='add' onClick={this.onAdd} />
                    </div>
                    <div className="cancel">
                        <input type="button" value='cancel' onClick={this.toggleVisibleState}/>
                    </div>
                </div>
            </div>

        )
    },
    renderButton(){
        return(
            <div className="subcategory_form_button">
                <input type="button" value = {'Add '+ this.props.category.name} onClick={this.toggleVisibleState}/>
            </div>
        )
    },
    render(){
        return(
            <div className="subcategory_form">
                { this.state.visible ? this.renderForm() : this.renderButton()}

            </div>
        )
    },
    componentWillReceiveProps: function(nextProps) {
        console.log('NEXTPROPS');
        // console.log('Props');
        // console.log(this.props);
        // console.log('State');
        // console.log(this.state);
        // console.log('nextProps');
        // console.log(nextProps);
        // this.setState({
        //     cron_code: nextProps
        // })
    },
    // shouldComponentUpdate: function(nextProps, nextState){
    //     console.log('nextProps');
    //     console.log(nextProps);
    //     console.log('nextState');
    //     console.log(nextState);
    //     return true;
    // }

});