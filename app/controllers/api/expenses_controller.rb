class Api::ExpensesController < ApplicationController

  def index
    if(current_user.admin)
      @expenses = Expense.all
    else
      @expenses = Expense.find_by_user_id(current_user.id)
    end
  end

  def show
    @expense = Expense.find_by_id(params[:id])
  end

  def create
    @expense = Expense.new(expense_params)
    @expense.user_id = current_user.id

    if @expense.save
      render "api/expenses/show"
    else
      render json: @expense.errors.full_messages, status: 422
    end
  end

  def destroy
    @expense = Expense.find(params[:id])

    if @expense.destroy
      render :index
    else
      render json: @expense.errors.full_messages, status: 422
    end
  end

  def update
    @expense = Expense.find(params[:id])
    
    if @expense.update(expense_params)
      render "api/expenses/show"
    else
      render json: @expense.errors.full_messages, status: 422
    end
  end

  private

  def expense_params
    params.require(:expense).permit(:amount, :description, :time)
  end
end
