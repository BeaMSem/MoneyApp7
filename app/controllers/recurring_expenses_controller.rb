class RecurringExpensesController < ApplicationController
  def create

    @recurring_expense = RecurringExpense.create(recurring_expense_params)
    if @recurring_expense
      render json: @recurring_expense
    else
      render json: @recurring_expense.errors, status: :unprocessable_entity
    end

  end

  def update
  end

  def delete
  end


  private
  def recurring_expense_params
    params.require(:recurring_expense).permit(:name, :amount, :category, :category_id, :cron_code)
  end
end
