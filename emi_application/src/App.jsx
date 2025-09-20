import './App.css'
import { EMI } from './Components/emi'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import { User_list } from './Components/User_list';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

function App() {


  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<EMI/>}></Route>
        <Route path='/user_list' element={<User_list/>}></Route>
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
