import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavigationBar from "./Components/NavigationBar"
import Footer from "./Components/Footer"
import Dashboard from "./Pages/Dashboard"
import SignIn from "./Pages/SignIn"
import Profile from "./Pages/Profile"
import Buy from "./Pages/Buy"
import Rent from "./Pages/Rent"
import PostProperty from "./Pages/PostProperty"
import SignUp from "./Pages/SignUp"
import PrivateRoute from "./Components/PrivateRoute"
import BuyPropertyDetails from "./Pages/BuyPropertyDetails"
import RentPropertyDetails from "./Pages/RentPropertyDetails"
import MyProperties from "./Pages/MyProperties"





function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar/>
        <Routes>

            <Route path="/" element={<Dashboard/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            
            <Route path="/buy" element={<Buy/>}/>
            <Route path="/rent" element={<Rent/>}/>
            <Route path="/post-property" element={<PostProperty/>}/>
            <Route path="/buy-property/:id" element={<BuyPropertyDetails />} />
            <Route path="/rent-property/:id" element={<RentPropertyDetails />} /> 
            <Route path="/my-properties" element={<MyProperties />} /> 

            <Route element={<PrivateRoute/>}>
              <Route path="/profile" element={<Profile/>} />
            </Route>
              
            
            
        </Routes>
           
        <Footer/>
      </BrowserRouter>
    </>
    
  )
}

export default App
