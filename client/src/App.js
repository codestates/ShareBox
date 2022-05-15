import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Signup from './pages/Signup'
import Title from './components/Title';
import Main from './pages/Main';


function App() {

  return ( 
    // <BrowserRouter>
    //   <Routes>
    //     <Route path = '/signup' element = {<Signup />} />
    //   </Routes>

    // <Link to ='/signup'> 
    //   <button> 이동 </button>
    // </Link>    
    // </BrowserRouter>
    <div>

 
      <Main />
      {/* <Signup /> */}
    </div>
  )

}

export default App;
