
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";    
import { FormattedMessage } from 'react-intl'; 
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment, { months } from 'moment';

class ProfileDoctor extends Component {
     
    constructor(props) {
        super (props);
        this.state = { 
            dataProfile : {},
        }
    }

    async componentDidMount () {
          let data = await this.getInforDoctor (this.props.doctorId)
          this.setState ({
              dataProfile: data
          })
    }

    // lay thong tin bac si
    getInforDoctor = async (id) => {
        let result = {};
        if (id){
            let res = await getProfileDoctorById (id);
            if ( res.data && res.data.errCode === 0){
                result = res.data.data;
            }
        }
        return result;
    }
 
    async  componentDidUpdate ( prevProps, prevState , snapshot) {
        if (this.props.language !== prevProps.language){  
           
        }
       if ( this.props.doctorId !== prevProps.doctorId){
        
       }
    } 

    // In thoi gian dat lich kham benh
    renderTimeBooking = (dataTime) => {
        let {language} = this.props;
        let time = language === LANGUAGES.VI ?
        dataTime.timeTypeData.valueVn :  dataTime.timeTypeData.valueEn ;

        if ( dataTime && !_.isEmpty(dataTime)){

            let date = language === LANGUAGES.VI ?
             moment.unix(+dataTime.date /1000).format('dddd - DD/MM/YYYY')
             :
             moment.unix(+dataTime.date /1000).locale('en').format('ddd - DD/MM/YYYY');

            return (
                <>
                <div>{time} - {date}</div>
                <div>

                    <FormattedMessage id='patient.booking-modal.priceBooking'/>
                </div>
                </>
            )
        }
        return <></>
       
    }
    render() {  
        let {dataProfile} = this.state; 
        let {language, isShowDescriptionDoctor, dataTime} = this.props;

        console.log ('STATE : ' , dataTime)
         let nameVi ='', nameEn ='';
       
        if ( dataProfile && dataProfile.positionData){
             nameVi = `${dataProfile.positionData.valueVn}, ${dataProfile.lastName} ${dataProfile.firstName}  `;
             nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}  `;
          
        }

        return (
            <div className='profile-doctor-container'>
            <div className='intro-doctor'>
            <div className='content-left'
            // HAM LAY ANH TU BASE64
              style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
            >

            </div>
            <div className='content-right'>
                <div className='up'>
                   {language === LANGUAGES.VI ? nameVi : nameEn}
                </div>
                <div className='down'>
                          {isShowDescriptionDoctor === true ?
                    <>
                    {/*  tra ve gia tri null => khong hien thi ra loi do => Van ra form => */}
                    {dataProfile && dataProfile.Markdown 
                    // Co dong nay => Neu bac si nao khong co gia tri se khong bi anh huong
                    && dataProfile.Markdown.description
                        && <span>
                            {dataProfile.Markdown.description}
                        </span>
                    }
                    </>

                    :
                    <>
                    {this.renderTimeBooking(dataTime)}
                    </>
                        }

                </div>

            </div>
 
             </div>

             <div className='price'>
             <FormattedMessage id='patient.booking-modal.price'/>

    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI
        &&
        <NumberFormat 
        className='currency'
           value={ dataProfile.Doctor_Infor.priceTypeData.valueVn }
           displayType={'text'} 
           thousandSeparator = {true} 
           suffix={' VND'}
        />
     }

    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN
        &&  
        
        <NumberFormat 
        className='currency'
           value={ dataProfile.Doctor_Infor.priceTypeData.valueEn  }
           displayType={'text'} 
           thousandSeparator = {true} 
           suffix={'$'}
        />
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
