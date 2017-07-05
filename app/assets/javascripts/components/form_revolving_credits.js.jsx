var RevolvingCreditsForm = React.createClass({
    getInitialState:function(){
        return({
            name:       '',
            total:      '',
            balance:    '',
            payment:    '',
            visible: false
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

        // console.log('value');
        // console.log(value);
    },
    addToSettings(setting){
        this.props.addToSettings(setting);
    },
    addToBudgetUnits(budget_unit){
        this.props.addToBudgetUnits(budget_unit);
    },
    onAdd: function(){
        var new_income = {
            name:       this.refs.name     != null ? this.refs.name.value   : null,
            total:      this.refs.total    != null ? parseFloat(this.refs.total.value)  : null,
            balance:    this.refs.balance  != null ? parseFloat(this.refs.balance.value): null,
            payment:    this.refs.payment  != null ? parseFloat(this.refs.payment.value): null,
            category_name   : this.props.category_name,
            category_id     : this.props.category_id
        };

        $.ajax({
            method: 'post',
            url: '/settings',
            dataType: 'JSON',
            data: {
                setting: new_income,
            },
            context: this,
            success: function(data){

                this.setState({
                    name:       '',
                    total:      '',
                    balance:    '',
                    payment:    '',
                    visible: false
                });
                this.addToSettings(data.setting);
                this.addToBudgetUnits(data.budget_unit);

                // console.log('data');
                // console.log(data);
            }
        });

        // });
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
                            name="total"
                            ref='total'
                            placeholder="Limit"
                            value = {this.state.total}
                            onChange={this.onChange}

                        />
                    </div>
                    <div className="input_with_pound">
                        <div className="pound">£</div>
                        <input
                            type="text"
                            name="balance"
                            ref='balance'
                            placeholder="Available"
                            value = {this.state.balance}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="input_with_pound">
                        <div className="pound">£</div>
                        <input
                            type="text"
                            name="payment"
                            ref='payment'
                            placeholder="Monthly repayment"
                            value = {this.state.payment}
                            onChange={this.onChange}
                        />
                    </div>
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
                <input type="button" value = 'add revolving credit' onClick={this.toggleVisibleState}/>
            </div>
        )
    },
    render(){
        return(
            <div className="subcategory_form">
                { this.state.visible ? this.renderForm() : this.renderButton()}

            </div>


        )
    }
});