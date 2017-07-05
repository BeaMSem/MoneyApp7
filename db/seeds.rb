# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


settings_categories = ['Income', 'Revolving Credits', 'Instalment Credits', 'Savings']

recurring_expenses = %w(Housing Utilities Car/Transport Food/Household Internet/Mobile/Tv Children/Education Subscriptions Other)


settings_categories.each do |name|

      category = Category.create(
                             :name =>  name
      )
end

recurring_expenses.each do |name|

      category = RecurringExpenseCategory.create(
          :name =>  name
      )
end


      # settings =[{
      #
      #            },{
      #                 :name => "Barcleys Credit Card",
      #                 :category_id => 2,
      #                 :category_name => 'Revolving Credits',
      #                 :total => 2500,
      #                 :balance  => 100,
      #                 :payment     => 50
      #            },{
      #                 :name => "Pay Pal",
      #                 :category_id => 2,
      #                 :category_name => 'Revolving Credits',
      #                 :total => 3200,
      #                 :balance  => 1400,
      #                 :payment     => 50
      #            },{
      #                 :name => "Pay Pal",
      #                 :category_id => 2,
      #                 :category_name => 'Revolving Credits',
      #                 :total => 3200,
      #                 :balance  => 1400,
      #                 :payment     => 50
      #            },{}]


            # setting =  Setting.create(
            #         :name => "Miś",
            #         :category_id => 1,
            #         :category_name => 'Income',
            #         :total => 4000,
            #         :balance  => nil,
            #         :payment     => nil
            # )
            # category.settings << setting
            #
            # factory = BudgetUnitFactory.new
            # budget_unit_with_factory = BudgetUnitClass.new(factory)
            # budget_unit_object = budget_unit_with_factory.create_with_setting(setting)
            # if setting.category_name == 'Income'
            #     budget_unit_model =  BudgetUnit.where(is_income: true).first
            #     if budget_unit_model
            #             budget_unit_model.update(budget_unit_object.as_json)
            #     else
            #             budget_unit_model = BudgetUnit.create(budget_unit_object.as_json)
            #     end
            # else
            #     budget_unit_model = BudgetUnit.create(budget_unit_object.as_json)
            # end
            # budget_unit_model.settings << setting




# # expenses records
# 3.times do |i|
#       Record.create(
#           :name => "expense #{i}",
#           :qty => 1,
#           :amount => 100,
#           :shop => 'T',
#           :payment_method_id => 1,
#           :transfer_into_id =>  nil,
#           :record_type => 'expense_record'
#       )
# end
# # transfer records
# 3.times do |i|
#       Record.create(
#           :name => "credit card repayment#{i}",
#           :qty => nil,
#           :amount => 100,
#           :shop => nil,
#           :payment_method_id => 1,
#           :transfer_into_id =>  2,
#           :record_type => 'transfer_record'
#       )
# end
# # transfer records
# 3.times do |i|
#       Record.create(
#           :name => "occasional income#{i}",
#           :qty => nil,
#           :amount => 100,
#           :shop => nil,
#           :payment_method_id => nil,
#           :transfer_into_id =>  nil,
#           :record_type => 'occasional_income_record'
#       )
# end







# expenses_categories = ['Income', 'Revolving Credits', 'Instalment Credits', 'Savings']
#
# expenses_categories.each do |category|
#   3.times do |i|
#     Setting.create(
#         :name => "Entry #{i}",
#         :category => category,
#         :total => 1000,
#         :balance  => 100,
#         :payment     => 50
#     )
#   end
# end