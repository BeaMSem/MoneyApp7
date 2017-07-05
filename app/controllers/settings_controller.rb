class SettingsController < ApplicationController

  def index
    # @categories = Category.all
    @settings = Settings.all

  end

  def create

    @setting = Setting.create(setting_params)

    if @setting

      factory = BudgetUnitFactory.new
      budget_unit_with_factory = BudgetUnitClass.new(factory)
      budget_unit_object = budget_unit_with_factory.create_with_setting(@setting)

      if @setting.category_name == 'Income'
        budget_unit_model =  BudgetUnit.where(is_income: true).first

          if budget_unit_model
            budget_unit_model.update(budget_unit_object.as_json)
          else
            budget_unit_model = BudgetUnit.create(budget_unit_object.as_json)
          end

      else
        budget_unit_model = BudgetUnit.create(budget_unit_object.as_json)
      end

      budget_unit_model.settings << @setting

      @budget_unit = budget_unit_model

      render json: {
          setting: @setting,
          budget_unit: @budget_unit}

    else
      render json: @setting.errors, status: :unprocessable_entity
    end

  end

  def update

      @setting = Setting.find(params[:id])

      if  @setting.update(setting_params)
        render json: @setting
      else
        render json: @setting.errors, status: :unprocessable_entity
      end

  end

  def destroy
    @setting = Settings.find(params[:id])
    @setting.destroy
    head :no_content
  end

  private

  def setting_params
    params.require(:setting).permit(:name, :total, :balance, :payment, :category_id, :category_name)
  end

end
