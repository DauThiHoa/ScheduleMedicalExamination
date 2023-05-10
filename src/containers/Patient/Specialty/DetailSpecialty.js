
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";    
import { FormattedMessage } from 'react-intl'; 
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader'; 
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialtyById , getAllCodeService} from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {
     
    constructor(props) {
        super (props);
        this.state = { 
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount () {
        // Kiem tra link id => Co dung hay khong
        if ( this.props.match && this.props.match.params && this.props.match.params.id){
            let id =  this.props.match.params.id;
            
            let res = await getAllDetailSpecialtyById ({
                id: id, 
                location: 'ALL'
            });

            let resProvince = await getAllCodeService ('PROVINCE');
             
            // Them cac bac si thuoc chuyen khoa rieng
            if ( res.data && res.data.errCode === 0){
                let data = res.data.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty (res.data)){
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0){
                        arr.map (item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                let dataProvince = resProvince.data ; 
                if (dataProvince && dataProvince.length >0 ){
                    dataProvince.unshift ({
                        createdAt : null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVn: 'Toàn quốc'
                    })
                }


                this.setState ({
                    dataDetailSpecialty: res.data.data, 
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince.data ? dataProvince.data : [], 
                })
            } 

        }

    }
 

    // search bac si theo dia chi lam viec
    handleOnChangeSelect = async ( event ) => {

        console.log ('handleOnChangeSelect : ', event.target.value);

        if ( this.props.match && this.props.match.params && this.props.match.params.id){
            let id =  this.props.match.params.id;
            let location =  event.target.value;

            let res = await getAllDetailSpecialtyById ({
                id: id, 
                location: location
            }); 
             
            // Them cac bac si thuoc chuyen khoa rieng
            if ( res.data && res.data.errCode === 0 ){
                let data = res.data.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty (res.data)){
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0){
                        arr.map (item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
 
                this.setState ({
                    dataDetailSpecialty: res.data.data, 
                    arrDoctorId: arrDoctorId, 
                })
            } 

        }

    }

 
    async  componentDidUpdate ( prevProps, prevState , snapshot) {
        if (this.props.language !== prevProps.language){  
           
        }
       
    }  

    render() {
           let {arrDoctorId, dataDetailSpecialty, listProvince} = this.state;  
           console.log ('listProvince : ', listProvince )

           let {language} = this.props;

        return (
            <div className='detail-specialty-container'>
            <HomeHeader/>
            <div className='detail-specialty-body'>
 
            <div className='description-spcialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                        
                        &&
                        <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML}}>
                           
                        </div>
                          }

            </div>
            {/* NOI LAM VIEC CUA CAC BAC SI */}
            <div className='search-sp-doctor'>
                     
                <select 
                onChange={(event) => this.handleOnChangeSelect(event)}
                >
                    {listProvince && listProvince.length > 0 &&
                    listProvince.map ((item, index) => {
                        return (
                            <option key={index} value={item.keyMap}>
                                {language === LANGUAGES.VI ? 
                                item.valueVn : item.valueEn}  
                            </option>
                        )
                    })
                    }
 
                </select>

            </div>
  
                {arrDoctorId && arrDoctorId.length > 0 &&
                arrDoctorId.map ((item, index) => {
                    return (
                        <div className='each-doctor' key={index}>
                        <div className='dt-content-left'>
                            <div className='profile-doctor'>

                            <ProfileDoctor
                            doctorId = {item}
                            isShowDescriptionDoctor = {true}
                            isShowLinkDetail = {true}
                            isShowPrice = {false}
                            // dataTime = {dataTime}
                            />
                                </div>
        

                        </div>
                        <div className='dt-content-right'>
                            <div className='doctor-schdule'>
                                <DoctorSchedule
                                    doctorIdFromParent = {item}
                                    // key = {index}
                                />
                            </div>
                            <div className='doctor-extra-infor'>
                                <DoctorExtraInfor 
                                     doctorIdFromParent = {item}
                                 />
                            </div> 
                                 
                        </div>
        
                    </div>
        
                              
                    )
                })}
                                  

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
