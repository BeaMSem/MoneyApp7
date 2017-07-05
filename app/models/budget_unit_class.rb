class BudgetUnitClass

  attr_reader :budget_unit_class

  def initialize(factory)
    super()
    @factory = factory
    return @budget_unit
  end

  def create_with_setting(setting)
    @budget_unit = @factory.create_with_setting(setting)
  end

end