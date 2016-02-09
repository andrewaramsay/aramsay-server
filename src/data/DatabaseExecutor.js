'use strict';

class DatabaseExecutor {
  findMany(query, callback) {
    const self = this;
    let Model = query.model;
    let mongooseQuery = Model.find(query.condition, query.fields, query.options);
    self._runQuery(query, mongooseQuery, callback);
  }

  findById(query, callback) {
    const self = this;
    let Model = query.model;
    let mongooseQuery = Model.findById(query.id, query.fields, query.options);
    self._runQuery(query, mongooseQuery, callback);
  }

  findOne(query, callback) {
    const self = this;
    let Model = query.model;
    let mongooseQuery = Model.findOne(query.condition, query.fields, query.options);
    self._runQuery(query, mongooseQuery, callback);
  }

  saveData(write, callback) {
    let Model = write.model;
    let model = new Model(write.data);
    model.save((err, rec) => callback(err, rec && rec.id));
  }

  updateRecordById(query, callback) {
    let Model = query.model;
    Model.findByIdAndUpdate(query.id, query.data, query.options, callback);
  }

  deleteRecords(query, callback) {
    let Model = query.model;
    Model.remove(query.condition, callback);
  }

  deleteRecordById(query, callback) {
    let Model = query.model;
    Model.findByIdAndRemove(query.id, query.options, callback);
  }


  _runQuery(query, mongooseQuery, callback) {
    for (let property of query.populate || []) {
      mongooseQuery = mongooseQuery.populate(property);
    }
    mongooseQuery.exec(callback);
  }
}

module.exports = DatabaseExecutor;
