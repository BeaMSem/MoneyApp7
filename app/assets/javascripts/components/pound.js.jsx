var InputWithPoundSign = React.createClass({
    render(){
        return(
            <div className="input_with_pound">
                <div className="pound">£</div>
                <input
                    type ="text"
                    name =  {this.props.name}
                    ref  =  {this.props.name}
                    placeholder  ={this.props.placeholder}
                    value        ={this.props.value}
                    onChange    ={this.props.onChange_function}
                />
            </div>
        )
    }
});
