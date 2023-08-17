import React, { useState, useEffect } from 'react';
import Header from '../Header';
import ExpenseForm from '../ExpenseForm';
import SingleExpense from '../SingleExpenses';
import { BsCalendar2Event } from 'react-icons/bs';
import axios from 'axios';

const Main = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getFromDB = async () => {
      try {
        const response = await axios.get('https://expensetracker-dc91c-default-rtdb.firebaseio.com/expenses.json');
        setExpenses(Object.values(response.data));

      } catch (error) {
        console.log(error);
      }
    };
    getFromDB();
  }, []);

  const expensesArr = expenses.map((expense) => {
    return (
      <SingleExpense
        key={expense._id}
        amount={expense.amount}
        description={expense.description}
        userId={expense.userId}
        _id={expense._id}
        setExpenses={setExpenses}
        category={expense.category}
      />
    );
  });

  return (
    <div className="">
      <Header />
      <div className="flex mt-9 ">
        <div className="flex-1">
          <ExpenseForm setExpenses={setExpenses} />
        </div>
        <div className="flex-1 ">
          <div className="max-w-[700px] min-h-[700px] rounded-md border border-black mx-auto ">
            <div className="border-b p-2 h-[80px] flex justify-center text-3xl items-center border-t border-gray-400  ">
              <span className="p-3">{<BsCalendar2Event />}</span>
              <span className="p-3">Your Expenses History</span>
            </div>
            {expensesArr}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
