var RecordsSection = React.createClass({


    // records =               {this.state.records}
    // updateRecords =         {this.updateRecords}
    // deleteFromRecords =     {this.deleteFromRecords}
    // addIntoRecords =        {this.addIntoRecords}
    // recalculateBudgetUnit = {this.recalculateBudgetUnit}
    // updateBudgetUnits    = {this.updateBudgetUnits}
    // paymentMethodsArray =   {this.paymentMethodsArray()}
    // budget_units =          {this.state.budget_units}

    getInitialState(){
        return({
            visible_form: false,
        })
    },
    setVisibleFormState(button_value){
        this.setState({
            visible_form: button_value
        });
    },
    renderForms(){
                switch(this.state.visible_form) {
                    case ("Add expense"):

                        return(
                            <AddExpenseForm
                                paymentMethodsArray     = {this.props.paymentMethodsArray}
                                recalculateBudgetUnit   = {this.props.recalculateBudgetUnit}
                                updateRecords           = {this.props.updateRecords}
                                deleteFromRecords       = {this.props.deleteFromRecords}
                                addIntoRecords          = {this.props.addIntoRecords}
                                updateBudgetUnits       = {this.props.updateBudgetUnits}
                                setVisibleFormState        = {this.setVisibleFormState}
                            />);
                        break;

                    case ("Make transfer"):
                        return(
                            <MakeTransferForm
                                paymentMethodsArray     = {this.props.paymentMethodsArray}
                                recalculateBudgetUnit   = {this.props.recalculateBudgetUnit}
                                budget_units            = {this.props.budget_units}
                                updateRecords           = {this.props.updateRecords}
                                deleteFromRecords       = {this.props.deleteFromRecords}
                                addIntoRecords          = {this.props.addIntoRecords}
                                updateBudgetUnits       = {this.props.updateBudgetUnits}
                                setVisibleFormState        = {this.setVisibleFormState}
                            />
                        );

                        break;

                    case ("Add occasional income"):

                        return(
                            <AddOccasionalIncomeForm
                                paymentMethodsArray     = {this.props.paymentMethodsArray}
                                recalculateBudgetUnit   = {this.props.recalculateBudgetUnit}
                                updateRecords           = {this.props.updateRecords}
                                deleteFromRecords       = {this.props.deleteFromRecords}
                                addIntoRecords          = {this.props.addIntoRecords}
                                updateBudgetUnits       = {this.props.updateBudgetUnits}
                                setVisibleFormState        = {this.setVisibleFormState}

                            />
                        );
                        break;

                default:false;}
    },
    renderSingleRecord(record, index){
        return(
            <Record
                record      = {record}
                key         = {index}
                array_index = {index}
                updateRecords       = {this.props.updateRecords}
                deleteFromRecords   = {this.props.deleteFromRecords}
                budget_units        = {this.props.budget_units}
                updateBudgetUnits   = {this.props.updateBudgetUnits}
            />
        )
    },
    renderRecords(){
        return this.props.records.map(this.renderSingleRecord);
    },
    renderRecordSectionRightContainer(){
        return(
            <Container class_name ="records_section_navigation_right_container">
                <RecordsSectionRightContainerButton value ="Add expense"
                                                    setVisibleFormState= {this.setVisibleFormState}/>
                <RecordsSectionRightContainerButton value ="Make transfer"
                                                    setVisibleFormState= {this.setVisibleFormState}/>
                <RecordsSectionRightContainerButton value ="Add occasional income"
                                                    setVisibleFormState= {this.setVisibleFormState}/>
            </Container>
        )
    },
    renderRecordSectionLeftContainer(){
        return(
            <Container class_name ="records_section_navigation_left_container">
                <input type="text" placeholder="Search"/>
            </Container>
        )
    },
    render(){
        console.log(this.props);
        return(
            <Container class_name ='records_section'>
                    <Container class_name ="records_section_navigation">
                        {this.renderRecordSectionLeftContainer()}
                        {this.renderRecordSectionRightContainer()}
                    </Container>
                    <Container class_name ="records_section_forms">
                        {this.renderForms()}
                    </Container>
                    <Container class_name ="records_section_records">
                        {this.renderRecords()}
                    </Container>
            </Container>
        )
    }

});
