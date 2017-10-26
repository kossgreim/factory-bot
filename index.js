const ORMIntegrator = require('./utils/orm-integrator')
const config = require('./config')

const ormIntegrator = new ORMIntegrator({}, config.ORM.name)

class FactoryNode {
  constructor() {
    this._factories = {}
    this.models = ormIntegrator.getModels()
  }

  define(name, factory, options = {}) {
    if (this._factories.hasOwnProperty(name)) {
      throw new Error(`Factory ${name} is already defined.`)
    }
    this._factories[name] = this._addProperties(factory, options.modelName ? options.modelName : name)
  }

  defineAs(factoryName, newName, newData) {
    this._checkFactoryExistence(factoryName)
    let currentFactory = this._factories[factoryName]
    this.define(newName, Object.assign(currentFactory, newData), { modelName: factoryName })
  }

  build(name, additionalData = {}) {
    this._checkFactoryExistence()
    let factory = this._factories[name]
    if (Object.keys(additionalData).length) {
      factory = Object.assign(factory, additionalData)
    }
    const modelName = factory.__properties && factory.__properties.modelName ? factory.__properties.modelName : name
    return this.models[modelName].build(this._purifyFactory(factory))
  }

  create(name, additionalData = {}) {
    return this.models[name].create(this.build(name, additionalData))
  }

  getAllFactories() {
    return this._factories;
  }

  _checkFactoryExistence(name) {
    if (!this._factories.hasOwnProperty(name)) {
      throw new Error(`Factory ${name} has not been defined`)
    }
  }

  _addProperties(obj, modelName) {
    return Object.assign(obj, { __properties: {
      modelName: modelName
    }})
  }

  _purifyFactory(factory) {
    delete factory.__properties
    return factory
  }
}

const factoryNode = new FactoryNode()

module.exports = factoryNode


