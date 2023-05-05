
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";    
import { FormattedMessage } from 'react-intl'; 
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';

class DetailSpecialty extends Component {
     
    constructor(props) {
        super (props);
        this.state = { 

        }
    }

    async componentDidMount () {
       
    }

 
    async  componentDidUpdate ( prevProps, prevState , snapshot) {
        if (this.props.language !== prevProps.language){  
           
        }
       
    } 
    render() { 
           let {isShowDetailInfor, extraInfor} = this.state; 
           let {language} = this.props;
        return (
            <>
            <HomeHeader/>
             <div className='doctor-extra-infor-container'>
                  DetailSpecialty
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);