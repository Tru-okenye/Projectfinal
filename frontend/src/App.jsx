import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Bus from './Bus';
import Booking from './Booking';
import Booked from './Booked';
import Seats from './Seats';
import Payment from './Payment';
import List from './List';
import Ticket from './Ticket';
import VerifyEmail from './VerifyEmail';
import UpdateBusForm from './Update';
import CreateBusForm from './Create';
import {Content} from './Content';
import Mpesa from './Mpesa';
import {Map} from './Map';
function App () {
   const [userLoggedIn, setUserLoggedIn] = useState(false);
return (
  <main>
   


<BrowserRouter >
<Routes>

      
        <Route path="/" element={<Home userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}  />} >
          <Route index element={<Bus />} />
          <Route path="signup" element={<SignUp/>} />
          <Route path="signin" element={<SignIn />} />
          {/* <Route path='/emailconfirmation' element={<EmailConfirmation/>}/> */}
             <Route path="/verify" component={VerifyEmail} />
          <Route path="booking" element={<Booking/>}/>
          <Route path="booked" element={<Booked/>}/>
          <Route path="payment-details" element={<Payment/>}/>
          <Route path="list" element={<List/>}/>
          <Route path="/update/:id" element={<UpdateBusForm/>}/>
          <Route path="create" element={<CreateBusForm/>}/>
          <Route path="content" element={<Content/>}/>
           <Route path="ticket" element={<Ticket/>}/>
           <Route path="mpesa" element={<Mpesa/>}/>
           <Route path="map" element={<Map/>}/>
          <Route path='/seats/:totalSeats' element={<Seats/>}/>
        </Route>
      
</Routes>
    </BrowserRouter>


  </main>
)

};

export default App;

