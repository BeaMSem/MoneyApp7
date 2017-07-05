var MakeTransferForm = React.createClass({

    getInitialState: function(){
        return({
            name: '',
            qty:   null,
            amount: '',
            shop: null,
            payment_method_id: 1,
            transfer_into_id: null,
            record_type: 'transfer_record'
        })
    },
    setVisibleFormStateFalse(){
        this.props.setVisibleFormState(false);
    },
    onChange: function(e) {
        var name = e.target.name;
        var value = e.target.value;
        var obj = {};
        obj[name] = value;

        this.setState(obj);

        // console.log(name);
        // console.log(value);
        // console.log(this.state.paymentMethodsArray);
    },
    onRadioChange: function(e){
        var name = e.target.name;
        var value = e.target.value;
        var obj = {};
        obj[name] = value;

        this.setState(obj);

        // console.log('ON RADIO CHANGE');
        // console.log('name');
        // console.log(name);
        // console.log('value');
        // console.log(value);
        // console.log('state');
        // console.log(this.state);
    },
    onSubmit: function(){
        // console.log('FROM SUBMIT');
        // console.log('name.value');
        // console.log(this.refs.name.value);
        // console.log('amount.value');
        // console.log(this.refs.amount.value);
        // console.log('payment_method_id');
        // console.log(this.state.payment_method_id);
        // console.log('.shop');
        // console.log(this.state.shop);
        // console.log('.qty');
        // console.log(this.refs.qty.value);
        // console.log('.record_type');
        // console.log(this.state.record_type);

        var new_record = {
                name: "Transfer",
                amount: this.state.amount,
                payment_method_id: this.state.payment_method_id,
                transfer_into_id: this.state.transfer_into_id,
                shop: null,
                qty:   null,
                record_type: 'transfer_record'
        };

        // console.log('new_record');
        // console.log(new_record);
        // console.log('this.state');
        // console.log(this.state);

        $.ajax({
            method: 'post',
            url: '/records',
            dataType: 'JSON',
            data: {
                record: new_record,
            },
            context: this,
            success: function(data){
                // console.log('FROM AJAX');
                // console.log('data');
                // console.log(data.record);
                // console.log(data.payment_method_id);
                // console.log(data.transfer_into_id);
                // console.log(data.budget_unit);

                this.props.addIntoRecords(data.record);
                data.payment_method ? this.props.updateBudgetUnits(data.payment_method, data.payment_method.id) : false ;
                data.budget_unit ? this.props.updateBudgetUnits(data.budget_unit, data.budget_unit.id) : false ;
                data.transfer_into ? this.props.updateBudgetUnits(data.transfer_into, data.transfer_into.id) : false ;

                // console.log('state');
                // console.log(this.state);
            }
        });
        this.setState({
            name: '',
            qty:   null,
            amount: '',
            shop: null,
            payment_method_id: null,
            transfer_into_id: null,
            record_type: 'transfer_record',
        });
        this.setVisibleFormStateFalse();
        // console.log('');
    },
    renderInputs: function(){
        return(
            <div>
                <input
                    type="text"
                    name = "amount"
                    placeholder = 'enter the amount'
                    ref = "amount"
                    value={this.state.amount}
                    onChange = {this.onChange}
                />
            </div>
        )
    },
    renderSingleButton_transfer_money_from: function(payment_method, index){
        return(

            <div key = {index} >
                <label>
                    <input
                        type="radio"
                        name = "payment_method_id"
                        value = {payment_method.id}
                        defaultChecked = {payment_method.id === this.state.payment_method_id}
                        onChange = {this.onRadioChange}
                    />
                    {payment_method.name}
                </label>

            </div>
        )
    },
    renderTransferMoneyFrom: function(){
        var pay_into = this.state.transfer_into_id;
        var amount = this.state.amount;
        // console.log(this.state);
        return(
            <div className="payment_method_buttons">
                from
                {this.props.paymentMethodsArray
                    .filter(function(payment_method){
                    return payment_method.in_credit >= amount
                    })
                    .filter(function(payment_method){
                    return(
                        payment_method.id != pay_into
                    )})
                    .map(this.renderSingleButton_transfer_money_from)}
            </div>
        )
    },
    renderSingleButton_transfer_money_into: function(payment_method, index){
        return(

            <div key = {index} >
                <label>
                    <input
                        type="radio"
                        name = "transfer_into_id"
                        value = {payment_method.id}
                        defaultChecked= {payment_method.id === this.state.transfer_into_id}
                        onChange = {this.onRadioChange}

                    />
                    {payment_method.name}
                </label>

            </div>
        )
    },
    renderTransferMoneyInto: function(){

        // console.log(this.state);

        var pay_from = this.state.payment_method_id;

        return(
            <div className="payment_method_buttons">
                into:
                {this.props.budget_units.filter(function(payment_method){
                    return(
                        payment_method.id != pay_from
                    )
                }).map(this.renderSingleButton_transfer_money_into)}
            </div>
        )
    },



    renderForm: function(){

        return(
            <div className="records_form">
                {this.renderInputs()}
                {this.renderTransferMoneyFrom()}
                {this.renderTransferMoneyInto()}

                <input type="button" value="confirm transfer" onClick={this.onSubmit}/>
                <input type="button" value="cancel" onClick={this.setVisibleFormStateFalse}/>
            </div>
        )
    },
    render:function(){
        // console.log('add expenses form');
        // console.log(this.props.paymentMethodsArray);
        // console.log(this.props.paymentMethodsArray);


        return(this.renderForm())
    }
});