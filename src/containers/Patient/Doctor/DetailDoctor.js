import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";  
import HomeHeader from '../../HomePage/HomeHeader'; // LAY GIAO DIEN
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';

class DetailDoctor extends Component {
     
    constructor(props) {
        super (props);
        this.state = {
            detailDoctor: {}

        }
    }

    async componentDidMount () {
        // Kiem tra link id => Co dung hay khong
        if ( this.props.match && this.props.match.params && this.props.match.params.id){
            let id =  this.props.match.params.id;
            let res = await getDetailInforDoctor (id);
            if ( res && res.data.errCode === 0 ){
                this.setState ({
                    detailDoctor: res.data.data
                })
            } 

        }

    }

    componentDidUpdate ( prevProps, prevState , snapshot) {

    }

    render() { 
        // Lay id BAC SI khi Click vao link => this.props.match.params.id
        // id : goi api => lay thong tin
        console.log ( 'CHECK ID old : ',  this.props.match.params.id); 

        // LAY BIEN => DICH TIENG VIET VOI TIENG ANH
        let {language} = this.props;

        let nameVi ='', nameEn ='';
        let {detailDoctor} = this.state;
        if ( detailDoctor && detailDoctor.positionData){
             nameVi = `${detailDoctor.positionData.valueVn}, ${detailDoctor.lastName} ${detailDoctor.firstName}  `;
             nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}  `;
          
        }
       
        return (
             <>
                {/* add giao dien Home Header */}
                <HomeHeader
                     isShowBanner ={true} 
                />
                <div className='doctor-detail-container'>
                    
                    <div className='intro-doctor'>
                        <div className='content-left'
                        // HAM LAY ANH TU BASE64
                          style={{backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}
                        >

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                               {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {/*  tra ve gia tri null => khong hien thi ra loi do => Van ra form => */}
                                {detailDoctor && detailDoctor.Markdown 
                                // Co dong nay => Neu bac si nao khong co gia tri se khong bi anh huong
                                && detailDoctor.Markdown.description
                                    && <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>

                        </div>

                    </div>

                    <div className='schedule-doctor'>
                        <div className='content-left'>
                                <DoctorSchedule
                                    doctorIdFromParent = {detailDoctor && detailDoctor.id ? detailDoctor.id : -1}

                                />
                        </div>
                        <div className='content-right'>

                        </div>

                    </div>

                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                        
                        &&
                        <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML}}>
                           
                        </div>
                          }
                    </div>

                    <div className='comment-doctor'>

                    </div>
                </div>
             </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
