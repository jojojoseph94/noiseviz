const MongoClient = require("mongodb").MongoClient;
const dbname = "cmpe273";

const url = "mongodb+srv://user:*****";

const mongoOptions = {useNewUrlParser : true};

const state = {
    db: null
};

const connect = (cb) => {
    if(state.db)
        cb();
    else{
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            if(err)
                cb(err);
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getDB = ()=>{
    return state.db;
}

module.exports = {getDB,connect};
