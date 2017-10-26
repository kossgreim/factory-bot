const wrappers = require('./wrappers')

module.exports = class ORMIntegrator {

  constructor(models, ormName) {
    Object.keys(models).forEach(modelName => {
      const wrapperClassName = `${ormName}Wrapper`;
      if (!wrappers.hasOwnProperty(wrapperClassName)) {
        throw new Error(`Wrapper ${wrapperClassName} does not exist`)
      }
      Object.assign(this._models, new wrappers[wrapperClassName](models[modelName]))
    });
    this._models = models;
  }

  getModels() {
    return this._models
  }
}