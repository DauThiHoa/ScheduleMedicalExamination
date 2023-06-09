import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
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


    toggle = () => {
        this.props.toggleFromParent();
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
            this.props.createNewUser(this.state);
        }

    }
    

    render() {
        // console.log('check child props', this.props);
        // console.log('check child open modal', this.props.isOpen);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={"model-user-container"}
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}>Thêm mới người dùng kkkkkkkkkkkkkkkkkkkkk</ModalHeader>
                <ModalBody>
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

                </ModalBody>
                <ModalFooter>
                  
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => { this.handleAddNewUser() }}
                    >Thêm</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Thoát</Button>
               
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
