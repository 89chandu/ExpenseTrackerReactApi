import React, { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from './Context/globalContext';

const SingleExpense = (props) => {
    const { amountRef, descriptionRef, categoryRef } = useContext(GlobalContext);

    const [editedAmount, setEditedAmount] = useState(props.amount);
    const [editedDescription, setEditedDescription] = useState(props.description);
    const [editedCategory, setEditedCategory] = useState(props.category);

    const editHandler = () => {
        setEditedAmount(props.amount);
        setEditedDescription(props.description);
        setEditedCategory(props.category);
    };

    const deleteHandler = async (e) => {
        e.preventDefault();
        try {
            props.setExpenses((state) => {
                return state.filter((item) => {
                    return item._id !== props._id;
                });
            });

            await axios.delete(`https://expensetracker-dc91c-default-rtdb.firebaseio.com/expenses/${props._id}.json`);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='min-h-[70px] p-4 flex justify-between items-center text-2xl text-gray-800 border-b border-gray-400' >
            <span className='font-bold'>{props.description}</span>
            <div>
                <span className='text-red-800 font-bold p-4'> Rs. {props.amount}</span>
                <button onClick={editHandler} className='border rounded-md p-1 pl-2 pr-2 text-lg bg-blue-800 text-white m-2'>Edit</button>
                <button onClick={deleteHandler} className='border rounded-md p-1 pl-2 pr-2 text-lg bg-red-900 text-white'>Delete</button>
            </div>
        </div>
    );
};

export default SingleExpense;
