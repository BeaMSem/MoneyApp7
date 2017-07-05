var ShopIcon = React.createClass({
    render: function(){
        return(
            <div className="shop_icon" style={{backgroundColor: this.props.shop.color}}>
                {this.props.shop.initials}
            </div>
        )
    }
});