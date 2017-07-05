class InstalmentCredit < BudgetUnitTemplate

  def initialize(setting)
    super()
    @name = setting.name
    @in_debt = setting.total - setting.balance
  end

end