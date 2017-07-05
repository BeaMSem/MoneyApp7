class BudgetUnitTemplate

  attr_accessor :is_savings, :in_credit

  def initialize
    @name               = 'no name'
    @is_savings         = false
    @is_income          = false
    @is_payment_method  = false
    @in_credit          = nil
    @in_debt            = nil
  end

end