'use strict'


const dbConn = require('../lib/mongoConnection');
const errorHandler = require('../lib/errorHandler');

module.exports = {
    
        hello: () =>  'Hello World!',
        saludo: () => {return 'Holis'},
        // Courses
        getCourses: async() => {
            let db, courses = [];
            try {
                const db = new dbConn();
                return db.getAll('courses');
            } catch(err) {
                errorHandler(err);
            }
            return courses
        },
        getCourse: async (_, args) => {
            console.log(args);
            // let test = "anyId2"
            // const course = courses.filter(course => course._id === args.id)
            // console.log('****');
            // console.log(course);
            // return course.pop();
            try {
                const db = await new dbConn();
                return db.getById('courses', args.id);
            } catch(err) {
                errorHandler(err);
            } 
        },
        // Students
        getPeople: async() => {
            let db, students = [];
            try {
                const db = new dbConn();
                return db.getAll('students');
            } catch(err) {
                errorHandler(err);
            }
            return students
        },
        getPerson: async (_, args) => {
            console.log(args);
            // let test = "anyId2"
            // const course = courses.filter(course => course._id === args.id)
            // console.log('****');
            // console.log(course);
            // return course.pop();
            try {
                const db = new dbConn();
                return db.getById('students', args.id);
            } catch(err) {
                errorHandler(err);
            } 
        },
        getItems: async (_, args) => {
            try {
                const db = new dbConn();
                const test = await db.getGlobalSeach('courses', 'students', args.key);
                return test;
            } catch(err) {
                errorHandler(err);
            } 
        }
    
}