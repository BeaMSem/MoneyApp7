class StaticPagesController < ApplicationController

  def project
    @settings = Setting.all
    @budget_units = BudgetUnit.all
    @categories = Category.all
    @recurring_expenses_categories = RecurringExpenseCategory.all
    @recurring_expenses = RecurringExpense.all
    @records = Record.order(created_at: :desc)
  end

  def description
  end

  def tutorials
  end

end
