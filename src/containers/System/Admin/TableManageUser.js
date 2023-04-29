import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
    //check ham constructor
    constructor(props) {
        super(props);
        this.state = {
            userRedux : []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }
    
    componentDidUpdate (prevProps,  prevState, snapshot) {
        if ( prevProps.listUsers !== this.props.listUsers){
            this.setState ({
                userRedux: this.props.listUsers
            })
        }
    }
// XOA NGUOI DUNG
handleDeleteUser = (user) => {
    this.props.deleteUserRedux ( user.id);
}
    render() { 
            console.log ( 'Hoi Dan It Check Users : ' + this.props.listUsers)
            console.log ( 'Hoi Dan It Check Users1 : ' + this.props.userRedux)
            let arrUsers = this.state.userRedux;

        return ( 
            
                    <table id='TableManageUser'>
                        <tbody>

                            <tr>
                                <th>Email</th>
                                <th>Frist name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                           { arrUsers && arrUsers.length > 0 &&
                           
                           arrUsers.map ((item, index) => {
                             return( 
                             <tr key = {index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-edit'  ><i className="fas fa-pencil-alt"></i></button>
                                    <button 
                                    onClick={() => this.handleDeleteUser(item)}
                                    className='btn-delete'  ><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            )
                           })
                           }
                                     
                        </tbody>
                    </table> 
        );


    }
}


const mapStateToProps = state => {
    // LAY KET QUA THUC THI
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
