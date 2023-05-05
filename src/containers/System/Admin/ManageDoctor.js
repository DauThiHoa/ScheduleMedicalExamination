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
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

            // Ten chuyen khoa - phong kham
            clinicId: '',
            specialtyId: '',
            selectedClinic: '',
            selectedSpecialty: '',
            listClinic : [],
            listSpecialty: []

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
        if ( type === 'SPECIALTY' ){
            inputData.map ((item, index) => {
                let object = {};   
                object.label = item.name; 
                object.value = item.id;
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
  
            let {resPrice, resPayment, resProvince , resSpecialty} = this.props.allRequiredDoctorInfor;

                let dataSelectPrice = this.buildDataInputSelect(resPrice , 'PRICE');
                let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
                let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
                let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

                console.log ( 'dataSelectPrice : ', dataSelectPrice);
                console.log ( 'dataSelectPayment : ', dataSelectPayment);
                console.log ( 'dataSelectProvince : ', dataSelectProvince);

            this.setState ({
                // Set lai gia tri mang bang ket qua chay
                listPrice : dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty
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
                selectedPayment: this.state.selectedPayment.value,
                selectedProvince: this.state.selectedProvince.value,
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                note: this.state.note,

                // Chuyen khoa 
                clinicId : this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
                specialtyId : this.state.selectedSpecialty.value,

    })

    console.log ('THIS.STATE : ', this.state)
  }
  
   handleChangeSelect = async ( selectedOption ) => { 

    // console.log ('selectedOption  : ', selectedOption )
    this.setState({ selectedOption } );
    let {listPayment, listPrice, listProvince, listSpecialty} = this.state;

    // HAM LAY GIA TRI SELECT MINH CHON ( TEN BAC SI )
    let res = await getDetailInforDoctor (selectedOption.value)
    if ( res && res.data.errCode === 0 && res.data.data  && res.data.data.Markdown){
        let markdown = res.data.data.Markdown;
 
        // Lay thong tin chi tiet bac si 
        // =>  
        let addressClinic = '', nameClinic = '', note = '',
        paymentId = '', priceId = '', provinceId = '', specialtyId = '',
        selectedPayment = '', selectedPrice = '' , selectedProvince = '',
        selectedSpecialty = '';

        if(res.data.data.Doctor_Infor){
            addressClinic = res.data.data.Doctor_Infor.addressClinic;
            nameClinic = res.data.data.Doctor_Infor.nameClinic;
            note = res.data.data.Doctor_Infor.note;

            // GAN GIA TRI
            paymentId = res.data.data.Doctor_Infor.paymentId;
            priceId = res.data.data.Doctor_Infor.priceId;
            provinceId = res.data.data.Doctor_Infor.provinceId;
            specialtyId = res.data.data.Doctor_Infor.specialtyId;

            // Ham lay gia tri ( phuong thuc thanh toan ) => Trong database
             selectedPayment = listPayment.find (item => {
                return item && item.value === paymentId
             })
              // Ham lay gia tri ( Gia ) => Trong database
             selectedPrice = listPrice.find (item => {
                return item && item.value === priceId
             })
              // Ham lay gia tri ( tinh thanh ) => Trong database
             selectedProvince = listProvince.find (item => {
                return item && item.value === provinceId
             }) 

             selectedSpecialty = listSpecialty.find (item => {
                return item && item.value === specialtyId
             }) 
        }




        this.setState ({
            contentHTML: markdown.contentHTML,
            contentMarkdown: markdown.contentMarkdown,
            description: markdown.description, 
            //  MAC DINH DE BIEN DA CO GIA TRI => bac si do da co thong tin mieu ta hay chua
            hasOldData : true ,

            addressClinic: addressClinic,
            nameClinic: nameClinic,
            note: note,
            selectedPayment:selectedPayment,
            selectedPrice: selectedPrice,
            selectedProvince: selectedProvince,
            selectedSpecialty:selectedSpecialty
        })
    }else {
        this.setState ({
            contentHTML: '',
            contentMarkdown: '',
            description: '', 
            //  MAC DINH DE BIEN DA CO GIA TRI => bac si do da co thong tin mieu ta hay chua
            hasOldData : false,

            addressClinic: '',
            nameClinic: '',
            note: '',
            selectedPayment:'',
            selectedPrice: '',
            selectedProvince: '',
            selectedSpecialty:''
            
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
        console.log ('STATE : ', this.state)

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
                                 value={this.state.selectedProvince }
                                 onChange={this.handleChangeSelectDoctorInfor}
                                 options={this.state.listProvince} 
                                 placeholder = { <FormattedMessage id='admin.manage-doctor.province'/>}
                                 name ="selectedProvince"
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
                    {/* Chon Chuyen khoa - phong kham */}
                    <div className='row'>
                        <div className='col-4 form-group'>
                            {/* Chọn chuyên khoa */}
                            <label>
                                 <FormattedMessage id='admin.manage-doctor.specialty'/>
                            </label>
                            <Select
                                 value={this.state.selectedSpecialty } 
                                 options={this.state.listSpecialty} 
                                 placeholder = {<FormattedMessage id='admin.manage-doctor.specialty'/>} 
 
                                 onChange={this.handleChangeSelectDoctorInfor}  
                                 name= "selectedSpecialty"
                           />

                        </div>
                        <div className='col-4 form-group'>
                            {/* Chọn phòng khám */}
                            <label> 
                                    <FormattedMessage id='admin.manage-doctor.select-clinic'/>
                            </label>
                            <Select
                                 value={this.state.selectedClinic } 
                                 options={this.state.listClinic} 
                                 placeholder = {<FormattedMessage id='admin.manage-doctor.select-clinic'/>} 
 
                                 onChange={this.handleChangeSelectDoctorInfor}  
                                 name= "selectedClinic"
                           />

                        </div>
                    </div>




                    <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '300px' }} 
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
