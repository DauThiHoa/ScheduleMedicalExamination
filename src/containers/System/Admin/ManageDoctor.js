import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions";


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'; 
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
 
 import Select from 'react-select'; 
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
 import { getDetailInforDoctor } from '../../../services/userService';
 import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    //check ham constructor
    constructor(props) {
        super(props);
        this.state = {
            // Save to MarkDown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption : '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            // Save to doctor infor table
            listPrice : [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
         }
    }

    componentDidMount() { 
        // GOI TIM TAT CAC CAC BAC SI
        this.props.fetchAllDoctors();
        this.props.getAllRequireDoctorInfor();

    }
    // SUA DOI KET QUA CHAY CAU LENH ( TAT CA BAC SI ) => THANH BIEN MANG TRONG BANG SELECT
    buildDataInputSelect = (inputData, type) => {

        //  TAO MANG 
        let result = [];
        // Chuyen doi anh viet 
        let {language} = this.props;
        // Neu ket qua co tra ve gia tri
        if ( inputData && inputData.length > 0){
            if ( type === 'USERS'){
            inputData.map ((item, index) => {
                let object = {};
                let labelVi =  `${item.lastName} ${item.firstName}`  ;
                let labelEn = `${item.firstName} ${item.lastName}`  ;

                // True => Tieng Viet | False => Tieng Anh
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                //  LAY 1 BAC SI VOI BIEN (ID)
                object.value = item.id;
                // THEM VAO MANG
                result.push (object)
            })
        }
        if ( type === 'PRICE' ){
            inputData.map ((item, index) => {
                let object = {};
                let labelVi =  `${item.valueVn}`  ;
                let labelEn = `${item.valueEn} USD`  ;

                // True => Tieng Viet | False => Tieng Anh
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                //  LAY 1 BAC SI VOI BIEN (ID)
                object.value = item.keyMap;
                // THEM VAO MANG
                result.push (object)
            })
        }
        if ( type === 'PAYMENT' || type === 'PROVINCE'){
            inputData.map ((item, index) => {
                let object = {};
                let labelVi =  `${item.valueVn}`  ;
                let labelEn = `${item.valueEn}`  ;

                // True => Tieng Viet | False => Tieng Anh
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                //  LAY 1 BAC SI VOI BIEN (ID)
                object.value = item.keyMap;
                // THEM VAO MANG
                result.push (object)
            })
        }

    }

        return result;
    }

    componentDidUpdate (prevProps,  prevState, snapshot) {
        //  KIEM TRA XEM KHI CHAY CHUONG TRINH NO SE CO GIA TRI KHAC VOI GIA TRI CU HAY KHONG 
        if ( prevProps.allDoctors !== this.props.allDoctors){
            // TAO 1 MANG DU LIEU HO TEN CAC BAC SI 
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState ({
                // Set lai gia tri mang bang ket qua chay
                listDoctors: dataSelect
            })
        }
         
        // 

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
  
            let {resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;

                let dataSelectPrice = this.buildDataInputSelect(resPrice , 'PRICE');
                let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
                let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

                console.log ( 'dataSelectPrice : ', dataSelectPrice);
                console.log ( 'dataSelectPayment : ', dataSelectPayment);
                console.log ( 'dataSelectProvince : ', dataSelectProvince);

            this.setState ({
                // Set lai gia tri mang bang ket qua chay
                listPrice : dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }

         //  Check Ngon ngu anh viet 
         if ( prevProps.language !== this.props.language){
            // TAO 1 MANG DU LIEU HO TEN CAC BAC SI 
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');

            let {resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice , 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState ({
                // Set lai gia tri mang bang ket qua chay
                listDoctors: dataSelect,
                listPrice : dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
      }

    }

 // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState ({
        contentMarkdown: text,
        contentHTML: html,
    }) 
  } 
   
  handleSaveContentMarkdown = () => {
    let {hasOldData} = this.state;

    this.props.saveDetailDoctor ({ 
// LUU THONG TIN CHI TIET CAC BAC SI
               contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                // LAY SU LUA CHON TEN BAC SI DUOC THEM CHI TIET
                doctorId: this.state.selectedOption.value,
                //  Doi cac 
                action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

// THEM THONG TIN
                selectedPrice: this.state.selectedPrice.value,
                selectedPayment: this.state.selectedPrice.value,
                selectProvince: this.state.selectProvince.value,
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                note: this.state.note
    })

    console.log ('HOI DAN IT : ', this.state)
  }
  
   handleChangeSelect = async ( selectedOption ) => { 

    // console.log ('selectedOption  : ', selectedOption )
    this.setState({ selectedOption } );

    // HAM LAY GIA TRI SELECT MINH CHON ( TEN BAC SI )
    let res = await getDetailInforDoctor (selectedOption.value)
    if ( res && res.data.errCode === 0 && res.data.data  && res.data.data.Markdown){
        let markdown = res.data.data.Markdown;
        this.setState ({
            contentHTML: markdown.contentHTML,
            contentMarkdown: markdown.contentMarkdown,
            description: markdown.description, 
            //  MAC DINH DE BIEN DA CO GIA TRI => bac si do da co thong tin mieu ta hay chua
            hasOldData : true 
        })
    }else {
        this.setState ({
            contentHTML: '',
            contentMarkdown: '',
            description: '', 
            //  MAC DINH DE BIEN DA CO GIA TRI => bac si do da co thong tin mieu ta hay chua
            hasOldData : false
        })
    }
    console.log ('selectedOption: ======== ', res.data.data )

  };

  handleChangeSelectDoctorInfor = async ( selectedOption , name ) => {
    let stateName = name.name;
    let stateCopy = { ...this.state};
    stateCopy[stateName] = selectedOption;

    this.setState ({
        ...stateCopy
    })

        console.log ("=========> ", selectedOption, stateName)
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state};
    stateCopy[id] = event.target.value;
        this.setState ({
            ...stateCopy
        })
  }

    render() {   
        // Xem nguoi dung da co thong tin hay chua
        let {hasOldData} = this.state;
        console.log ('HOI DAN IT: ', this.state)

        return ( 
            
            <div className='manage-doctor-container'> 
                    <div className='manage-doctor-title'>
                        <FormattedMessage id='admin.manage-doctor.title'/>
                    </div>

                    <div className='more-infor'>
                    <div className='content-left form-group'> 
                     
                        <label>
                            <FormattedMessage id='admin.manage-doctor.select-doctor'/>
                        </label>
                         <Select
                                 value={this.state.selectedOption }
                                 onChange={this.handleChangeSelect}
                                 options={this.state.listDoctors} 
                                 placeholder = {<FormattedMessage id='admin.manage-doctor.select-doctor'/>}
                                //  name = {"selectedOption"}
                           />

                    </div>
                    <div className='content-right'>
                        <label>
                              <FormattedMessage id='admin.manage-doctor.intro'/>
                        </label>
                        <textarea className='form-control'  
                        // SU KIEN THEM NOI DUNG GIOI THIEU BAC SI
                            onChange={ (event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                            
                        </textarea> 


                    </div>
                    </div> 

                    <div className='more-infor-extra row'>
                            <div className='col-4 form-group'>
                                <label>
                                     <FormattedMessage id='admin.manage-doctor.price'/>
                                </label>
                                <Select  
                                 value={this.state.selectedPrice }
                                 onChange={this.handleChangeSelectDoctorInfor}
                                 options={this.state.listPrice} 
                                 placeholder = {<FormattedMessage id='admin.manage-doctor.price'/>}
                                 name= "selectedPrice"
                           />
                            </div>
                            <div className='col-4 form-group'>
                                <label>
                                     <FormattedMessage id='admin.manage-doctor.payment'/>
                                </label>
                                <Select
                                 value={this.state.selectedPayment }
                                 onChange={this.handleChangeSelectDoctorInfor}
                                 options={this.state.listPayment} 
                                 placeholder = {<FormattedMessage id='admin.manage-doctor.payment'/>}
                                 name= "selectedPayment"
                           />
                            </div>
                            <div className='col-4 form-group'>
                                <label>
                                       <FormattedMessage id='admin.manage-doctor.province'/>
                                </label>
                                <Select
                                 value={this.state.selectProvince }
                                 onChange={this.handleChangeSelectDoctorInfor}
                                 options={this.state.listProvince} 
                                 placeholder = { <FormattedMessage id='admin.manage-doctor.province'/>}
                                 name ="selectProvince"
                           />
                            </div>



                            <div className='col-4 form-group'>
                                <label>
                                     <FormattedMessage id='admin.manage-doctor.nameClinic'/>
                                </label>
                                <input className='form-control'
                                 onChange={ (event) => this.handleOnChangeText(event, 'nameClinic')}
                                 value={this.state.nameClinic}
                                />
                            </div>
                            <div className='col-4 form-group'>
                                <label>
                                       <FormattedMessage id='admin.manage-doctor.addressClinic'/>
                                </label>
                                <input className='form-control'
                                 onChange={ (event) => this.handleOnChangeText(event, 'addressClinic')}
                                 value={this.state.addressClinic}
                                />
                            </div>
                            <div className='col-4 form-group'>
                                <label> 
                                     <FormattedMessage id='admin.manage-doctor.note'/>
                                </label>
                                <input className='form-control'
                                 onChange={ (event) => this.handleOnChangeText(event, 'note')}
                                 value={this.state.note}
                                />
                            </div>
                    </div>
                   



                    <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                          onChange={this.handleEditorChange} 
                        //   LOAD DU LIEU => nEU CO BAM VAO TRONG TEN NGUOI DUNG => UPDATE 
                          value={this.state.contentMarkdown}
                          />
   
                    </div>
                      
                      <button 
                      onClick={() => this.handleSaveContentMarkdown()}
                      className= {hasOldData == true ? 'save-content-doctor' : "create-content-doctor"}>
                          { hasOldData === true ?
                              <span>
                                     <FormattedMessage id='admin.manage-doctor.save'/>
                                 </span> : <span>
                                    <FormattedMessage id='admin.manage-doctor.add'/>
                                 </span>
                          
                        }
                        </button>
            </div>

        );



    }
} 

const mapStateToProps = state => {
    // LAY KET QUA THUC THI
    return {
        // Chuyen doi ngon ngu Anh Viet
        language: state.app.language,
        // Lay tat ca danh sach cac bac si
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)), 
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        // LOAD TAT CA CAC THONG TIN GIAO DIEN CAN THIET
        getAllRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
