import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService } from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {
    //check ham constructor
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();

    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.data.errCode === 0) {
            this.setState({
                arrUsers: response.data.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    /** life cycle
     * Run component
     * 1. Run construct -> init state
     * 2. Did mount (set state):born: unmount
     * 3. Render(re-render)
    */

    render() {
        let arrUsers = this.state.arrUsers;
        console.log(arrUsers)
        //properties: nested
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className="title text-center"> Manage users with Eric</div>
                <div className="mx-1">
                    <button
                        className="btn-btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    ><i className='fas fa-plus'></i> Add new users</button>

                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>

                            <tr>
                                <th>Email</th>
                                <th>Frist name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div >
        );


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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);