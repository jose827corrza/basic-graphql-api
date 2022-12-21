'use strict'
const dbConn = require('../lib/mongoConnection');
const errorHandler = require('../lib/errorHandler');

module.exports = {
    createCourse: async(_, { input }) => {
        const defaults = {
            title: '',
            topic: ''
        };
        const newCourse = Object.assign(defaults, input);
        try {
            const db = new dbConn();
            let test = await db.createOne('courses', newCourse);
            console.log(test);
            return await db.getById('courses', test.insertedId);
        } catch(err) {
            errorHandler(err);
        }
    },
    createPerson: async(_, { input }) => {
        let student;
        try {
            const db = new dbConn();
            student = await db.createOne('students', input);
            input._id = student.insertedId;
        } catch(err) {
            errorHandler(err);
        }
        return input;
    },
    editCourse: async (_, { id, input }) => {
        try {
            const db = new dbConn();
            await db.editOne('courses', id, input);
            return db.getById('courses', id);
        }catch(err){
            errorHandler(err);
        }
    },
    editPerson: async (_, { id, input }) => {
        try {
            const db = new dbConn();
            await db.editOne('students', id, input);
            return db.getById('students', id);
        }catch(err){
            errorHandler(err);
        }
    },
    addPeople: async(_, {courseId, personId}) => {
        try {
            const db = new dbConn();
            // const student = await db.getById('students', personId);
            await db.addPersonToCourse('courses', courseId, personId);
            return await db.getById('courses', courseId);
        }catch(err) {
            errorHandler(err);
        }
    }
}