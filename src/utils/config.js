const getTokenFromLocalStorage = localStorage.getItem("admintoken");

// Remove any extra quotes and escape characters
const cleanToken = getTokenFromLocalStorage ? getTokenFromLocalStorage.replace(/^"|"$/g, '').replace(/\\/g, '') : "";

// Set up config headers with the cleaned token
export const config = {
  headers: {
    Authorization: `Bearer ${cleanToken}`,
    Accept: "application/json",
  },
};

// console.log(getTokenFromLocalStorage) 

export const isLoggedIn = ()=>{
  return getTokenFromLocalStorage == null ? false : true
}


const getEmployeeToken = localStorage.getItem("employeetoken");
export const isEmployee = ()=>{
  return getEmployeeToken == null ? false : true
}

console.log(getEmployeeToken)