import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'; 
import { LANGUAGES , CRUD_ACTIONS, CommonUtils} from '../../utils';
import * as actions from "../../store/actions";
import './UserRedux.scss';
import { forIn } from 'lodash';
import TableManageUser from './Admin/TableManageUser';

// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

class UserRedux extends Component {
 

    constructor (props) {
        super(props);
        this.state = {
                genderArr: [],
                positionArr: [],
                roleArr: [],
                previewImgURL:'',
                isOpen: false,

                // kiem tra xem da tao nguoi dung hay chua 
                // isUserCreated: false,

                // CAC THONG TIN CAN LUU THONG TIN NGUOI DUNG
                email:'',
                password:'',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',

                action: '',
                userEditId: '',
        }
    }

   async  componentDidMount() {

           this.props.getGenderStart();
           this.props.getPositionStart();
           this.props.getRoleStart();
            //   this.props.dispatch(actions.fetchGenderStart())
        // try{
        //       let res =  await getAllCodeService ('gender');

        //       if (res && res.data.errCode === 0){
        //         this.setState({
        //             genderArr : res.data
        //         })
        //       } 
        //       console.log ('hoidanIt check res1 :' , res.data) 
        // }catch(e){
        //     console.log(e)
        // }
    }

    componentDidUpdate (prevProps, prevState, snapshot){
        // render => didupdate
        //  hien tai (this) va qua khu (previous)
        //  [] => [3]
        if (prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState ({
                genderArr: arrGenders,
                // LAY GIA TRI NEU CHUA CHON => MAC DINH LAY GIA TRI DAU TIEN
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap :''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux){ 
            let arrRoles = this.props.roleRedux;
            this.setState ({ 
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap :''
            })
        }
         
        if (prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux;
            this.setState ({ 
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap :''
            })
        } 

// Them thanh cong User => Set Lai cac vi tri rong
        if (prevProps.listUsers !== this.props.listUsers){ 
            // LAY GIOI TINH - CHUC DANH - VI TRI
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            
            this.setState ({ 
                email:'',
                password:'',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap :'',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap :'',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap :'',
                avatar: '',   
                action: CRUD_ACTIONS.CREATE ,
                previewImgURL:''
            })
        } 


    }


    // HAM LOAD HINH ANH 

    handleOnChangeImage = async (event) => {

        let data = event.target.files;
        let file = data[0];
        // TAO DUONG LINK ANH
        if ( file ){
            let base64 = await CommonUtils.getBase64(file); 

            let objectUrl = URL.createObjectURL(file);
            this.setState ({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
 
    }

    // PHONG TO HINH ANH 
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    // TAO THONG TIN NGUOI DUNG 
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        // NEU THIEU DU LIEU => THOAT KHOI HAM
        if (isValid === false) return;
 
        let { action } = this.state;

        if ( action === CRUD_ACTIONS.CREATE){
             
        // FIRE REDUX CREATE USER
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            avatar: this.state.avatar
        })
    }
    if ( action === CRUD_ACTIONS.EDIT){
            // FIRE REDUX EDIT USER 
            this.props.editAUserRedux ({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,

            })
    }
    
        // setTimeout (() => {
        //     this.props.fetchUserRedux ();
        // }, 1000)
         
        console.log ( 'check : ' + this.state);
    }

    // CHECK KIEM TRA XEM CO DIEN DUNG GIA TRI VAO FORM INPUT HAY KHONG
    checkValidateInput = () => { 
        let isValid = true ;
        let arrCheck = ['email', 'password' , 'firstName', 'lastName', 'phoneNumber', 
            'address' ]
            for ( let i = 0 ; i < arrCheck.length ; i++){
                if (!this.state[arrCheck[i]]){
                    isValid = false;
                    alert ('This input is required: ' + arrCheck[i])
                    break;
                }
            }
            return  isValid;

    }
    onChangeInput = ( event , id) => {
        // Copy tat cac cac bien state gan lai
        let copyState = { ...this.state}
        // LAY GIA TRI 
        copyState[id] = event.target.value;

        // THAY DOI GIA TRI 
        this.setState ({
            ...copyState
        })
          
    }

    handleEditUserFromParent = (user) =>{

        // LAY ANH DUOI DATABASE
        let imageBase64 = '' ;
        if (user.image){ 
            imageBase64 = new Buffer (user.image, 'base64').toString('binary');
            // setImage (imageBase64)
        } 

        console.log (' check from : ' , user)

        this.setState ({ 
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',    
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        } 
        )

    }
// HIEN THI TRANG QUAN LY GOI
    render() {   
        let genders = this.state.genderArr; 
        let roles = this.state.roleArr; 
        let positions = this.state.positionArr;

        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;
 
        let {email, password , firstName, lastName, phoneNumber, 
            address, gender, position, role, avatar} = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title'>
                      
                </div>
                 <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            {/* HIEN THI CHU THEM MOI NGUOI DUNG */}
                            <div className='col-12 my-3'><FormattedMessage id='manage-user.add'/></div>
                            <div className='col-12'>{isGetGenders === true ? 'Loading genders' : ''}</div>
               
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email'/></label>
                                <input className='form-control' type='email'
                                value={email}
                                onChange={(event) => {this.onChangeInput (event, 'email')}} 
                                disabled= {this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password'/></label>
                                <input className='form-control' type='password'
                                 value={password}
                                 onChange={(event) => {this.onChangeInput (event, 'password')}}
                                 disabled= {this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name'/></label>
                                <input className='form-control' type='text'
                                 value={firstName}
                                 onChange={(event) => {this.onChangeInput (event, 'firstName')}}
                                
                                />
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name'/></label>
                                <input className='form-control' type='text'
                                 value={lastName}
                                 onChange={(event) => {this.onChangeInput (event, 'lastName')}}

                                />
                             </div>

                            {/* Dong 2 */}

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number'/></label>
                                <input className='form-control' type='text'
                                value={phoneNumber}
                                onChange={(event) => {this.onChangeInput (event, 'phoneNumber')}}
                                
                                />
                             </div>
                             <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address'/></label>
                                <input className='form-control' type='text'
                                  value={address}
                                  onChange={(event) => {this.onChangeInput (event, 'address')}}
                                
                                />
                             </div>

                             {/* Dong 3 */}
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender'/></label>
                                <select className="form-control"
                                value={gender}
                                   onChange={(event) => {this.onChangeInput (event, 'gender')}}
                                >
                                    {genders && genders.length > 0 &&
                                     genders.map ((item, index) => { 
                                        return( 
                                            <option key = {index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVn : item.valueEn}
                                                </option>
                                            // <option  key = {index}>{item.valueVn}</option>
                                            )
                                    })
                                    }
 
                                 </select>
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position'/></label>
                                <select className="form-control"
                                value={position}
                                      onChange={(event) => {this.onChangeInput (event, 'position')}}

                                >
                                {positions && positions.length > 0 &&
                                     positions.map ((item, index) => { 
                                        return( 
                                            <option key = {index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVn : item.valueEn}</option>
                                            // <option  key = {index}>{item.valueVn}</option>
                                            )
                                    })
                                    }
 
                                 </select>
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role'/></label>
                                <select className="form-control"
                                value={role}
                                     onChange={(event) => {this.onChangeInput (event, 'role')}}
                                >
                                {roles && roles.length > 0 &&
                                     roles.map ((item, index) => { 
                                        return( 
                                            <option key = {index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVn : item.valueEn}</option>
                                            // <option  key = {index}>{item.valueVn}</option>
                                            )
                                    })
                                    }
 
                                 </select>
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image'/></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                    
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                    
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh<i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                    
                                    style={{backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick={() => this.openPreviewImage()}
                                    
                                    >


                                    </div>
                                </div>
                                 
                             </div>
                             <div className='col-12 my-3'>

                                   <button className= {this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' :  'btn btn-primary' } 
                                   onClick = {() => this.handleSaveUser()}
                                   >
                                       
                                       { this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='manage-user.edit'/> 
                                        :
                                        <FormattedMessage id='manage-user.save'/>
                                    }
                                    
                                   </button>
                             </div>
                             
                             <div  className='col-12 mb-5'>
                                   <TableManageUser
                                   handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                   action= {this.state.action}
                                   />
                             </div> 

                        </div>

                    </div>
                
                
                </div>
                  
                                    {/* {this.state.isOpen === true  && 
                <Lightbox
                             mainSrc={this.state.previewImgURL} 
                               onCloseRequest={() => this.setState({ isOpen: false })} 

          />
                                     } */} 

            </div>
             
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

        // Truyen gender vao adminActions
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,

        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // CAC BIEN LAY TU KHOA TU FILE ADMINREDUCER
        getGenderStart: () => dispatch(actions.fetchGenderStart()), 
        getPositionStart: () => dispatch(actions.fetchPositionStart()), 
        getRoleStart: () => dispatch(actions.fetchRoleStart()), 
        createNewUser: (data) => dispatch(actions.createNewUser(data)), 
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux : (data) => dispatch(actions.editAUser(data))

        // processLogout: () => dispatch(actions.processLogout()), 
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
