require 'test_helper'

class RecurringExpensesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get recurring_expenses_create_url
    assert_response :success
  end

  test "should get update" do
    get recurring_expenses_update_url
    assert_response :success
  end

  test "should get delete" do
    get recurring_expenses_delete_url
    assert_response :success
  end

end
