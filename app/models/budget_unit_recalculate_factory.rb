class BudgetUnitRecalculateFactory

  def update_with_record_and_budget_unit(record, budget_unit)

    case record.record_type
      when 'expense_record'
        return  UpdateWithExpenseRecord.new(record, budget_unit)

      when 'occasional_income_record'
        return  UpdateWithOccasionalIncomeRecord.new(record, budget_unit)

      when 'transfer_record'
        return  UpdateWithTransferRecord.new(record, budget_unit)

      else
        return BudgetUnitTemplate.new

    end

  end

end