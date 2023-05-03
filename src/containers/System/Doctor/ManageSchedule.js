import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom'; 
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES , dateFormat} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'; 
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {

    constructor (props) {
        super (props);
        // const currentDate = new Date ();
        // currentDate.setHours (0,0,0,0);

        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []

        }
    }

    componentDidMount() { 
        // GOI TIM TAT CAC CAC BAC SI
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();

    }

      // SUA DOI KET QUA CHAY CAU LENH ( TAT CA BAC SI ) => THANH BIEN MANG TRONG BANG SELECT
      buildDataInputSelect = (inputData) => {

        //  TAO MANG 
        let result = [];
        // Chuyen doi anh viet 
        let {language} = this.props;
        // Neu ket qua co tra ve gia tri
        if ( inputData && inputData.length > 0){
            inputData.map ((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                // True => Tieng Viet | False => Tieng Anh
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                //  LAY 1 BAC SI VOI BIEN (ID)
                object.value = item.id;
                // THEM VAO MANG
                result.push (object)
            })
        }

        return result;
    }

    componentDidUpdate (prevProps,  prevState, snapshot) {
        //  KIEM TRA XEM KHI CHAY CHUONG TRINH NO SE CO GIA TRI KHAC VOI GIA TRI CU HAY KHONG 
        if ( prevProps.allDoctors !== this.props.allDoctors){
            // TAO 1 MANG DU LIEU HO TEN CAC BAC SI 
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState ({
                // Set lai gia tri mang bang ket qua chay
                listDoctors: dataSelect
            })
        }
        //  Check Ngon ngu anh viet 

        if ( prevProps.allScheduleTime !== this.props.allScheduleTime) {

            console.log ( 'CHECK RangeTime : ', this.props.allScheduleTime)
            // Ham chon nut Button
            let data = this.props.allScheduleTime;
            if (data && data.length > 0 ){
                
               data = data.map (item => ({ ...item, isSelected: false}))
            } 

            this.setState ({
                rangeTime: data
            })
        }
        // if ( prevProps.language !== this.props.language){
        //       // TAO 1 MANG DU LIEU HO TEN CAC BAC SI 
        //       let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        //       this.setState ({
        //           // Set lai gia tri mang bang ket qua chay
        //           listDoctors: dataSelect
        //       })
        // }
    }

    handleChangeSelect = async selectedOption => {
        // console.log ('selectedOption  : ', selectedOption )
        this.setState({selectedDoctor: selectedOption } );
     
      };

      handleOnChangeDatePicker = (date) => {
        this.setState ({ 
            currentDate: date[0]
        })

        console.log ('handleOnChangeDatePicker : ', date)

      }

    //   Ham bam vao nut button => Hien thi mau vang
    handleClickBtnTime = (time) => {
         // Mang luu tru tat ca thoi gian
         let {rangeTime} = this.state;
        console.log ( 'handleClickBtnTime befor:  ', rangeTime)
        
        if ( rangeTime && rangeTime.length > 0){
            // Lap tung phan tu 1
            rangeTime = rangeTime.map (item => {
                // Khoang thoi gian nao bang voi khoang thoi gian vua Click 
                // => isSelected = True => Chon
                if (item.id === time.id) 
                    item.isSelected = !item.isSelected; // Gan gia tri nguoc lai voi gia tri dau
                return item;
            })

             this.setState ({
                rangeTime: rangeTime
             })
        }
    }

    // Su kien luu thong tin => onClick
    handleSaveSchedule = async () => {
        // Lay mang thoi gian
        let {rangeTime, selectedDoctor, currentDate} = this.state; 
        let result = [];

        // Neu khong co chon ngay => Thong bao
        if (!currentDate) {
            // Hien Thi Tao Thong Bao Tao Nguoi Dung Thanh Cong
            toast.error("Invalid Date!");
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            // Hien Thi Tao Thong Bao Tao Nguoi Dung Thanh Cong
            toast.error("Invalid selected doctor!");
            return;
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formatedDate = new Date (currentDate).getTime ();

        if (rangeTime && rangeTime.length > 0){
            // Chay vong lap mang => Lay ra tat ca cac lua chon thoi gian voi isSelected = true
            let selectedTime = rangeTime.filter (item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0){
                selectedTime.map ((schedule , index) => {
                    console.log ('CHECK SCHEDULE : ' , schedule , index , selectedDoctor)

                    let object = {};
                    object.doctorId = selectedDoctor.value; // value : label
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            }else {
                 // Hien Thi Tao Thong Bao Tao Nguoi Dung Thanh Cong
                 toast.error("Invalid selected time!");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor ({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        });

        if( res && res.data.errCode === 0 ){
            toast.success("Save Infor Success!")
        }else {
            toast.error("Error saveBulkScheduleDoctor ")
            console.log("Error saveBulkScheduleDoctor >>> error : ", res)
        }
        
    }

    render() {  

        let {rangeTime} = this.state;
        let {language} = this.props;
        const { isLoggedIn} = this.props; 
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

        return (
             <div className='manage-schedule-container'>
                    <div className='m-s-title'> 
                        < FormattedMessage id='manage-schedule.title'/>
                    </div>
                    <div className='container'>
                        <div className='col-6 form-group' >
                            <label> < FormattedMessage id='manage-schedule.choose-doctor'/></label>
                            <Select
                                 value={this.state.selectedDoctor }
                                 onChange={this.handleChangeSelect}
                                 options={this.state.listDoctors} 
                           />

                        </div>
                        <div className='col-6 form-group' >
                            <label> < FormattedMessage id='manage-schedule.choose-date'/></label>
                            <DatePicker
                                 onChange= {this.handleOnChangeDatePicker}
                                 className= "form-control"
                                 value =  {this.state.currentDate[0]}
                                 minDate = {yesterday}
                                // selected = {this.state.currentDate}
                                // defaultValue = {new Date ()}
                            />

                        </div>
                        <div className='col-12 pick-hour-container'>
                             {rangeTime && rangeTime.length > 0 &&
                             rangeTime.map ((item, index) => {
                                return (
                                    <button className={item.isSelected === true ? 'btn btn-schedule active' :  'btn btn-schedule'}
                                    key={index} 
                                    onClick={() => this.handleClickBtnTime(item)}

                                    >
                                        {language === LANGUAGES.VI ? item.valueVn : item.valueEn} 
                                       
                                        </button>
                                )
                             })}

                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                            onClick={() => this.handleSaveSchedule()}
                            >
                            < FormattedMessage id='manage-schedule.save'/>
                             </button>
                        </div>
                          
                    </div>
             </div>
                 
            
        );
    }
}

const mapStateToProps = state => {
    return { 
        isLoggedIn: state.user.isLoggedIn,
         // Chuyen doi ngon ngu Anh Viet
         language: state.app.language,
         // Lay tat ca danh sach cac bac si
         allDoctors: state.admin.allDoctors,
         allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
