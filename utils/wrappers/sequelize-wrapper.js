class SequelizeWrapper {

  constructor(model) {
    this._model = model;
  }

  build(attributes) {
    return this._model.build(attributes)
  }

  create(attributes) {
    return this._model.create(attributes)
  }
}

module.exports.SequelizeWrapper = SequelizeWrapper