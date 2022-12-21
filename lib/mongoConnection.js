const { MongoClient, ObjectId} = require('mongodb');

const config = require('../config');

class MongoLIb {
    constructor() {
        this.client = new MongoClient(config.db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        this.dbName = config.db_name;
    }

    async connect() {
        if (!MongoLIb.connection) {
            await this.client.connect();
            MongoLIb.connection  = this.client.db(this.dbName);
            return MongoLIb.connection;
        }
        return MongoLIb.connection;
    }

    async getAll(collection, query) {
        const db = await this.connect();
        return db.collection(collection).find(query).toArray();
    }

    async getById(collection, id) {
        const db = await this.connect();
        return db.collection(collection).findOne({_id: ObjectId(id)});
    }

    async createOne(collection, data) {
        const db = await this.connect();
        return db.collection(collection).insertOne(data);
    }

    async editOne(collection, id, data) {
        const db = await this.connect();
        return db.collection(collection).updateOne({ _id: ObjectId(id)}, { $set: data});
    }

    async addPersonToCourse(collection, courseId, personId) {
        const db = await this.connect();
        return db.collection(collection).updateOne(
            { _id: ObjectId(courseId)},
            { $addToSet: { people: ObjectId(personId)}}
        );
    }

    async getGlobalSeach(courseCollection, peopleCollection, keyword) {
        let courses, people, items;
        const db = await this.connect();
        courses = await db.collection(courseCollection).find({$text: {$search: keyword}}).toArray();
        console.log(courses);
        people = await db.collection(peopleCollection).find({$text: {$search: keyword}}).toArray();
        items = [...courses, ...people]
        return items;
    }
}



module.exports = MongoLIb;