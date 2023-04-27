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

import Header from './Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './HomePage/HomePage.js';

import CustomScrollbars from '../components/CustomScrollbars';
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
                        {this.props.isLoggedIn && <Header />}
                        <span className="content-container">
                            <CustomScrollbars style={{height: '100vh', width: '100%'}}>
                            <Switch>
                                {/* NEU KHONG LOGIN => TRUE => TRANG HOME */}
                                <Route path={path.HOME} exact component={(Home)} />
                                {/* KIEM TRA FROM DANG NHAP */}
                                {/* path.LOGIN => DUONG LINK HIEN THI TOI FILE */}
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.HOMEPAGE} component={HomePage} />

                            </Switch>
                            </CustomScrollbars>
                        </span>

                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
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