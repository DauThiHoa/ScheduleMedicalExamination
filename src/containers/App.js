import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

// import Home => HIEN THI TRANG HOME.JS
import Home from '../routes/Home';
// import Login => Hien Thi Trang Login.js
// import Login from '../routes/Login';
import Login from './Auth/Login';
 
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './HomePage/HomePage.js';
import Register from './Auth/Register';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import CustomScrollbars from '../components/CustomScrollbars';
import Doctor from '../routes/Doctor';
import VerifyEmail from './Patient/VerifyEmail';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };
// => HIEN VIEW 
    componentDidMount() {
        this.handlePersistorState();
    }
// NHUC LENH JS => VAO FILE HTML
    render() {
        return (
            <Fragment>
                {/* LAY DU LIEU FONTEND */}
                <Router history={history}>
                    <div className="main-container">
                        {/* <ConfirmModal />  */}
                        {/* {this.props.isLoggedIn && <Header />} */}
                        <span className="content-container">
                            <CustomScrollbars style={{height: '100vh', width: '100%'}}>
                            <Switch> Register
                                {/* NEU KHONG LOGIN => TRUE => TRANG HOME */}
                                <Route path={path.HOME} exact component={(Home)} />
                                {/* KIEM TRA FROM DANG NHAP */}
                                {/* path.LOGIN => DUONG LINK HIEN THI TOI FILE */}
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.HOMEPAGE} component={HomePage} />
                                 
                                <Route path={path.REGISTER} component={Register} />

                                {/* link den thong tin chi tiet cua bac si => Them Id*/}
                                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />

                                <Route path={path.DETAIL_SPCIALTY} component={DetailSpecialty} />
                                {/* LINK CHI TIET PHONG KHAM */}
                                <Route path={path.DETAIL_CLINIC} component={DetailClinic} />

                                <Route path={'/doctor'} component={userIsAuthenticated(Doctor)} />
                                 
                                 {/* LINK XAC NHAN DAT LICH KHAM BENH */}
                                 <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />

                            </Switch>
                            </CustomScrollbars>
                        </span>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}


<ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
// theme="light"
/>

{/* <ToastContainer /> */}

                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);