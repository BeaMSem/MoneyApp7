var SingleSettingForm = React.createClass({
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
        var new_setting = {
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
                setting: new_setting,
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
                this.toggleVisibleState();

                // console.log('SingleSettingForm FORM ajax data');
                // console.log('data');
                // console.log(data);
            }
        });

    },

    renderForm(){
        return(
            this.props.children
        )
    },
    renderButton(){
        var button_label= "add " + this.props.category_name;
        return(
            <div className="subcategory_form_button">
                <input type="button" value={button_label} onClick={this.toggleVisibleState}/>
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