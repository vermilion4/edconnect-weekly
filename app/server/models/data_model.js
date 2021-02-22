class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        for (let obj of this.data) {
            if (obj.id === id){
                return obj;
            }
            else{
                return null
            }
        }

    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        let find = this.getById(id)
        if(find === undefined){
            return false
        }else
        {
            var temp = find;
            for (const property in obj) {
                temp[property] = obj[property];
            }
            find = temp
            return true;
        }

    }

    delete(id) {
        let finder = this.data.filter(e => e.id === id)
        if(finder === undefined){
           return false
        }else{
            this.data.splice(this.data.findIndex(e=>e.id === finder.id),1)
            return true
        }
    console.log(this.data)
    }


    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;