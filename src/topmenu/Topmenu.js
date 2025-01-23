import './Topmenu.css'
import { useNavigate } from 'react-router-dom';
function Topmenu({ isDarkMode }) {
  const navigate = useNavigate();

  const handelLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const navigateToFeedPage = () => {
    navigate('/feedpage'); // Adjust this to your feed page route
  };
  return (
    <nav className={`navbar navbar-expand-lg bg-body-tertiary ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <i className="bi bi-facebook"></i>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <ul className="navbar-nav me-auto mb-6 mb-lg-0">
            <li className="nav-item">
              <button className="btn" onClick={navigateToFeedPage}><i className="bi bi-house fs-2"></i></button>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" ><i class="bi bi-people fs-2"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page"><i class="bi bi-collection-play fs-2"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page"><i class="bi bi-shop fs-2"></i></a>
            </li>
          </ul>
          <button onClick={handelLogOut} className="btn btn-outline-success">Logout</button>
          <a className='navbar-brand'>Hi {localStorage.getItem('nickname')}</a>
          <div className="profile-picture-container">
            <img className="profile-picture" id='profile_pic' src={localStorage.getItem('profilePic')} alt="Profile" />
          </div>

        </div>
      </div>
    </nav>

  );
}

export default Topmenu