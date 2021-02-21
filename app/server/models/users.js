const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.matricNumber = matricNumber;
    this.program = program;
    this.graduationYear = graduationYear;
    }

    getFullName() {
    return this.firstname + " " + this.lastname;
    }
}

class Users extends DataModel {
    authenticate(email, password) {
        for(let i = 0 ; i< this.data.length;i++){
            if(email === this.data[i].email && password === this.data[i].password){
                return true;
            }
        }
        return false;
    }

    getByEmail = email => {
        for (let obj of this.data) {
            if (obj.email === email){
                return obj;
            }
        };
        return null;
    };


    getByMatricNumber(matricNumber) {
        for (let obj of this.data) {
            if (obj.matricNumber === matricNumber){
                return obj;
            }
        };
        return null;

    }

    validate(obj) {
    if(obj.id && obj.firstname && obj.lastname && obj.email && obj.password
        && obj.matricNumber && obj.program && obj.graduationYear){
        if(this.data.filter(User => User.email === obj.email || User.matricNumber === obj.matricNumber).length === 0){
                if(obj.password.length>=7){
                   return true
                }else{
                    return false
                }
            }
        }
    }

}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};