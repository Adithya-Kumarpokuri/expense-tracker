import React, { useContext, useState } from "react"
import axios from 'axios'
import { transactions } from "../utils/Icons";


//const BASE_URL = "http://localhost:5000/api/v1";


const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1`;

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [Transactions,setTransactions]=useState([])
    const [limit,setlimit]=useState(null)
    //calculate incomes
    // const addIncome = async (income) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}add-income`, income);
            
            
    //         if(localStorage.getItem('user')){
    //         const user = JSON.parse(localStorage.getItem('user'));
    //         if (user && user._id) {
    //             await getIncomes(user._id);  
    //         } else {
    //             console.error('No valid userId found in localStorage');
    //         }
    //     }
    //     } catch (err) {
    //         setError(err.response.data.message);
    //     } 
    // }
    // const getIncomes= async (userId) => {
    //     console.log("correction",userId)
    //     try {
         
    //         const response = await axios.get(`${BASE_URL}get-incomes`, {
    //             params: { userId }  
    //         });
    //         setIncomes(response.data);  
    //         console.log(response.data);  
    //     } catch (error) {
    //         console.error('Error fetching expenses:', error);
    //     }
    // };
    // const deleteIncome = async (id,userId) => {
    //     const res  = await axios.delete(`${BASE_URL}delete-income/${id}/${userId}`)
    //     if(localStorage.getItem('user')){
    //         const user = JSON.parse(localStorage.getItem('user'));
    //         if (user._id){
    //              await getIncomes(user._id); 
    //         } else {
    //             console.error('No valid userId found in localStorage');
    //         }
    //     }
    // }
    // const getTransactions= async (userId) => {
    //     console.log("correction transaction",userId)
    //     try {
    //         const response = await axios.get(`${BASE_URL}get-transactions`, {
    //             params: { userId }  
    //         });
    //         setTransactions(response.data);  
    //         console.log(response.data);  
    //     } catch (error) {
    //         console.error('Error fetching Transactions:', error);
    //     }
    // };
    // const totalIncome = () => {
    //     let totalIncome = 0;
    //     incomes.forEach((income) =>{
    //         totalIncome = totalIncome + income.amount
    //     })

    //     return totalIncome;
    // }


   
    // const addExpense = async (income) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}add-expense`, income);
            
        
    //         if(localStorage.getItem('user')){
    //         const user = JSON.parse(localStorage.getItem('user'));
    //         if (user && user._id) {
    //             await getExpenses(user._id);  
    //         } else {
    //             console.error('No valid userId found in localStorage');
    //         }
    //     }
    //     } catch (err) {
    //         setError(err.response.data.message);
    //     }
    // }
    // const getExpenses = async (userId) => {
    //     console.log("correction",userId)
    //     try {
           
    //         const response = await axios.get(`${BASE_URL}get-expenses`, {
    //             params: { userId }  
    //         });
    //         setExpenses(response.data);  
    //         console.log(response.data);  
    //     } catch (error) {
    //         console.error('Error fetching expenses:', error);
    //     }
    // };
    // const deleteExpense = async (id,userId) => {
    //     const res  = await axios.delete(`${BASE_URL}delete-expense/${id}/${userId}`)
    //     if(localStorage.getItem('user')){
    //         const user = JSON.parse(localStorage.getItem('user'));
    //         if (user._id){
    //              await getExpenses(user._id); 
    //         } else {
    //             console.error('No valid userId found in localStorage');
    //         }
    //     }
    // }
    
    // const totalExpenses = () =>{
    //     let totalIncome = 0;
    //     expenses.forEach((income) =>{
    //         totalIncome = totalIncome + income.amount
    //     })
    //     return totalIncome;
    // }


    // const totalBalance = () => {
    //     return totalIncome() - totalExpenses()
    // }

    // const transactionHistory = () => {
    //     const history = [...incomes, ...expenses]
    //     history.sort((a, b) => {
    //         return new Date(b.createdAt) - new Date(a.createdAt)
    //     })

    //     return history.slice(0, 3)
    // }
   const token = localStorage.getItem("token");
const authHeader = { headers: { Authorization: `Bearer ${token}` } };
  console.log(token)
// ======================= Income ============================
const addIncome = async (income) => {
    try {
        const token = localStorage.getItem("token");
        const authHeader = { headers: { Authorization: `Bearer ${token}` } };
       console.log(token)
        await axios.post(`${BASE_URL}/add-income`, income, authHeader);
        await getIncomes();
    } catch (err) {
        setError(err.response?.data?.message || "Failed to add income");
    }
};

const getIncomes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-incomes`, authHeader);
        setIncomes(response.data);
    } catch (error) {
        console.error("Error fetching incomes:", error);
    }
};

const deleteIncome = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/delete-income/${id}`, authHeader);
        await getIncomes();
    } catch (err) {
        console.error("Error deleting income:", err);
    }
};

// ======================= Expense ============================
const addExpense = async (expense) => {
    try {
        await axios.post(`${BASE_URL}/add-expense`, expense, authHeader);
        await getExpenses();
    } catch (err) {
        setError(err.response?.data?.message || "Failed to add expense");
    }
};

const getExpenses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-expenses`, authHeader);
        setExpenses(response.data);
    } catch (error) {
        console.error("Error fetching expenses:", error);
    }
};

const deleteExpense = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/delete-expense/${id}`, authHeader);
        await getExpenses();
    } catch (err) {
        console.error("Error deleting expense:", err);
    }
};

//======================= Transactions ============================
// const getTransactions = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}get-transactions`, authHeader);
//         setTransactions(response.data);
//     } catch (error) {
//         console.error("Error fetching transactions:", error);
//     }
// };

const getTransactions = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") {
        params.append(key, value);
      }
    });

    const url = `${BASE_URL}/get-transactions?${params.toString()}`;
    console.log("Request URL:", url);

    const response = await axios.get(url, authHeader);
    console.log("Response data:", response.data);
    setTransactions(response.data);
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};
   
const SetLimit = async (limit) => {
    try {
        await axios.put(`${BASE_URL}/setlimit`,{limit}, authHeader);
        console.log("added",limit);
        await GetLimit();
    } catch (err) {
        setError(err.response?.data?.message || "Failed to add limit");
    }
};

const GetLimit = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getlimit`, authHeader);
        console.log("the response for limit",response.data)
         setlimit({ amount: response.data.limit });
    } catch (error) {
        console.error("Error fetching limit:", error);
    }
};


// ======================= Calculations ============================
const totalIncome = () => incomes.reduce((sum, income) => sum + income.amount, 0);
const totalExpenses = () => expenses.reduce((sum, expense) => sum + expense.amount, 0);
const totalBalance = () => totalIncome() - totalExpenses();

const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
};


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            Transactions,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            getTransactions,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            SetLimit,
            GetLimit,
            limit
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}