import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
} 



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
// CAP NHAT THONG TIN NGUOI DUNG
handleEditUser = (user) => { 
    this.props.handleEditUserFromParentKey(user)
}

    render() { 
            console.log ( 'Check Users : ' + this.props.listUsers)
            console.log ( 'Check Users1 : ' + this.props.userRedux)
            let arrUsers = this.state.userRedux;

        return ( 
            
            <React.Fragment> 
                    <table id='TableManageUser'>
                        <tbody>

                            <tr>
                                <th>Email</th>
                                <th>Họ người dùng</th>
                                <th>Tên người dùng</th>
                                <th>Địa chỉ</th>
                                <th></th>
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
                                    <button 
                                    onClick={() => this.handleEditUser(item)}
                                    className='btn-edit'  ><i className="fas fa-pencil-alt"></i></button>
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
 
    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
   
</React.Fragment>

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
