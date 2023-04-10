import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';

class UserManage extends Component {
    //check ham constructor
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');

        console.log('responseresponseresponse', response);
        if (response && response.data.errCode === 0) {
            console.log('response.users', response.users);
            this.setState({
                arrUsers: response.data.users
            })
            // , () => {
            //     console.log('check state users :', this.state.arrUsers);
            //   });
            // console.log('check state users1 :', this.state.arrUsers);//[]
        }
        // console.log('get user from node.js:', response)
    }

    /** life cycle
     * Run component
     * 1. Run construct -> init state
     * 2. Did mount (set state)
     * 3. Render
    */

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className='title text-center'> Manage users with Eric</div>
                <div className='users-table mt-3 mx-1'>
                    <table id='customers'>
                        <tr>
                            <th>Email</th>
                            <th>Frist name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {arrUsers && arrUsers.map((item, index) => {
                            console.log('eric check map', item, index)
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        }


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
