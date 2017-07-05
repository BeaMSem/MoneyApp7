class RecordsController < ApplicationController

  def create

    @record = Record.create(record_params)

    if @record.payment_method_id == nil && @record.transfer_into_id == nil

      @budget_unit = BudgetUnit.where(:name == 'Family Income').first
      @budget_unit.in_credit  = @budget_unit.in_credit += @record.amount
      @budget_unit.update(@budget_unit.as_json)

    end

    if @record.payment_method_id
      @payment_method= BudgetUnit.find(@record.payment_method_id)
      @payment_method.in_credit  = @payment_method.in_credit  != nil ? @payment_method.in_credit -= @record.amount : nil
      @payment_method.in_debt    = @payment_method.in_debt    != nil ? @payment_method.in_debt   += @record.amount : nil
      @payment_method.update(@payment_method.as_json)


    end

    if @record.transfer_into_id

      @transfer_into  = BudgetUnit.find(@record.transfer_into_id)
      @transfer_into.in_credit  = @transfer_into.in_credit  != nil ? @transfer_into.in_credit += @record.amount : nil
      @transfer_into.in_debt    = @transfer_into.in_debt    != nil ? @transfer_into.in_debt   -= @record.amount : nil
      @transfer_into.update(@transfer_into.as_json)

    end


    if @record

        render json: {
            record: @record,
            budget_unit: @budget_unit,
            payment_method: @payment_method,
            transfer_into: @transfer_into}
      else
        render json: @record.errors, status: :unprocessable_entity
    end
  end



  def update

    # @record = Record.find(params[:id])
    # @record.update(record_params)


    @existing_record = Record.find(params[:id])
    existing_receiver_id   =  @existing_record.payment_method_id
    existing_sender_id     = @existing_record.transfer_into_id
    existing_amount = @existing_record.amount

    if existing_receiver_id != nil
      existing_receiver_object = BudgetUnit.find(existing_receiver_id)
      if existing_receiver_object.in_credit != nil
        in_credit = existing_receiver_object.in_credit += existing_amount
      else
        in_credit = nil
      end
      if  existing_receiver_object.in_debt != nil
        in_debt = existing_receiver_object.in_debt -= existing_amount
      else
        in_debt = nil
      end
      existing_receiver_object.update(in_credit: in_credit, in_debt: in_debt )
      existing_receiver =  BudgetUnit.find(existing_receiver_id)
    else
      existing_receiver = nil
    end
    if existing_sender_id != nil
      existing_sender_object = BudgetUnit.find(existing_sender_id)
      if existing_sender_object.in_credit !=nil
        in_credit = existing_sender_object.in_credit -= existing_amount
      else
        in_credit = nil
      end
      if existing_sender_object.in_debt !=  nil
       in_debt = existing_sender_object.in_debt += existing_amount
      else
        in_debt = nil
      end
     existing_sender_object.update(in_credit: in_credit, in_debt: in_debt )
      existing_sender = BudgetUnit.find(existing_sender_id)
    else
      existing_sender = nil
    end



    Record.find(params[:id]).update(record_params)
    @updated_record = Record.find(params[:id])
    updated_receiver_id   =  @updated_record.transfer_into_id
    updated_sender_id     = @updated_record.payment_method_id
    amount = @updated_record.amount


    if updated_receiver_id != nil

      updated_receiver_object = BudgetUnit.find(updated_receiver_id)

      if updated_receiver_object.in_credit
        in_credit = updated_receiver_object.in_credit += amount
      else
        in_credit = nil
      end
      if  updated_receiver_object.in_debt != nil
        in_debt = updated_receiver_object.in_debt -= amount
      else
        in_debt = nil
      end
      updated_receiver_object.update(in_credit: in_credit, in_debt: in_debt )
      updated_receiver = BudgetUnit.find(updated_receiver_id)
    else
      updated_receiver = nil
    end
    if updated_sender_id != nil
      updated_sender_object = BudgetUnit.find(updated_sender_id)
      if updated_sender_object.in_credit != nil
        in_credit = updated_sender_object.in_credit -= amount
      else
        in_credit = nil
      end
      if updated_sender_object.in_debt != nil
        in_debt = updated_sender_object.in_debt += amount
      else
        in_debt = nil
      end
        updated_sender_object.update(in_credit: in_credit, in_debt: in_debt )
        updated_sender = BudgetUnit.find(updated_sender_id)
    else
      updated_sender = nil
    end


    if @existing_record.record_type == 'occasional_income_record'
      income_unit     = BudgetUnit.where(:is_income => true).first
      in_credit       = income_unit.in_credit -= existing_amount - amount
      income_unit.update(in_credit: in_credit)
      updated_income  = BudgetUnit.where(:is_income => true).first
    end


    if @updated_record
        render json: {
            existing_record:    @existing_record,
            updated_record:     @updated_record,
            existing_receiver:  existing_receiver,
            existing_sender:    existing_sender,
            updated_receiver:   updated_receiver,
            updated_sender:     updated_sender,
            updated_income: updated_income
        }
    else
      render json: @record.errors, status: :unprocessable_entity
    end


  end

  def destroy
    @existing_record = Record.find(params[:id])
    existing_receiver_id   =  @existing_record.payment_method_id
    existing_sender_id     = @existing_record.transfer_into_id
    existing_amount = @existing_record.amount

    if @existing_record.record_type == 'occasional_income_record'
      income_unit     = BudgetUnit.where(:is_income => true).first
      in_credit       = income_unit.in_credit -= existing_amount
      income_unit.update(in_credit: in_credit)
      updated_income  = BudgetUnit.where(:is_income => true).first
    end

    if existing_receiver_id != nil
      existing_receiver_object = BudgetUnit.find(existing_receiver_id)
      if existing_receiver_object.in_credit != nil
        in_credit = existing_receiver_object.in_credit += existing_amount
      else
        in_credit = nil
      end
      if  existing_receiver_object.in_debt != nil
        in_debt = existing_receiver_object.in_debt -= existing_amount
      else
        in_debt = nil
      end
      existing_receiver_object.update(in_credit: in_credit, in_debt: in_debt )
      existing_receiver =  BudgetUnit.find(existing_receiver_id)
    else
      existing_receiver = nil
    end
    if existing_sender_id != nil
      existing_sender_object = BudgetUnit.find(existing_sender_id)
      if existing_sender_object.in_credit !=nil
        in_credit = existing_sender_object.in_credit -= existing_amount
      else
        in_credit = nil
      end
      if existing_sender_object.in_debt !=  nil
        in_debt = existing_sender_object.in_debt += existing_amount
      else
        in_debt = nil
      end
      existing_sender_object.update(in_credit: in_credit, in_debt: in_debt )
      existing_sender = BudgetUnit.find(existing_sender_id)
    else
      existing_sender = nil
    end


    if Record.find(params[:id]).destroy()
      render json: {
          existing_receiver:  existing_receiver,
          existing_sender:    existing_sender,
          updated_income: updated_income
      }
    else
      render json: @record.errors, status: :unprocessable_entity
    end
  end

  private

  def record_params
    params.require(:record).permit(:name, :qty, :amount, :shop_name, :payment_method_id, :transfer_into_id, :record_type)
  end

end
