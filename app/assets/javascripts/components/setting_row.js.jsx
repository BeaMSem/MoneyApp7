var SettingRow = React.createClass({

    // SettingRow Props:
    // key = {index}
    // index = {index}
    // setting = {setting}

    getInitialState(){
    return({
        editing: false,
        setting: this.props.setting,
        name: this.props.setting.name,
        total: this.props.setting.total,
        balance: this.props.setting.balance,
        payment: this.props.setting.payment
    })},
    onChange(e){
        var name = e.target.name;
        var value = e.target.value;
        var obj = {};
        obj[name] = value;
        this.setState(obj);
    },
    toggleEditingState(){
        this.setState({
            editing: !this.state.editing
        })
    },

    onDelete(){

    },
    onSaveUpdate(){
        console.log('ON SAVE UPDATE');
        var updated_setting = {
            name:       this.refs.name      != null ? this.refs.name.value : null,
            total:      this.refs.total     != null ? this.refs.total.value : null,
            balance:    this.refs.balance   != null ? this.refs.balance.value : null,
            payment:    this.refs.payment   != null ? this.refs.payment.value : null,
        };
        console.log('updated_setting');
        console.log(updated_setting);
        console.log(this.props.setting.id);

        $.ajax({
            method: 'put',
            url: '/settings/'+this.props.setting.id,
            dataType: 'JSON',
            data: {
            setting: updated_setting,
            },
        context: this,
        success: function(setting) {
                console.log('ON SAVE UPDATE');
                console.log('setting');
                console.log(setting);
            this.props.updateSettings(setting, setting.id);
            this.toggleEditingState();
        }
    });
    },
    renderDisplayState(){
            return(
                <Container class_name ='setting_row'>
                    <div className="setting_name">
                        <div className="setting_name">{this.props.setting.name}</div>
                    </div>
                    <div className="setting_data">
                        <div className="setting_total">£ {this.props.setting.total}</div>
                        {
                            this.state.setting.category_name === 'Income' || this.state.setting.category_name === 'Savings'
                            ? null
                            :<div className="setting_balance">£ {this.props.setting.balance}</div>
                        }
                        {
                            this.state.setting.category_name === 'Income'
                                ? null
                                : <div className="setting_payment">£ {this.props.setting.payment}</div>
                        }
                    </div>

                    <div className="setting_buttons">
                        <input type="button" value ='Edit' onClick={this.toggleEditingState}/>
                        <input type="button" value ='Delete' onClick={this.onDelete}/>
                    </div>

                </Container>
            )
    },
    renderEditingState(){
        return(
            <Container class_name ='setting_row'>
                            <div className="setting_name">
                                <input
                                    type="text"
                                    name="name"
                                    ref='name'
                                    placeholder="Name"
                                    value = {this.state.name}
                                    onChange={this.onChange}

                                />
                            </div>
                            <div className="setting_data">
                                <div className="input_with_pound">
                                    <div className="pound">£</div>
                                    <input
                                        type="text"
                                        name="total"
                                        ref='total'
                                        placeholder="Total amount of the loan"
                                        value = {this.state.total}
                                        onChange={this.onChange}

                                    />
                                </div>

                                {
                                    this.state.setting.category_name === 'Income' || this.state.setting.category_name === 'Savings'
                                        ? null
                                        :<div className="input_with_pound">
                                        <div className="pound">£</div>
                                        <input
                                            type="text"
                                            name="balance"
                                            ref='balance'
                                            placeholder="how much has been payed"
                                            value = {this.state.balance}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                }
                                {
                                    this.state.setting.category_name === 'Income'
                                        ? null
                                        :<div className="input_with_pound">
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
                                }
                            </div>

                            <div className="setting_buttons">
                                <input type="button" value ='Save Update' onClick={this.onSaveUpdate} />
                                <input type="button" value ='Cancel' onClick={this.toggleEditingState}/>
                            </div>
            </Container>
        )
    },
    render(){
        console.log(this.props);
        return(
           this.state.editing ? this.renderEditingState() :this.renderDisplayState()
        )
    }

});