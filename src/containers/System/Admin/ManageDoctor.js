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


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    //check ham constructor
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption : '',
            description: '',
            listDoctors: [],
            hasOldData: false
        }
    }

    componentDidMount() { 
        // GOI TIM TAT CAC CAC BAC SI
        this.props.fetchAllDoctors()

    }
    // SUA DOI KET QUA CHAY CAU LENH ( TAT CA BAC SI ) => THANH BIEN MANG TRONG BANG SELECT
    buildDataInputSelect = (inputData) => {

        //  TAO MANG 
        let result = [];
        // Chuyen doi anh viet 
        let {language} = this.props;
        // Neu ket qua co tra ve gia tri
        if ( inputData && inputData.length > 0){
            inputData.map ((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                // True => Tieng Viet | False => Tieng Anh
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                //  LAY 1 BAC SI VOI BIEN (ID)
                object.value = item.id;
                // THEM VAO MANG
                result.push (object)
            })
        }

        return result;
    }

    componentDidUpdate (prevProps,  prevState, snapshot) {
        //  KIEM TRA XEM KHI CHAY CHUONG TRINH NO SE CO GIA TRI KHAC VOI GIA TRI CU HAY KHONG 
        if ( prevProps.allDoctors !== this.props.allDoctors){
            // TAO 1 MANG DU LIEU HO TEN CAC BAC SI 
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState ({
                // Set lai gia tri mang bang ket qua chay
                listDoctors: dataSelect
            })
        }
        //  Check Ngon ngu anh viet 
        if ( prevProps.language !== this.props.language){
              // TAO 1 MANG DU LIEU HO TEN CAC BAC SI 
              let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
              this.setState ({
                  // Set lai gia tri mang bang ket qua chay
                  listDoctors: dataSelect
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
                action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
    })

    console.log ('HOI DAN IT : ', this.state)
  }
  
   handleChangeSelect = async selectedOption => {
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

  handleOnChangeDesc = (event) => {
        this.setState ({
            description: event.target.value
        })
  }
    render() {   
        // Xem nguoi dung da co thong tin hay chua
        let {hasOldData} = this.state;

        return ( 
            
            <div className='manage-doctor-container'> 
                    <div className='manage-doctor-title'>

                        TAO THONG TIN BAC SI
                    </div>
                    <div className='more-infor'>
                    <div className='content-left form-group'> 
                        
                        <label>Chọn bác sĩ</label>
                         <Select
                                 value={this.state.selectedOption }
                                 onChange={this.handleChangeSelect}
                                 options={this.state.listDoctors} 
                           />

                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu : </label>
                        <textarea className='form-control' rows="4"
                        // SU KIEN THEM NOI DUNG GIOI THIEU BAC SI
                            onChange={ (event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                            
                        </textarea> 

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
                              <span>Lưu thông tin </span> : <span>Tạo thông tin</span>
                          
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
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)), 
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
