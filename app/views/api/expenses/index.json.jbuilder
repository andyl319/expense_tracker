@expenses.each do |expense|
  json.set! expense.id do
    json.extract! @expense,
      :id,
      :user,
      :amount,
      :description,
      :time,
      :user_id

    end
  end
