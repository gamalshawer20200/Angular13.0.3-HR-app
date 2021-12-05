export class EmployeeModel{
    // i:number = 0

    username:string = ''
    
    password:string = ''
    
    contactInfo = {
        EMAIL: '',
    
        PHONE_NUMBER: '',
    
        SALARY: '',

        ADDRESS: '',  

        FIRST_NAME: '', 

        LAST_NAME:'',  

        BBX:'',

        HIRE_DATE:'',

    }
    department? = {
        DEPARTMENT_NAME:'',
        LOCATION:''
    }
}