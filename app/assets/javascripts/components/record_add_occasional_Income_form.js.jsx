var AddOccasionalIncomeForm = React.createClass({


    getInitialState: function(){
        return({
            name: '',
            qty:   null,
            amount: '',
            payment_method_id: null,
            transfer_into_id: null,
            shop: null,

            // payment_method_id_db_id: 1,
            // shop_db_id: 1,
            record_type: 'occasional_income_record'
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

        // console.log('name');
        // console.log(name);
        // console.log('value');
        // console.log(value);
        // console.log('state');
        // console.log(this.state);

    },
    onSubmit: function(){

        // // console.log('FROM SUBMIT');
        // // console.log('name.value');
        // // console.log(this.refs.name.value);
        // // console.log('amount.value');
        // // console.log(this.refs.amount.value);
        // // // console.log('payment_method_id');
        // // // console.log(this.state.payment_method_id_id);
        // // // console.log('.shop');
        // // // console.log(this.state.shop);
        // // // console.log('.qty');
        // // // console.log(this.refs.qty.value);
        // // console.log('.record_type');
        // // console.log(this.state.record_type);

        var new_record = {
            name: "Occasional Income",
            amount: this.state.amount,
            payment_method_id: this.state.payment_method_id,
            transfer_into_id: this.state.transfer_into_id,
            shop: this.state.shop,
            qty:   this.state.qty,
            record_type: this.state.record_type
        };

        $.ajax({
            method: 'post',
            url: '/records',
            dataType: 'JSON',
            data: {
                record: new_record,
            },
            context: this,
            success: function(data){


                console.log('FROM AJAX');

                this.setState({
                    name: '',
                    qty:   null,
                    amount: '',
                    payment_method_id: null,
                    transfer_into_id: null,
                    shop: null,

                    // payment_method_id_db_id: 1,
                    // shop_db_id: 1,
                    record_type: 'occasional_income_record'
                });

                // console.log('FROM AJAX');
                // console.log('data');
                // console.log(data.record);
                // console.log(data.payment_method);
                // console.log(data.transfer_into);
                // console.log(data.budget_unit);

                this.props.addIntoRecords(data.record);
                data.payment_method ? this.props.updateBudgetUnits(data.payment_method, data.payment_method.id) : false ;
                data.budget_unit ? this.props.updateBudgetUnits(data.budget_unit, data.budget_unit.id) : false ;
                data.transfer_into ? this.props.updateBudgetUnits(data.transfer_into, data.transfer_into.id) : false ;

                this.setVisibleFormStateFalse();
            }
        });
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
                    value={this.state.name}
                    onChange = {this.onChange}
                />
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
    renderForm: function(){
        return(
            <div className="records_form">
                {this.renderInputs()}
                <input type="button" value="add income" onClick={this.onSubmit}/>
                <input type="button" value="cancel"  onClick={this.setVisibleFormStateFalse}/>
            </div>
        )
    },
    render:function(){
        return(this.renderForm())
    }
});