import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'; 
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty : []
        }
    }

    async componentDidMount () {
        // Lay tat ca thong tin Chuyen khoa
        let res = await getAllSpecialty (); 
        if ( res.data && res.data.errCode === 0){ 
            this.setState({
                dataSpecialty: res.data.data ? res.data.data : []
            })
        
        }
    }

    render() {
        let {dataSpecialty} = this.state;
        console.log('dataSpecialty : ',  dataSpecialty)

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id='homepage.specialty-poplular' />

                        </span>
                        <button className="btn-section">
                            
                        <FormattedMessage id='homepage.more-infor' />

                        </button>
                    </div>
                    <div className="section-body">
                        <Slider{...this.props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 && 
                        dataSpecialty.map ((item, index) => {
                            let imageBase64 = '' ;
                            if (item.image){ 
                            imageBase64 = new Buffer (item.image, 'base64').toString('binary');
                            }
                            return(
                            <div className="section-customize specialty-child" key={index}>
                                <div className="bg-image section-specialty" 
                                    style= {{ backgroundImage: `url(${imageBase64})` }}
                                
                                />
                                <div className='specialty-name'>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
