class Savings < BudgetUnitTemplate

  def initialize(setting)
    super()
    @name = setting.name
    @is_savings        = true
    @is_payment_method = true
    @in_credit      = setting.total
  end
end