import './Leftmenu.css'
import { useNavigate } from 'react-router-dom';
function Leftmenu({ isDarkMode }) {
    const navigate = useNavigate();

    const HandleProfile = () => {
            navigate('/profile');
        
    };

    return (
        <div className={`top-menu ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="list-group" id="list-tab" role="tablist">
            <a className="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home" >Home</a>
            <a className="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile"  onClick={HandleProfile}>Profile</a>
            <a className="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Messages</a>
            <a className="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">Settings</a>
        </div>
        </div>
    );
}

export default Leftmenu