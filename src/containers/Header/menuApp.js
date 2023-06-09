// THANH MENU 

export const adminMenu = [
    { // Quản lý người dùng
        name: 'menu.admin.manage-user', menus: [
                {
                name: 'menu.admin.crud', link: '/system/user-manage' 
              },
              {
                name: 'menu.admin.crud-redux', link: '/system/user-redux' 
              },
              {
              name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //   ]
              },

              // {
              //   name: 'menu.admin.manage-admin', link: '/system/user-admin' 
              // },
              
              { // KE HOACH QUAN LY KHAM BENH CUA BAC SI
                
                        name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' 
                     
            } 
            
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { // Quản lý phòng khám
        name: 'menu.admin.clinic', menus: [
                {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' 
              } 
               
        ]
    },
    { // Quản lý chuyên khoa
        name: 'menu.admin.speciality', menus: [
                {
                name: 'menu.admin.manage-speciality', link: '/system/manage-speciality' 
              } 
               
        ]
    } 
];


// THANH MENU => BAC SI

export const doctorMenu = [
  {
  name: 'menu.admin.manage-user', 
      menus: [
              {
              name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' 
            } ,
            {
              name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient' 
            } ,
          // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
      ]
  }  
];