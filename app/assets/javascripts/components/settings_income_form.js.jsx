var SettingsFormIncome = React.createClass({

    render(){
        return(
            <div className="form">
                <div className="form_inputs">
                    <div><input
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
                        placeholder="Monthly Income Amount"
                        value = {this.state.total}
                        onChange={this.onChange}

                    /></div>
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
    }//render
});//class