var Record = React.createClass({

    // record = {record}
    // key = {index}
    // array_index = {index}
    // class_name = {record.record_type}
    // updateRecords = {this.props.updateRecords}
    // deleteFromRecords = {this.props.deleteFromRecords}
    // budget_units            = {this.props.budget_units}


    getInitialState(){
        return({
            record:             this.props.record,
            editing:            false,

            // name:               this.props.record.name,
            // amount:             this.props.record.amount,
            // qty:                this.props.record.qty,
            // shop_name:          this.props.record.shop_name,
            // payment_method_id:  this.props.record.payment_method_id,
            // transfer_into_id:   this.props.record.transfer_into_id,
            // record_type:        this.props.record.record_type,
            // created_at:         this.props.record.created_at

        })
    },
    toggleEditingState(){
        return(
            this.setState({
                editing: !this.state.editing
            })
        )
    },
    onDelete(){

        $.ajax({
            method: 'delete',
            url: '/records/'+this.state.record.id,
            dataType: 'JSON',
            context: this,
            success: function(data){

                this.setState({
                    editing: false,
                });

                console.log('FROM AJAX  ON DELETE');
                console.log('data');
                console.log(data);


                data.existing_receiver != null
                    ? this.props.updateBudgetUnits(data.existing_receiver, data.existing_receiver.id)
                    : false;
                data.existing_sender != null
                    ? this.props.updateBudgetUnits(data.existing_sender, data.existing_sender.id)
                    :false;
                data.updated_income != null
                    ? this.props.updateBudgetUnits(data.updated_income, data.updated_income.id)
                    : false;


                this.props.deleteFromRecords(this.props.array_index);


            }
        });




        // console.log('delete');
        console.log(this.props.array_index);

    },
    onChange(e){
        // console.log('onChange');
        var name = e.target.name;
        var value = e.target.value;
        // console.log('name');
        // console.log(name);
        // console.log('value');
        // console.log(value);
        var obj = {};
        obj[name] = value;
        this.setState(obj)
    },
    onUpdate(){


        var updated_record = {
            name: this.refs.name != null
                ? this.refs.name.value
                : null,
            amount: this.refs.amount != null
                ? parseFloat(this.refs.amount.value)
                : null,
            qty:this.refs.qty != null
                ? parseFloat(this.refs.qty.value)
                : null,
            shop_name: this.refs.shop_name != null
                ? this.refs.shop_name.value
                : null,
            payment_method_id:this.refs.payment_method_id != null
                ? this.refs.payment_method_id.value
                : null,
            transfer_into_id:this.refs.transfer_into_id != null
                ? this.refs.transfer_into_id.value
                : null,
            record_type: this.refs.record_type != null
                ? this.refs.record_type.value
                : null,

        };
        console.log('UPDATE RECORD');
        // console.log('this.props.array_index');
        // console.log(this.props.array_index);
        // console.log('updated_record');
        // console.log(updated_record);
        // console.log('this.props.record.id');
        // console.log(this.props.record.id);


        $.ajax({
            method: 'put',
            url: '/records/'+this.state.record.id,
            dataType: 'JSON',
            data: {
                record: updated_record,
            },
            context: this,
            success: function(data){

                this.setState({
                    editing: false,
                    record: data.updated_record
                });

                console.log('FROM AJAX');
                console.log('data');
                console.log(data);
                // console.log('state');
                // console.log(this.state);
                // console.log('this.props.array_index');
                // console.log(this.props.array_index);
                data.existing_receiver != null
                    ? this.props.updateBudgetUnits(data.existing_receiver, data.existing_receiver.id)
                    : false;
                data.existing_sender != null
                    ? this.props.updateBudgetUnits(data.existing_sender, data.existing_sender.id)
                    :false;
                data.updated_receiver != null
                    ? this.props.updateBudgetUnits(data.updated_receiver, data.updated_receiver.id)
                    :false;
                data.updated_sender != null
                    ? this.props.updateBudgetUnits(data.updated_sender, data.updated_sender.id)
                    : false;
                data.updated_income != null
                    ? this.props.updateBudgetUnits(data.updated_income, data.updated_income.id)
                    : false;

                this.props.updateRecords(updated_record, this.props.array_index);

            }
        });

    },
    getDateForRecord(date){

        var month;
         switch(date.getMonth()) {
             case 0:
                 month = 'Jan';
                 break;
             case 1:
                 month = 'Feb';
                 break;
             case 2:
                 month = 'Mar';
                 break;
             case 3:
                 month = 'Apr';
                 break;
             case 4:
                 month = 'May';
                 break;
             case 5:
                 month = 'Jun';
                 break;
             case 6:
                 month = 'Jul';
                 break;
             case 7:
                 month = 'Aug';
                 break;
             case 8:
                 month = 'Sep';
                 break;
             case 9:
                 month = 'Oct';
                 break;
             case 10:
                 month = 'Nov';
                 break;
             default:
                 month = 'Dec';
                 break;
         }

        return(
                date.getDate()+
            '  '+ month +
            '  '+ date.getFullYear()
        )
    },
    description(){

        var description = '';
        // console.log('DESCRIPTION');
        // console.log('this.state');
        // console.log(this.props.record.payment_method_id);
        // console.log(this.props.budget_units);
        // console.log(this.state);

        if(this.props.record.payment_method_id != null ){
            var payment_method_id = this.props.record.payment_method_id;
            var from = this.props.budget_units.find(function(budget_unit){
                return budget_unit.id == payment_method_id
            });

            description = 'Paid from ' + from.name;
            // console.log('from');
            // console.log(from);
        }

        if(this.props.record.transfer_into_id != null) {
            var transfer_into_id = this.props.record.transfer_into_id;
            var into = this.props.budget_units.find(function (budget_unit) {
                return budget_unit.id == transfer_into_id
            });

            description += 'into ' + into.name;

            // console.log('into');
            // console.log(into)
        }
        return description;
    },
    renderDisplayMode(){
      return(
          <Container class_name={this.props.record.record_type}>
              <Container class_name ='record'>
                    <div className="record_data">

                        <div className="record_name">{this.props.record.name}</div>
                        <div className="record_qty">{this.props.record.qty}</div>
                        <div className="record_amount">£ {this.props.record.amount}</div>
                        {
                                this.props.record.record_type === 'expense_record'
                                ? <div className="record_payment_method">{this.description()}</div>
                                : null
                        }
                        {
                                this.props.record.record_type   === 'expense_record'
                                ? <div className="record_shop_name">{this.props.record.shop_name}</div>
                                : null
                        }
                        {
                                this.props.record.record_type  === 'transfer_record' || this.props.record.record_type  == 'occasional_income_record'
                                ? <div className="record_description">{this.description()}</div>
                                : null
                        }

                        <div className="record_update_date">{this.getDateForRecord(new Date(this.props.record.created_at))}</div>

                    </div>

                      <div className="record_buttons">
                          {this.props.record.record_type == 'expense_record' ? <input type="button" value ='Add to shopping list'/> : ''}
                          <input type="button" value ='Edit' onClick={this.toggleEditingState}/>
                          <input type="button" value ='Delete' onClick={this.onDelete}/>
                      </div>

              </Container>
          </Container>
      )
    },
    renderEditingMode(){
        return(
            <Container class_name={this.state.record.record_type}>
                <Container class_name ='record'>

                    <div className="record_data">
                        <div className="record_name">
                            <label> name:
                                <input
                                        type="text"
                                        defaultValue = {this.state.record.name}
                                        ref = 'name'
                                        name = 'name'
                                        onChange={this.onChange}
                                />
                            </label>

                        </div>
                        {
                            this.props.record.record_type == 'expense_record'
                                ?   <div className="record_qty">
                                        <label> quantity:
                                            <input
                                                type="text"
                                                defaultValue = {this.state.record.qty}
                                                ref = 'qty'
                                                name = 'qty'
                                                onChange={this.onChange}
                                            />
                                        </label>
                                    </div>
                                : null
                        }
                                    <div className="record_amount">
                                        <label> amount:
                                            <input
                                                type="text"
                                                defaultValue = {this.state.record.amount}
                                                ref = 'amount'
                                                name = 'amount'
                                                onChange={this.onChange}
                                            />
                                        </label>
                                    </div>
                        {
                            this.props.record.record_type == 'expense_record'
                                ?   <div className="record_shop">
                                        <label> shop:
                                            <input
                                                type="text"
                                                defaultValue = {this.state.record.shop_name}
                                                ref = 'shop_name'
                                                name = 'shop_name'
                                                onChange={this.onChange}
                                            />
                                        </label>
                                    </div>
                                : null
                        }
                        {
                            this.props.record.record_type == 'expense_record' || this.props.record.record_type == 'transfer_record'
                                ?   <div className="record_payment_method">
                                        <label> payment method:
                                            <input
                                                type="text"
                                                defaultValue = {this.state.record.payment_method_id}
                                                ref = 'payment_method_id'
                                                name = 'payment_method_id'
                                                onChange={this.onChange}
                                            />
                                        </label>
                                    </div>
                                : null
                        }
                        {
                             this.props.record.record_type == 'transfer_record'
                                ?   <div className="record_transfer_into">
                                <label> transfer_into:
                                    <input
                                        type="text"
                                        defaultValue = {this.state.record.transfer_into_id}
                                        ref = 'transfer_into_id'
                                        name = 'transfer_into_id'
                                        onChange={this.onChange}
                                    />
                                </label>
                            </div>
                                : null
                        }
                        <div className="record_record_tye">
                            <label>
                                <input
                                    type="hidden"
                                    defaultValue = {this.state.record.record_type}
                                    ref = 'record_type'
                                    name = 'record_type'
                                    onChange={this.onChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="record_buttons">
                        <input type="button" value ='update' onClick={this.onUpdate}/>
                        <input type="button" value ='cancel' onClick={this.toggleEditingState}/>
                    </div>

                </Container>
            </Container>
        )
    },
    renderRecord(){
        return(
            this.state.editing ? this.renderEditingMode() :  this.renderDisplayMode()
        )
    },
    render(){

        // console.log('FROM RECORD');
        // console.log('Props');
        // console.log(this.props);
        // console.log('State');
        // console.log(this.state);

        return(
            this.renderRecord()
        )
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            record: nextProps.record
        })
    },

});