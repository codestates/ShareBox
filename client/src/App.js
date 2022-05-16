import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Signup from './pages/Signup'
import Title from './components/Title';
import Main from './pages/Main';
import Record from "./pages/Records";
import MyPage from "./pages/Mypage";


function App() {

  return ( 
    <BrowserRouter>
      <Routes>
        <Route path = '/signup' element = {<Signup />} />
        <Route path = '/' element = {<Main />} />
        <Route path = '/mypage' element = {<MyPage />} />
        <Route path = '/record' element = {<Record />} />
      </Routes>

    <Link to = '/signup'> 
      <button> 회원가입 </button>
    </Link>    
    <Link to = '/record'>
      <button> 상품등록 </button>
    </Link>

    <Link to = '/mypage'>
      <button> 내 정보 </button>
    </Link>
    
    <Link to = '/'>
      <button> 메인 </button>
    </Link>
  
    </BrowserRouter>
  )
}

export default App;
