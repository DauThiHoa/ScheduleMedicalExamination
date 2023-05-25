 
import { push } from "connected-react-router";

import * as actions from "../../store/actions"; 
import { toast } from 'react-toastify';
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService';
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { emitter } from "../../utils/emitter";
import { createNewUserService } from '../../services/userService';

class Register extends Component {
    // KHAI BAO => HAM TAO
    constructor(props) {
        super(props); 
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '' ,
          //  SHow-hiden Password
          isShowPassword : false,
          errMessage: '',
        }
    this.listenToEmitter();
}

listenToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
        // reset state
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }) 
    })
}// bus event 
componentDidMount() {
    
}

handleOnChageInput = (event, id) => {

    // good code
    let copyState = { ... this.state };
    copyState[id] = event.target.value;
    this.setState({
        ...copyState
    });
}

checkValidateInput = () => {
    let isValid = true;
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
        console.log('check inside look', this.state[arrInput[i]], arrInput[i])
        if (!this.state[arrInput[i]]) {
            isValid = false;
            alert('Missing parameter: ' + arrInput[i]);
            break;
        }
    }
    return isValid;
}

handleAddNewUser = () => {
    // validate
    let isValid = this.checkValidateInput();
    if (isValid === true) {
        // call api create modal
        this.createNewUser(this.state);
    }

}

createNewUser = async (data) => {
    try {
        let response = await createNewUserService(data);
        if (response && response?.data.errCode !== 0) {
            alert(response?.data.errMessage)
            toast.error("You have not successfully registered")
        } else {
            toast.success("You have successfully registered")
        }
    } catch (e) {
        console.log(e)
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
    if (event.key === 'Enter'){
       this.handleLogin ();
    }

}

// HAM HIEN THI FORM => LOGIN LEN MAN HINH
    render() { 
  // => viet theo JSX
        return ( 
             <>

<div className="login-background">
                <div className="login-container" style={{height: '70%'}} >
                    <div className="login-content row"  >

                        <div className="col-12 text-login">
                                REGISTER 
                            </div>

                        <div className="col-12 form-group login-input">


                             <label>Email</label>
                            <input
                                type="text"   className="form-control"
                                onChange={(event) => { this.handleOnChageInput(event, "email") }}
                                value={this.state.email}
                            />
  
                        </div>

                        <div className="col-12 form-group login-input">
                            <label>Password: </label>
                            
                            <div className="custom-input-password">
                           
                            <input  
                              // HIEN THI GIA TRI USER NAME LEN FROM LOGIN
                              value={this.state.password} // MAC DINH TRONG FORM INPUT
                              // TAO HAM => THAY DOI GIA TRI KHI NHAP VAO FORM INPUT
                              onChange={(event) => { this.handleOnChageInput(event, "password") }}
                              onKeyDown={ (event) => this.handleKeyDown (event)}

                            //    Check dieu kien => true (text) => false (password)
                             type={this.state.isShowPassword ? 'text' : 'password'} 
                             className="form-control"  
                             placeholder='Enter your password'
                             
                             />
                                 
                            {/* SHOW PASSWORD - DISPLAY PASSWORD  */}
                            <span onClick={() => { this.handleShowHidePassword()}}>
                                {/* <i class="fas fa-eye-slash"></i> */}
                                <i className={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                            </span>
                                 
                            </div>
                        </div>


                        <div className="col-12 form-group login-input">
 
                            <label>Last Name</label>
                            <input type="text"   className="form-control"
                                onChange={(event) => { this.handleOnChageInput(event, "firstName") }}
                                value={this.state.firstName} /> 
  
                        </div>

                        <div className="col-12 form-group login-input">

 
                            <label>First Name</label>
                            <input type="text"   className="form-control"
                                onChange={(event) => { this.handleOnChageInput(event, "lastName") }}
                                value={this.state.lastName} /> 
  
                        </div>
                        <div className="col-12 form-group login-input">


                            <label>Address</label>
                            <input type="text"   className="form-control"
                                onChange={(event) => { this.handleOnChageInput(event, "address") }}
                                value={this.state.address} />
  
                        </div>


{/* BIEN HIEN THI HAM LOGIN */}
                        <div className="col-12" style= {{color : 'red'}}>
                                {this.state.errMessage}
                        </div>

                        <div className="col-12"> 
                            {/* TAO HAM handleLogin => LAY GIA TRI TRONG FORM INPUT*/}
                        <button className="btn-login"  onClick={() => { this.handleAddNewUser() }}>Register</button>
                        </div>
                        <div className="col-12 social-login">   
                                     <span className="forgot-password" > Do you already have an account ?<a href="/Login">Login in now</a></span>  
                                    
                                         
                        </div>
                      
                    </div>
                </div>

            </div>






              <div className="model-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChageInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Mật khẩu</label>
                            <input type="password"
                                onChange={(event) => { this.handleOnChageInput(event, "password") }}
                                value={this.state.password} />
                        </div>
                        <div className="input-container">
                            <label>Tên người dùng</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChageInput(event, "firstName") }}
                                value={this.state.firstName} />
                        </div>
                        <div className="input-container">
                            <label>Họ người dùng</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChageInput(event, "lastName") }}
                                value={this.state.lastName} />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Địa chỉ</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChageInput(event, "address") }}
                                value={this.state.address} />
                        </div>
                    </div>

                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => { this.handleAddNewUser() }}
                    >Thêm</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Thoát</Button>
               
             </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
