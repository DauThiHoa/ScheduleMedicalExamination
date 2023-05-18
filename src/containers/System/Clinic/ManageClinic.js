
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";    
import { FormattedMessage } from 'react-intl'; 
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'; 
import { LANGUAGES , CRUD_ACTIONS, CommonUtils} from '../../../utils';
import {createNewClinic} from '../../../services/userService';
import { toast } from 'react-toastify'; 

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
     
    constructor(props) {
        super (props);
        this.state = { 
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''

        }
    }

    async componentDidMount () {
       
    }

 
    async  componentDidUpdate ( prevProps, prevState , snapshot) {
        if (this.props.language !== prevProps.language){  
           
        }
       
    } 
    
// Ham thay doi cac gia tri khi nhap thong tin vao input
    handleOnChangeInput = (event , id) => {
        let stateCopy = { ...this.state}
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    // Ham thay doi gia tri trong khung du lieu
    handleEditorChange = ({ html, text }) => {
        this.setState ({ 
            descriptionHTML:  html,
            descriptionMarkdown: text
        }) 
      } 

       // HAM LOAD HINH ANH 

    handleOnChangeImage = async (event) => {

        let data = event.target.files;
        let file = data[0];
        // TAO DUONG LINK ANH
        if ( file ){
            let base64 = await CommonUtils.getBase64(file);  
            this.setState ({
                imageBase64: base64, 
            })
        }
 
    }

    // Luu thong tin chuyen khoa 
    handleSaveNewClinic = async () => {

        let res = await createNewClinic (this.state)
        if ( res.data && res.data.errCode === 0 ){
            toast.success("Add new clinic Success!")
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        }else {
            toast.error("Something wrongs...!")
        }
    }

    render() { 
           let {isShowDetailInfor, extraInfor} = this.state; 
           let {language} = this.props;
        return (
             <div className='manage-specialty-container'>
                <div className='ms-title'>
                    Quản lý phòng khám
                </div>
                
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type='text' 
                        value={this.state.name}
                        onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        
                        />

                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <br></br>
                        <input className='form-control-file' type='file'
                        onChange={(event) => this.handleOnChangeImage(event)}
                         
                        />

                    </div>
                    <div className='col-12 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' type='text' 
                        value={this.state.address}
                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        
                        />

                    </div>

                    <div className='col-12 MdEditor'>

                    <MdEditor 

                        style={{ height: '400px' }} 
                        renderHTML={text => mdParser.render(text)} 
                          onChange={this.handleEditorChange} 
                        
                        //   LOAD DU LIEU => nEU CO BAM VAO TRONG TEN NGUOI DUNG => UPDATE 
                          value={this.state.descriptionMarkdown}
                          />

                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                        onClick={() => this.handleSaveNewClinic()}
                        
                        >
                            
                            Lưu</button>

                    </div>
 
                </div>
                     

             </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
