const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
    this.id = id;
    this.name = name;
    this.abstract = abstract;
    this.authors = authors;
    this.tags = tags;
    this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj) {
        return "authors" in obj
            && "tags" in obj
            && Array.isArray(obj["authors"])
            && Array.isArray(obj["tags"])
            && obj["authors"].length > 0
            && obj["tags"].length > 0
            && obj.id !== ""
            && obj.name !== ""
            && obj.abstract !== ""
            && obj.createdBy !== "";
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};