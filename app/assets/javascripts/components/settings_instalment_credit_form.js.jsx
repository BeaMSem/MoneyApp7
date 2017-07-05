var SettingsInstalmentCreditForm = React.createClass({

    render(){
        return(
            <div className="form">
                <div className="form_inputs">
                    <div> <input
                        type="text"
                        name="name"
                        ref='name'
                        placeholder="Name"
                        value = {this.state.name}
                        onChange={this.onChange}

                    /></div>
                    <div><input
                        type="text"
                        name="total"
                        ref='total'
                        placeholder="Total amount of the loan"
                        value = {this.state.total}
                        onChange={this.onChange}

                    /></div>
                    <div><input
                        type="text"
                        name="balance"
                        ref='balance'
                        placeholder="how much has been payed"
                        value = {this.state.balance}
                        onChange={this.onChange}

                    /></div>
                    <div><input
                        type="text"
                        name="payment"
                        ref='payment'
                        placeholder="Monthly repayment"
                        value = {this.state.payment}
                        onChange={this.onChange}

                    /></div>
                </div>
                <div className="form_buttons">
                    <div>
                        <input type="button" value='add' onClick={this.onAdd} />
                    </div>
                    <div>
                        <input type="button" value='cancel' onClick={this.toggleVisibleState}/>
                    </div>
                </div>
            </div>
        )
    }
});