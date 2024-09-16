import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            
            
            if(localStorage.getItem('user')){
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user._id) {
                await getIncomes(user._id);  
            } else {
                console.error('No valid userId found in localStorage');
            }
        }
        } catch (err) {
            setError(err.response.data.message);
        }
    }
    const getIncomes= async (userId) => {
        console.log("correction",userId)
        try {
         
            const response = await axios.get(`${BASE_URL}get-incomes`, {
                params: { userId }  
            });
            setIncomes(response.data);  
            console.log(response.data);  
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };
    const deleteIncome = async (id,userId) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}/${userId}`)
        if(localStorage.getItem('user')){
            const user = JSON.parse(localStorage.getItem('user'));
            if (user._id){
                 await getIncomes(user._id); 
            } else {
                console.error('No valid userId found in localStorage');
            }
        }
    }
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


   
    const addExpense = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-expense`, income);
            
        
            if(localStorage.getItem('user')){
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user._id) {
                await getExpenses(user._id);  
            } else {
                console.error('No valid userId found in localStorage');
            }
        }
        } catch (err) {
            setError(err.response.data.message);
        }
    }
    const getExpenses = async (userId) => {
        console.log("correction",userId)
        try {
           
            const response = await axios.get(`${BASE_URL}get-expenses`, {
                params: { userId }  
            });
            setExpenses(response.data);  
            console.log(response.data);  
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };
    const deleteExpense = async (id,userId) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}/${userId}`)
        if(localStorage.getItem('user')){
            const user = JSON.parse(localStorage.getItem('user'));
            if (user._id){
                 await getExpenses(user._id); 
            } else {
                console.error('No valid userId found in localStorage');
            }
        }
    }

    const totalExpenses = () =>{
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}