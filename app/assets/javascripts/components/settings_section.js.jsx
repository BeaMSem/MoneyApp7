var SettingsSection = React.createClass({

    // SettingsSection Props:
    // categories = {this.state.categories}
    // settings = {this.state.settings}
    // budget_units = {this.state.budget_units}
    // addToSettings = {this.addToSettings}
    // updateSettings = {this.updateSettings}
    // addToBudgetUnits = {this.addToBudgetUnits}
    // updateBudgetUnits = {this.updateBudgetUnits}

    //
    // getInitialState: function(){
    //     return({
    //         // settings: this.props.settings,
    //         // categories: this.props.categories,
    //     })
    // },
    arraySettingsFilteredByCategoryName(category_name){
        return this.props.settings.filter(function(setting){
            return setting.category_name == category_name;
        });
    },
    renderAddSettingForm(category, index){
        switch (category.name) {
                case 'Income':
                    return (
                        <IncomeForm
                            key                 = {index}
                            category_id         = {category.id}
                            category_name       = {category.name}
                            settings            = {this.props.settings}
                            budget_units        = {this.props.budget_units}
                            addToSettings       = {this.props.addToSettings}
                            addToBudgetUnits    = {this.props.addToBudgetUnits}
                            updateBudgetUnits   = {this.props.updateBudgetUnits}
                        />
                    );
                break;
                case 'Revolving Credits':
                    return (
                        <RevolvingCreditsForm
                            key = {index}
                            category_id = {category.id}
                            category_name = {category.name}
                            addToSettings = {this.props.addToSettings}
                            addToBudgetUnits = {this.props.addToBudgetUnits}
                        />
                    );
                break;
                case 'Instalment Credits':
                    return (
                        <InstalmentCreditsForm
                            {...this.props}
                            key = {index}
                            category_id = {category.id}
                            category_name = {category.name}
                            addToSettings = {this.props.addToSettings}
                            addToBudgetUnits = {this.props.addToBudgetUnits}
                        />
                    );
                break;

                default:
                return (
                    <SavingsForm
                        key = {index}
                        category_id = {category.id}
                        category_name = {category.name}
                        addToSettings = {this.props.addToSettings}
                        addToBudgetUnits = {this.props.addToBudgetUnits}
                    />
                );
        }
    },
    renderSettingRow(setting, index){
            return(
                <SettingRow
                    key = {index}
                    index = {index}
                    setting = {setting}
                    updateSettings = {this.props.updateSettings}
                    updateBudgetUnits = {this.props.updateBudgetUnits}
                />
            )
    },
    renderSettingCategory(category, index){
        return(
            <Container key = {index} class_name="setting_category_single">
                <Container class_name = {'settings_category_single_left_container'}>
                    <Container className="category_title">{category.name}</Container>
                </Container>
                <Container class_name = {'settings_category_single_right_container'}>
                    <Container class_name="single_settings_list">{this.arraySettingsFilteredByCategoryName(category.name).map(this.renderSettingRow)}</Container>
                    <Container class_name="add_setting_form">{this.renderAddSettingForm(category, index)}</Container>
                </Container>
            </Container>
        );
    },
    renderSettingsSection(){
        return(
            <Container class_name = {'settings_section'}>
                <Container class_name = {'settings_category_list'}>
                    {this.props.categories.map(this.renderSettingCategory)}
                </Container>
            </Container>
        )
    },
    render: function(){
        return(this.renderSettingsSection())
    }
});