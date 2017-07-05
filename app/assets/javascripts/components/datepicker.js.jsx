var DatePicker = React.createClass({


    getInitialState(){
      return({
          displaying: false,
          selected: this.props.cron_code,
      })
    },
    show(){
        this.setState({
            displaying: true
        })
    },
    hide(){
        this.setState({
            displaying: false
        })
    },
    renderDaysBefore(){
        var items = [];
        for(var i = 0; i < this.state.selected; i++){
            items.push(<div
                onClick={this.onClick}
                key = {i}
            >{i}</div>);
        }
        return items;
    },
    renderDaysAfter(){
        var items = [];
        for(var i = this.state.selected; i < 32; i++){
            items.push(<div
                onClick={this.onClick}
                key = {i}
            >{i}</div>);
        }
        return items;
    },
    onClick(e){
        // console.log('e');
        // console.log(e);
        console.log('e.target.innerHTML');
        console.log(e.target.innerHTML);


        this.setState({
            selected: e.target.innerHTML,
            displaying: false
        });

        this.props.setCronCode(e.target.innerHTML);

    },
    render(){
        return(
            <div className="date_picker">
                {this.state.displaying ?  <div className="drop_down_list">{this.renderDaysBefore()}</div> : null}
                 <div className="drop_down_selected" onClick={this.show}>selected: {this.state.selected}</div>
                {this.state.displaying ?  <div className="drop_down_list">{this.renderDaysAfter()}</div> : null}


            </div>
        )
    }
});