import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'; 
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {

    constructor(props) {
        super (props);
        this.state = { 
            dataClinics: []

        }
    }

    async componentDidMount ( ) {
        let res = await getAllClinic(); 
        if ( res.data && res.data.errCode === 0) {
            this.setState ({
                dataClinics: res.data.data ? res.data.data : []
            })
        }
    }

    handleViewDetailClinic = ( item ) => { 

        if (this.props.history) {
        // CHUYEN SANG TRANG CHI TIET NGUOI DUNG => CHUC VU : BAC SI 
            this.props.history.push (`/detail-clinic/${item.id}`);
        }
    }



    render() {

        let {dataClinics} = this.state;

        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>

                        {dataClinics && dataClinics.length > 0  &&
                        dataClinics.map ((item, index) => {
                            let imageBase64 = '' ;
                            if (item.image){ 
                            imageBase64 = new Buffer (item.image, 'base64').toString('binary');
                            }

                            return (
                                <div className="section-customize clinic-child" key={index}
                                onClick={() => this.handleViewDetailClinic (item)}
                                
                                >
                                     <div className="bg-image section-medical-facility" 
                                       style= {{ backgroundImage: `url(${imageBase64})` }}

                                     />
                                     <div className='clinic-name'>{item.name}</div>
                            </div>
                            )
                        })} 
                            
                        </Slider>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
