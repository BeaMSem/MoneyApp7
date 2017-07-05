var RecordsSectionRightContainerButton = React.createClass({

    showForm(){
        // console.log(this.refs.button_value.value);
        // console.log(this.props);

        this.props.setVisibleFormState(this.refs.button_value.value)
    },
    render(){
        return(
            <input type="button" ref='button_value' value={this.props.value} onClick = {this.showForm}/>
        )
    }

});