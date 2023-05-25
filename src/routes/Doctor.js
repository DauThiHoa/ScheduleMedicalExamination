import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom'; 
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';

class Doctor extends Component {
    render() {
 

        const { isLoggedIn} = this.props;
        return (
            <React.Fragment>
                {/* Phan header => Hien thi login- trang chu */}
                {isLoggedIn && <Header />} 

            <div className="Doctor-container">
                <div className="Doctor-list">
                    <Switch> 
                        {/* component={ManageSchedule}  => LINK DEN ManageSchedule*/}
                        <Route path="/doctor/manage-schedule" component={ManageSchedule} /> 
                        <Route path="/doctor/manage-patient" component={ManagePatient} />
                        <Route path="/system/manage-doctor" component={ManageDoctor} />
                    </Switch>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        DoctorMenuPath: state.app.DoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
