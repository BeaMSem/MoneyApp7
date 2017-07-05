var AddExpenseForm = React.createClass({

    getInitialState: function(){
        return({
            name: '',
            qty:   0,
            amount: '',
            shop_name: "Sainsbury's",
            payment_method_id: 1,
            transfer_into_id: null,
            record_type: 'expense_record',
            shops: [
                {   id:1,
                    name: "Sainsbury's",
                    initials: 'S',
                    color: '#ff8c00',
                },
                {   id:2,
                    name: 'Tesco',
                    initials: 'T',
                    color: '#2E41A9',
                },
                {   id:3,
                    name: 'Waitrose',
                    initials: 'W',
                    color: '#165716',
                },
                {   id:4,
                    name: 'M&S',
                    initials: 'M',
                    color: '#2E2F30',
                },
                {   id:5,
                    name: 'Other',
                    initials: 'O',
                    color: '#818284',
                }
            ]
        })
    },
    paymentMethod(){
        return(this.state.payment_method_id)
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

        // console.log('onChange AddExpenseForm');
        // console.log('name');
        // console.log(name);
        // console.log('value');
        // console.log(value);
        // console.log(this.state);

    },
    onRadioChange: function(e){
        var name = e.target.name;
        var value = e.target.value;
        var obj = {};
        obj[name] = value;

        this.setState(obj);

        // console.log('onRadioChange AddExpenseForm');
        // console.log('name');
        // console.log(name);
        // console.log('value');
        // console.log(value);
        // console.log('state');
        // console.log(this.state);
    },
    onSubmit: function(){

        console.log('FROM SUBMIT AddExpenseForm ');
        // console.log('name.value');
        // console.log(this.refs.name.value);
        // console.log('amount.value');
        // console.log(this.refs.amount.value);
        // console.log('payment_method');
        // console.log(this.state.payment_method_id);
        // console.log(this.state.payment_method_name);
        // console.log('.shop');
        // console.log(this.state.shop);
        // console.log('.qty');
        // console.log(this.refs.qty.value);
        // console.log('.record_type');
        // console.log(this.state.record_type);

        var new_record = {
            name:               this.state.name,
            qty:                this.state.qty,
            amount:             this.state.amount,
            shop_name:          this.state.shop_name,
            payment_method_id:  this.paymentMethod(),
            transfer_into_id:   this.state.transfer_into_id,
            record_type:        'expense_record'
        };

        console.log(new_record);


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
                // console.log(data);
                // console.log('data.record');
                // console.log(data.record);
                // console.log('data.payment_method');
                // console.log(data.payment_method);
                // console.log('data.budget_unit');
                // console.log(data.budget_unit);
                // console.log('data.transfer_into');
                // console.log(data.transfer_into);
                // console.log('data.payment_method null');
                // console.log(data.payment_method != null);
                // console.log('data.budget_unit null');
                // console.log(data.budget_unit != null);
                // console.log('data.transfer_into null');
                // console.log(data.transfer_into != null);


                this.props.addIntoRecords(data.record);

                data.payment_method != null
                    ? this.props.updateBudgetUnits(data.payment_method, data.payment_method.id)
                    : false ;
                data.budget_unit != null
                    ? this.props.updateBudgetUnits(data.budget_unit, data.budget_unit.id)
                    : false ;
                data.transfer_into != null
                    ? this.props.updateBudgetUnits(data.transfer_into, data.transfer_into.id)
                    : false ;


                // console.log('state');
                // console.log(this.state);



            }
        });
        this.setState({
            name: '',
            qty:   0,
            amount: '',
            shop_name: "Sainsbury's",
            payment_method_id: 1,
            transfer_into_id: null,
            record_type: 'expense_record'
        });
        this.setVisibleFormStateFalse();
        // console.log('');
    },
    renderInputs: function(){
        return(
            <div>
                <input
                    type="text"
                    name = "name"
                    placeholder = 'enter the name'
                    ref = "name"
                    value = {this.state.name}
                    onChange = {this.onChange}
                />
                <input
                    type="text"
                    name = "qty"
                    placeholder = 'enter the qty'
                    ref = "qty"
                    value = {this.state.qty}
                    onChange = {this.onChange}
                />
                <input
                    type="text"
                    name = "amount"
                    placeholder = 'enter the amount'
                    ref = "amount"
                    value = {this.state.amount}
                    onChange = {this.onChange}
                />
            </div>
        )
    },
    renderSingleButton: function(payment_method, index){

        var id = this.state.payment_method_id;
        return(
            <div key = {index} >
                <label>
                    <input
                        type = "radio"
                        name = "payment_method_id"
                        value = {payment_method.id}
                        defaultChecked = {payment_method.id == id}
                        onChange = {this.onRadioChange}
                    />
                {payment_method.name}
                </label>
            </div>
        )
    },
    renderPaymentMethodsButtons: function(){
        return(
            <div className="payment_method_buttons">
                {this.props.paymentMethodsArray.map(this.renderSingleButton)}
            </div>
        )
    },
    renderSingleShopIcon: function(shop, index){
        return(

            <div key = {index} >
                <label>
                    <input
                        type="radio"
                        name = "shop_name"
                        value = {shop.name}
                        defaultChecked= {this.state.shop_name === shop.name}
                        onChange = {this.onRadioChange}
                    />
                    <ShopIcon
                        shop = {shop}
                        key = {index}
                    />
                </label>
            </div>
        )
    },
    renderListShops: function(){
        return(
            <div className="list_shop_icon">
                {this.state.shops.map(this.renderSingleShopIcon)}
            </div>
        )
    },
    renderForm: function(){
        return(
            <div className="records_form">
                {this.renderInputs()}
                {this.renderPaymentMethodsButtons()}
                {this.renderListShops()}
                <input type="button" value="add expense" onClick={this.onSubmit}/>
                <input type="button" value="cancel" onClick={this.setVisibleFormStateFalse} />
            </div>
        )
    },
    render:function(){
        // console.log('add expenses form');
        // console.log(this.props.paymentMethodsArray);
        return(this.renderForm())
    }
});