import './App.css';
import Login from './login/Login';
import Signup from './signup/Signup';
import Feedpage from './feedpage/Feedpage';
import Comments from './comments/Comments';
import UserDetails from './userDetails/UserDetails';
import FriendDetails from './friendDetails/FriendDetails';
import Profile from './profile/Profile';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


function App() {
  const isAuthenticated = () => {
     return sessionStorage.getItem('isAuthenticated') === 'true';
  };

  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path='/feedpage' element={<Feedpage />} />
            <Route path='/comments' element={<Comments />} />
            <Route path='/userDetails' element={<UserDetails />} />
            <Route path='/friendDetails' element={<FriendDetails />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;
