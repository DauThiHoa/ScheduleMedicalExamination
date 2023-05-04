
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";    
import { FormattedMessage } from 'react-intl'; 
import { postVerifyBookAppointment } from '../../services/userService'; 
import HomeHeader from '../HomePage/HomeHeader';// LAY GIAO DIEN
import './VerifyEmail.scss';

class VerifyEmail extends Component {
     
    constructor(props) {
        super (props);
        this.state = { 
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount () {
        // Kiem tra link id => Co dung hay khong

        if ( this.props.location && this.props.location.search ){
        // In ra chuoi phia tren duong link => TOKEN = c7e7c349-83d0-4362-a466-aedfaca57db6
        //  VD : http://localhost:3000/verify-booking?token=c7e7c349-83d0-4362-a466-aedfaca57db6&doctorId=24
        let urlParams = new URLSearchParams(this.props.location.search);
        let token = urlParams.get('token');
        let doctorId = urlParams.get('doctorId');
        let res = await postVerifyBookAppointment ({
            token: token,
            doctorId: doctorId
        })

        if ( res.data && res.data.errCode === 0 ){
            this.setState({
                statusVerify: true,
                errCode: res.data.errCode
            })
        }else {
            this.setState({
                statusVerify : true,
                errCode: res.data && res.data.errCode ? res.data.errCode : -1 
            }) 
        }
        }
       
    }

 
    async  componentDidUpdate ( prevProps, prevState , snapshot) {
        if (this.props.language !== prevProps.language){  
           
        }
       
    } 
    render() { 
           let {statusVerify, errCode} = this.state;  
        return (
            <>
            <HomeHeader/>
            <div className='verify-email-container'>
 
            {statusVerify === false ?
                <div>
                   Loading data...
                </div>
        :
                <div>
                    {+errCode === 0 ?
                    <div className='infor-booking'>Xác nhận lịch hẹn thành công!</div>
                :
                    <div className='infor-booking'>
                        Lịch hẹn không tồn tại hoặc đã được xác nhận!
                    </div>
                    }
                </div>
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
