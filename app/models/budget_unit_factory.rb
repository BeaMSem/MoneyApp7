class BudgetUnitFactory

  def create_with_setting(setting)

    case setting.category_name
      when 'Income'
        return Income.new(setting)

      when 'Revolving Credits'
        return RevolvingCredit.new(setting)

      when 'Instalment Credits'
        return InstalmentCredit.new(setting)

      when 'Savings'
        return Savings.new(setting)

      else
        return BudgetUnitTemplate.new
    end

  end


end