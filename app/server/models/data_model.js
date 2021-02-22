class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        for (const obj of this.data) {
            if (obj.id === id){
                return obj;
            }
        };
        return null;
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

        // get index of object with id
        var removeIndex = this.data.map(function(item) {return item.id; }).indexOf(id);
        if(!removeIndex){
            return false
        }else{
            // remove object
            this.data.splice(removeIndex, 1);
            return true
        }


    }


    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;