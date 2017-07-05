class Setting < ApplicationRecord
  belongs_to :budget_unit, { :optional => true}
  accepts_nested_attributes_for (:budget_unit)
  belongs_to :category
end
