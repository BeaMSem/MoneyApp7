function reduceSettingsArray(settings){

    var current_category = null;
    var array_index = null;

    return (settings
            .sort(function(second, first){
                return second.category_id - first.category_id})
            .map(function(setting){
                return setting;})
            .reduce(function(reduced_settings, setting){

                    obj = {
                        category_id: '',
                        category_name: '',
                        items: []
                    };
                    // console.log('RENDER from SETTINGS_SECTION reduceSettingsArray');
                    // console.log('setting');
                    // console.log(setting);
                    // console.log('obj');
                    // console.log(obj);
                    // console.log('END of SETTINGS_SECTION reduceSettingsArray');

                    if(setting.category_name!= current_category){

                        array_index = array_index == null ? 0 : array_index + 1;
                        obj.category_name = setting.category_name;
                        obj.category_id = setting.category_id;
                        obj.items
                            .push({
                                id: setting.id,
                                name: setting.name,
                                balance: setting.balance,
                                total: setting.total,
                                payment: setting.payment
                            });
                        current_category = setting.category_name;
                        reduced_settings[array_index] = obj;
                    }
                    else{
                        reduced_settings[array_index].items
                            .push({
                                id: setting.id,
                                name: setting.name,
                                balance: setting.balance,
                                total: setting.total,
                                payment: setting.payment
                            })
                    }

                    return reduced_settings

                },[]
            )
    )
}


// console.log('RENDER from SETTINGS_SECTION');
// console.log('this.state.settings');
// console.log(this.state.settings);
// // console.log('this.state.reduced');
// // console.log(this.state.reduced);
// console.log('this.state.categories');
// console.log(this.state.categories);
// console.log('END of SETTINGS_SECTION');


// return(
//     <Container class_name = {'settings_section'}>
//         <Container class_name = {'settings_category_list'}>
//             {this.reduceSettingsArray(this.state.settings).map(this.renderSettingCategorySingle)}
//         </Container>
//     </Container>
// )

function addToSettings(setting){
    this.props.addToSettings(setting)
}
function addToBudgetUnits(budget_unit){
    var budget_unit_index = this.props.budget_units.findIndex(function(unit){return unit.name === 'Family Income'});

    budget_unit_index > (-1)
        ? this.props.updateBudgetUnits(budget_unit, budget_unit.id)
        : this.props.addToBudgetUnits(budget_unit);

    console.log('budget_unit_index123');
    console.log(budget_unit_index);

    console.log('budget_unit123');
    console.log(budget_unit);
}
