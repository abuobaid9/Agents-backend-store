'use strict';

class DataCollection {

  constructor(model) {
    this.model = model;
  }
  get(id) {
    return this.model.findOne({
      where: {
        id: id
      }
    });
  }

  getAll(id) {
    return this.model.findAll({
      where: {
        user_id: id
      }
    });
  }

  create(record) {
    return this.model.create(record);
  }

  update(id, data, id2) {
    return this.model.findOne({
      where: {
        user_id: id2,
        id: id
      }
    })
      .then(record => {
        console.log(record)
        if (record) {
          record.update(data);
          return record;
        } else {
          return 'Access denied';
        }
      });
  }

  deleteAll(id) {
    return this.model.destroy({
      truncate: {
        cascade: true
      },
      where: {
        user_id: id
      }
    });
  }
}

module.exports = DataCollection;