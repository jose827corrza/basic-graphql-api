'use strict'
const { ObjectId } = require('mongodb');

const dbConn = require('../lib/mongoConnection');
const errorHandler = require('../lib/errorHandler');

module.exports = {
    Course: {
        people: async ({ people }) => { //Here we receive all the course type, nevertheless, we only care about people
            try {
                const db = new dbConn();
                const ids = people ? people.map(id => ObjectId(id)) : [];
                const peopledata = ids.length > 0 ?
                    await db.getAll('students', { _id: { $in: ids}}) : [];
                return peopledata;
            } catch(err) {
                errorHandler(err);
            }
            
        }
    },
    Person: {
        __resolveType: (person, context, info) => {
            if (person.phone) {
                return 'Monitor'
            }
            return 'Student'
        }
    },
    GlobalSearch: {
        __resolveType: (item, context, info) => {
            if (item.title) {
                return 'Course'
            }
            if (item.phone) {
                return 'Monitor'
            }
            return 'Student'
        }
    }
}