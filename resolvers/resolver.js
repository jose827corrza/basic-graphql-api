'use strict'

const mutations = require('./mutations');
const queries = require('./queries');
const types = require('./types');

module.exports = { 
    Query: queries,
    // getTests: () => {
    //     return courses;
    // },
    Mutation: mutations,
    ...types,
};

const courses = [
    {
        _id: "anyId2",
        title: "titulo1",
        teacher: "Pepe",
        description: "Some description",
        topic: "topic",
    },
    {
        _id: "anyId3",
        title: "titulo2",
        teacher: "Pepe",
        description: "Some description",
        topic: "topic",
    },
    {
        _id: "anyId",
        title: "titulo3",
        teacher: "Pepe",
        description: "Some description",
        topic: "topic",
    },
]