import React, {useContext, useState, useEffect} from "react";
import List from './List';
// get buses
  const getLocalStorage = () => {
  let buses = localStorage.getItem('buses');
  if(buses){
    return JSON.parse(localStorage.getItem('buses'))
  } else {
    return []
  }
}




const AppContext = React.createContext();

const AppProvider = ({children})=> {
  const[people, setPeople] = useState([]);
const[alert, setAlert] = useState({show: false, msg:'', type:''})
const [busData, setBusData] = useState(getLocalStorage());
const[selectedBusId, setSelectedBusId] = useState(null)
const [payDetails, setPayDetails] = useState([]);
 const [userIsAdmin, setUserIsAdmin] = useState(false);
 const [userLoggedIn, setUserLoggedIn] = useState(false);

useEffect(() => {
    const payment = JSON.parse(localStorage.getItem('paymentdetails')) ;
    if(payment && payment.length > 0) {

      setPayDetails(payment)
    }
  },[])
// payment

useEffect(()=> {
  localStorage.setItem('paymentdetails', JSON.stringify(payDetails))
  
},[payDetails])




const handleSelectedSeat = (busId) => {
setSelectedBusId(busId)
}

// get people sign up
useEffect(() => {
    const users = JSON.parse(localStorage.getItem('newClients')) ;
    if(users && users.length > 0) {

      setPeople(users);
    }
  },[])

  // Store people signup
useEffect (()=> {
    localStorage.setItem('newClients', JSON.stringify(people))
  }, [people])





  // store buses

  useEffect(()=> {
  localStorage.setItem('buses', JSON.stringify(busData))
  
},[busData])
    // alert
    const showAlert = (show=false,type='', msg='')=>{
  setAlert({show,type,msg});
}
    return(
        <AppContext.Provider value={{
          people,
          setPeople,
          payDetails,
          setPayDetails,
          alert,
          showAlert,
          busData,
          setBusData,
          handleSelectedSeat,
          selectedBusId,
          userIsAdmin,
          userLoggedIn,
          setUserLoggedIn
          
        }}>
            {children}
        </AppContext.Provider>
    )
    console.log(AppProvider);
}
export const useGlobalContext = () => {
    return(
    useContext(AppContext)
    )
}
export{AppContext, AppProvider}