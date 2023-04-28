import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../services/userService';
import { LANGUAGES} from '../../utils';
import * as actions from "../../store/actions"
class UserRedux extends Component {
 

    constructor (props) {
        super(props);
        this.state = {
                genderArr: []
        }
    }

   async  componentDidMount() {

           this.props.getGenderStart();

        // try{
        //       let res =  await getAllCodeService ('gender');

        //       if (res && res.data.errCode === 0){
        //         this.setState({
        //             genderArr : res.data
        //         })
        //       } 
        //       console.log ('hoidanIt check res1 :' , res.data) 
        // }catch(e){
        //     console.log(e)
        // }
    }

    componentDidUpdate (prevProps, prevState, snapshot){
        // render => didupdate
        //  hien tai (this) va qua khu (previous)
        //  [] => [3]
        if (prevProps.genderRedux !== this.props.genderRedux){
            this.setState ({
                genderArr: this.props.genderRedux
            })
        }
    }
// HIEN THI TRANG QUAN LY GOI
    render() {   
        let genders = this.state.genderArr; 
        let language = this.props.language;
        console.log ('HoiDanIt check props from redux : ' , this.props.genderRedux)
        return (
            <div className='user-redux-container'>
                <div className='title'>
                     Learn React-Redux với "Hỏi Dân It" Youtube Channel
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            {/* HIEN THI CHU THEM MOI NGUOI DUNG */}
                            <div className='col-12 my-3'><FormattedMessage id='manage-user.add'/></div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email'/></label>
                                <input className='form-control' type='email'/>
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password'/></label>
                                <input className='form-control' type='password'/>
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name'/></label>
                                <input className='form-control' type='text'/>
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name'/></label>
                                <input className='form-control' type='text'/>
                             </div>

                            {/* Dong 2 */}

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number'/></label>
                                <input className='form-control' type='text'/>
                             </div>
                             <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address'/></label>
                                <input className='form-control' type='text'/>
                             </div>

                             {/* Dong 3 */}
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender'/></label>
                                <select className="form-control">
                                    {genders && genders.length > 0 &&
                                     genders.map ((item, index) => { 
                                        return( 
                                            <option key = {index}>{language === LANGUAGES.VI ? item.valueVn : item.valueEn}</option>
                                            // <option  key = {index}>{item.valueVn}</option>
                                            )
                                    })
                                    }
 
                                 </select>
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position'/></label>
                                <select className="form-control">
                                     <option selected>Choose...</option>
                                        <option>...</option>
                                 </select>
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role'/></label>
                                <select className="form-control">
                                     <option selected>Choose...</option>
                                        <option>...</option>
                                 </select>
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image'/></label>
                                <input type='text' className='form-control'/>
                             </div>
                             <div className='col-12 mt-3'>
                                   <button className='btn btn-primary'><FormattedMessage id='manage-user.save'/></button>
                             </div>
                             
                        </div>

                    </div>
                </div>
            </div>
             
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        // Truyen gender vao adminActions
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // CAC BIEN LAY TU KHOA TU FILE ADMINREDUCER
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
