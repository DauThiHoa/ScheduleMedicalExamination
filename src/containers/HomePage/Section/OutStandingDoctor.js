import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl'; 

// De su dung lay trang chi tiet bac si => this.props.history.push (`/users/${doctor.id}`);
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
  
    constructor (props){
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    //  Kiem tra su Thay Doi
    componentDidUpdate(prevProps, prevState, snapshot){
        if( prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState ({
                arrDoctors: this.props.topDoctorsRedux
            })
        }

    }
    componentDidMount (){

        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor = ( doctor ) => {
        console.log ( ' handleViewDetailDoctor : ', doctor)

        // CHUYEN SANG TRANG CHI TIET NGUOI DUNG => CHUC VU : BAC SI 
        this.props.history.push (`/detail-doctor/${doctor.id}`);
    }

    render() { 
        let arrDoctors = this.state.arrDoctors;
        let {language} = this.props;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
         

        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id='homepage.outstanding-doctor'/>

                             </span>
                        <button className="btn-section"> 
                        <FormattedMessage id='homepage.more-infor'/>

                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings} >
 
                                {arrDoctors && arrDoctors.length > 0 
                                && arrDoctors.map((item, index) => {
                                    // LAY ANH DUOI DATABASE
        let imageBase64 = '' ;
        if (item.image){ 
            imageBase64 = new Buffer (item.image, 'base64').toString('binary');
            // setImage (imageBase64)
        } 
                                    let nameVi = `${item.positionData.valueVn}, ${item.lastName} ${item.firstName}  `;
                                    let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}  `;
                                    return (
                                         
                                <div className="section-customize" key= {index} onClick={() => this.handleViewDetailDoctor (item)} >
                               
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-doctor" 
                                        style={{backgroundImage: `url(${imageBase64})` }} 

                                        />
                                    </div>
                                    <div className="position text-center">
                                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                        <div>Cơ xương khớp 1</div>
                                    </div>
                                </div>


                            </div>
                                    )
                                })
                                
                                }

                            
                        </Slider>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
