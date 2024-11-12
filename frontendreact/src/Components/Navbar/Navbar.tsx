import React from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../../globalData/store';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const isLoggedIn = !!store.loggedInUser?.userId;
    const isAdmin = store.loggedInUser?.role == "admin";

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            store.loggedInUser = null;  // Clear user
            navigate('/');  // Redirect to login page
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Reimbursement Tracker</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                     <ul className="navbar-nav ms-auto">
                        {/* Home Button (Always Visible) */}
                        <li className="nav-item">
                            <button className="btn btn-light me-2" onClick={() => navigate('/')}>
                                Home
                            </button>
                        </li>

                        {/* Conditional Rendering based on User Authentication */}
                        {isLoggedIn && (
                            <>
                                {/* Employees (Only for Admin) */}
                                {isAdmin && (
                                    <li className="nav-item">
                                        <button className="btn btn-light me-2" onClick={() => navigate('/employees')}>
                                            Employees
                                        </button>
                                    </li>
                                )}
                                {/* Reimbursements Page (for logged in users) */}
                                <li className="nav-item">
                                    <button className="btn btn-light me-2" onClick={() => navigate('/reimbursements')}>
                                        Reimbursements
                                    </button>
                                </li>

                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>

                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}