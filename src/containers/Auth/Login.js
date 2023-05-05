import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions"; 

import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService';


class Login extends Component {
    // KHAI BAO => HAM TAO
    constructor(props) {
        super(props); 
        this.state = {
          username: '',
          password:'',
          //  SHow-hiden Password
          isShowPassword : false,
          errMessage: '',
        }
    }

 // TAO HAM => THAY DOI GIA TRI USERNAME KHI NHAP VAO FORM INPUT
 handleOnChangeUsername = (event) => {
        // set lai cac bien username voi password
        this.setState ({
            username: event.target.value
        }) 

    }
    
 // TAO HAM => THAY DOI GIA TRI PASSWORD KHI NHAP VAO FORM INPUT
 handleOnChangePassword = (event) => {
    // set lai cac bien username voi password
    this.setState ({
        password: event.target.value
    }) 

}
// TAO HAM handleLogin => LAY GIA TRI TRONG FORM INPUT
handleLogin = async () => {
    this.setState({
        errMessage: ''
    })
   try {
        let data = await handleLoginApi (this.state.username, this.state.password); 
        if (data.data && data.data.errCode !== 0 ){
            this.setState({
                errMessage: data.data.message
            })
        }
        if (data.data && data.data.errCode === 0){
            // TODO => HIEN THI THONG BAO DANG NHAP THANH CONG
           this.props.userLoginSuccess(data.data.user)
            console.log('LOGIN SUCCEEDS!')
        } 

    } catch (error) {
        // HIEN BIEN LOI => LEN MAN HINH LOGIN
        if (error.response){
            if (error.response.data){
                this.setState({
                    errMessage : error.response.data.data.message  
                })
            }
        }  
        console.log ('Error: ', error.response)
    } 
}

// SHOW PASSWORD - DISPLAY PASSWORD 
handleShowHidePassword = () => {
    this.setState({
        // Click la lay gia tri nguoc lai voi hien tai
        isShowPassword: !this.state.isShowPassword
    })
}
handleKeyDown = (event) => {
    console.log ('Hoi danIt channel check KeyDown : ' , event)
    if (event.key === 'Enter'){
       this.handleLogin ();
    }

}

// HAM HIEN THI FORM => LOGIN LEN MAN HINH
    render() { 
  // => viet theo JSX
        return ( 
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">LOGIN</div>
                        <div className="col-12 form-group login-input">
                            <label>Username: </label>
                            <input  
                            // HIEN THI GIA TRI USER NAME LEN FROM LOGIN
                            value={this.state.username} // MAC DINH TRONG FORM INPUT
                            // TAO HAM => THAY DOI GIA TRI KHI NHAP VAO FORM INPUT
                           
                            onkeyDown= {(event) => this.handleShowHidePassword ()}
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"></input>
                        </div>

                        <div className="col-12 form-group login-input">
                            <label>Password: </label>
                            
                            <div className="custom-input-password">

                            <input  
                              // HIEN THI GIA TRI USER NAME LEN FROM LOGIN
                              value={this.state.password} // MAC DINH TRONG FORM INPUT
                              // TAO HAM => THAY DOI GIA TRI KHI NHAP VAO FORM INPUT
                              onChange={(event) => this.handleOnChangePassword(event)}
                              onKeyDown={ (event) => this.handleKeyDown (event)}

                            //    Check dieu kien => true (text) => false (password)
                             type={this.state.isShowPassword ? 'text' : 'password'} className="form-control"  placeholder='Enter your password'></input>
                            {/* SHOW PASSWORD - DISPLAY PASSWORD  */}
                            <span onClick={() => { this.handleShowHidePassword()}}>
                                {/* <i class="fas fa-eye-slash"></i> */}
                                <i className={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                            </span>
                                 
                            </div>
                        </div>

{/* BIEN HIEN THI HAM LOGIN */}
                        <div className="col-12" style= {{color : 'red'}}>
                                {this.state.errMessage}
                        </div>

                        <div className="col-12">
                            {/* TAO HAM handleLogin => LAY GIA TRI TRONG FORM INPUT*/}
                        <button className="btn-login" onClick={() => {this.handleLogin()}}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login With: </span>
                        </div>

                        <div className="col-12 social-login">
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

// HAM REACT => HAM CHUYEN DOI NGON NGU
const mapStateToProps = state => {
    return { 
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        // THONG BAO DA DANG NHAP THANH CONG
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
