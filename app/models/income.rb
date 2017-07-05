class Income < BudgetUnitTemplate

  def total_income
    total = Setting.where(:category_name => 'Income').inject(0) do |total, income |
      total + income.total
    end
    total
  end

  def initialize(setting)

    super()
    @name = 'Family Income'
    @in_credit = total_income
    @is_payment_method = true
    @is_income = true

  end

end