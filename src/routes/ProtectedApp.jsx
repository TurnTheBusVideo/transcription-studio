import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Home from './Home';

function ProtectedApp({ userData }) {
    return (
        <>
            <ToastProvider placement='bottom-center' >
                <div className="d-flex flex-column app-ctr-lvl-1">
                    <Navbar bg="light" expand="lg" sticky="top" className="top-nav" >
                        <Navbar.Brand>
                            <img alt="Turn the bus Logo" className="nav-logo" src="https://turnthebus.org/images/turn-the-bus-logo.png" />
                             Transcription Studio
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav defaultActiveKey="/transcription-studio" className="mr-auto">
                                <Nav.Item className='nav-link'>
                                    <NavLink activeClassName="active-top-route" to="/transcription-studio" >Transcribe</NavLink>
                                </Nav.Item >
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <ProtectedAppBody />
                </div>
            </ToastProvider>
        </>
    );
}

const ProtectedAppBody = ({ userData }) => {
    return (

        <main className='flex-grow-1' style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        }}>
            <Switch>
                <Route path="/*">
                    <Home />
                </Route>
            </Switch>
        </main>
    )
}

export default ProtectedApp;
