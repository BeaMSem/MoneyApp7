var Container = React.createClass({

    render(){
        // console.log('render from Container');
        return(
            <div className={this.props.class_name}>
                {this.props.children}
            </div>
        )
    }
});