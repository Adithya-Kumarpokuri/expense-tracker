// import React, { useEffect, useState, useContext } from "react";
// import {
//   Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, Typography
// } from "@mui/material";
// import { useGlobalContext } from '../../context/globalContext';

// const TransactionsTable = () => {
//   const {transactions,getTransactions} = useGlobalContext()
  
//       useEffect(() => {
//           if (localStorage.getItem('user')) {
//               const user = JSON.parse(localStorage.getItem('user'));
//               if (user && user._id){
//                   console.log(user._id)
//                   getTransactions(user._id); 
//               } else {
//                   console.error('Invalid user data in localStorage');
//               }
//           } else {
//               console.error('No user found in localStorage');
//           }
//       }, []);
//       const user = JSON.parse(localStorage.getItem('user'));
//   return (
//     <div style={{ padding: "24px" }}>
//       <Typography variant="h5" gutterBottom>
//         Combined Transactions
//       </Typography>

//       <TableContainer component={Paper} elevation={3}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>S.No</strong></TableCell>
//               <TableCell><strong>Amount</strong></TableCell>
//               <TableCell><strong>Date</strong></TableCell>
//               <TableCell><strong>Category</strong></TableCell>
//               <TableCell><strong>Type</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {transactions.length > 0 ? (
//               transactions.map((txn, index) => (
//                 <TableRow key={txn._id || index}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell style={{ color: txn.type === "income" ? "green" : "red" }}>
//                     {txn.type === "income" ? "+" : "-"}${txn.amount}
//                   </TableCell>
//                   <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
//                   <TableCell>{txn.category}</TableCell>
//                   <TableCell
//                     style={{
//                       fontWeight: "bold",
//                       color: txn.type === "income" ? "green" : "red",
//                     }}
//                   >
//                     {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   No transactions found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default TransactionsTable;
// import React, { useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Chip,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import { useGlobalContext } from "../../context/globalContext";
// import { rupee } from '../../utils/Icons';
// const TransactionsTable = () => {
//   const { Transactions, getTransactions } = useGlobalContext();

//   // useEffect(() => {
//   //   const user = JSON.parse(localStorage.getItem("user"));
//   //   if (user && user._id) {
//   //     getTransactions(user._id);
//   //   }
//   // }, []);
//   useEffect(()=>{
//   getTransactions();
//   })

//   const isValidArray = Array.isArray(Transactions);

//   return (
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
//         Transaction History
//       </Typography>

//       <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#f3e8ff" }}>
//             <TableRow>
//               <TableCell><strong>#</strong></TableCell>
//               <TableCell><strong>Amount</strong></TableCell>
//               <TableCell><strong>Date</strong></TableCell>
//               <TableCell><strong>Title</strong></TableCell>
//               <TableCell><strong>Description</strong></TableCell>
//               <TableCell><strong>Type</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {!isValidArray ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <CircularProgress size={24} /> Loading transactions...
//                 </TableCell>
//               </TableRow>
//             ) : Transactions.length > 0 ? (
//               Transactions.map((txn, index) => (
//                 <TableRow
//                   key={txn._id || index}
//                   hover
//                   sx={{
//                     "&:nth-of-type(odd)": {
//                       backgroundColor: "#faf5ff",
//                     },
//                   }}
//                 >
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell
//                     sx={{
//                       color: txn.type === "income" ? "green" : "red",
//                       fontWeight: 500,
//                     }}
//                   >
//                     {txn.type === "income" ? "+" : "-"}{txn.amount}.Rs
//                   </TableCell>
//                   <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
//                   <TableCell>{txn.title}</TableCell>
//                   <TableCell>{txn.description}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
//                       color={txn.type === "income" ? "success" : "error"}
//                       variant="outlined"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No transactions found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default TransactionsTable;
 
// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Chip,
//   Box,
//   CircularProgress,
//   TextField,
//   Grid,
//   Button,
//   MenuItem,
// } from "@mui/material";
// import { useGlobalContext } from "../../context/globalContext";
// import { rupee } from "../../utils/Icons";

// const TransactionsTable = () => {
//   const { Transactions, getTransactions } = useGlobalContext();

//   const [filters, setFilters] = useState({
//     startDate: "",
//     endDate: "",
//     type: "",
//     minAmount: "",
//     maxAmount: "",
//   });

//   const handleChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = () => {
//     console.log("loading")
//     getTransactions(filters);
//   };

//   useEffect(() => {
//     console.log("loading2")
//     getTransactions({});
//   }, []);

//   const isValidArray = Array.isArray(Transactions);

