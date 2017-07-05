var ApplicationNavigation = React.createClass({

    changeAppBody(e){
        // console.log(e.target.value);
        this.props.setAppBodyState(e.target.value);
    },
    render(){
        return(
            <div className="application_navigation">
                <div><input type="button"     value="Expenses" onClick={this.changeAppBody}/></div>
                <div><input type="button"     value="Budget Settings" onClick={this.changeAppBody}/></div>
                <div><input type="button"     value="Recurring Expenses" onClick={this.changeAppBody}/></div>
                {/*<div><input type="button"     value="Wish List" onClick={this.changeAppBody}/></div>*/}
                {/*<div><input type="button"     value="Stats" onClick={this.changeAppBody}/></div>*/}
            </div>
        )
    }
});