//   return (
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
//         Transaction History
//       </Typography>

//       {/* FILTERS */}
//       <Box mb={3}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={2}>
//             <TextField
//               name="startDate"
//               label="Start Date"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               fullWidth
//               value={filters.startDate}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <TextField
//               name="endDate"
//               label="End Date"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               fullWidth
//               value={filters.endDate}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <TextField
//               select
//               name="type"
//               label="Type"
//               fullWidth
//               value={filters.type}
//               onChange={handleChange}
//             >
//               <MenuItem value="">All</MenuItem>
//               <MenuItem value="income">Income</MenuItem>
//               <MenuItem value="expense">Expense</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <TextField
//               name="minAmount"
//               label="Min Amount"
//               type="number"
//               fullWidth
//               value={filters.minAmount}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <TextField
//               name="maxAmount"
//               label="Max Amount"
//               type="number"
//               fullWidth
//               value={filters.maxAmount}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               fullWidth
//             >
//               Apply Filters
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#f3e8ff" }}>
//             <TableRow>
//               <TableCell><strong>#</strong></TableCell>
//               <TableCell><strong>Amount</strong></TableCell>
//               <TableCell><strong>Date</strong></TableCell>
//               <TableCell><strong>Title</strong></TableCell>
//               <TableCell><strong>Description</strong></TableCell>
//               <TableCell><strong>Type</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {!isValidArray ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <CircularProgress size={24} /> Loading transactions...
//                 </TableCell>
//               </TableRow>
//             ) : Transactions.length > 0 ? (
//               Transactions.map((txn, index) => (
//                 <TableRow
//                   key={txn._id || index}
//                   hover
//                   sx={{
//                     "&:nth-of-type(odd)": {
//                       backgroundColor: "#faf5ff",
//                     },
//                   }}
//                 >
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell
//                     sx={{
//                       color: txn.type === "income" ? "green" : "red",
//                       fontWeight: 500,
//                     }}
//                   >
//                     {txn.type === "income" ? "+" : "-"}{txn.amount}.Rs
//                   </TableCell>
//                   <TableCell>{txn.date ? new Date(txn.date).toLocaleDateString() : "-"}</TableCell>
//                   <TableCell>{txn.title || "-"}</TableCell>
//                   <TableCell>{txn.description || "-"}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
//                       color={txn.type === "income" ? "success" : "error"}
//                       variant="outlined"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No transactions found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default TransactionsTable;

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  CircularProgress,
  TextField,
  Grid,
  Button,
  MenuItem,
} from "@mui/material";
import { useGlobalContext } from "../../context/globalContext";

const TransactionsTable = () => {
  const { Transactions, getTransactions } = useGlobalContext();

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    minAmount: "",
    maxAmount: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    // Convert dd-mm-yyyy → yyyy-mm-dd if needed
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
      const [dd, mm, yyyy] = dateStr.split("-");
      return `${yyyy}-${mm}-${dd}`;
    }
    return dateStr;
  };

  const handleSubmit = () => {
    const formattedFilters = {
      ...filters,
      startDate: formatDate(filters.startDate),
      endDate: formatDate(filters.endDate),
    };
    getTransactions(formattedFilters);
  };

  useEffect(() => {
    getTransactions({});
  }, []);

  const isValidArray = Array.isArray(Transactions);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Transaction History
      </Typography>

      {/* FILTERS */}
      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <TextField
              name="startDate"
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={filters.startDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              name="endDate"
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={filters.endDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              select
              name="type"
              label="Type"
              fullWidth
              value={filters.type}
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              name="minAmount"
              label="Min Amount"
              type="number"
              fullWidth
              value={filters.minAmount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              name="maxAmount"
              label="Max Amount"
              type="number"
              fullWidth
              value={filters.maxAmount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f3e8ff" }}>
            <TableRow>
              <TableCell><strong>#</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isValidArray ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} /> Loading transactions...
                </TableCell>
              </TableRow>
            ) : Transactions.length > 0 ? (
              Transactions.map((txn, index) => (
                <TableRow
                  key={txn._id || index}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#faf5ff",
                    },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    sx={{
                      color: txn.type === "income" ? "green" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {txn.type === "income" ? "+" : "-"}{txn.amount}.Rs
                  </TableCell>
                  <TableCell>
                    {txn.date
                      ? new Date(txn.date).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>{txn.title || "-"}</TableCell>
                  <TableCell>{txn.description || "-"}</TableCell>
                  <TableCell>
                    <Chip
                      label={txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                      color={txn.type === "income" ? "success" : "error"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionsTable;
