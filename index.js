const ORMIntegration = require('./utils/orm-integration')

const factories = {}
const models = ORMIntegration.fetchModelsInstances()

function define(name, factory, options = {}) {
  if (factories.hasOwnProperty(name)) {
    throw new Error(`Factory ${name} is already defined.`)
  }
  factories[name] = _addProperties(factory, options.modelName ? options.modelName : name)
}

function defineAs(factoryName, newName, newData) {
  _checkFactoryExistence(factoryName)
  let currentFactory = factories[factoryName]
  define(newName, Object.assign(currentFactory, newData), { modelName: factoryName })
}

function build(name, additionalData = {}) {
  _checkFactoryExistence()
  let factory = factories[name]
  if (Object.keys(additionalData).length) {
    factory = Object.assign(factory, additionalData)
  }
  return models[name].build(factory)
}

function create(name, additionalData = {}) {
  return models[name].create(build(name, additionalData))
}

function _checkFactoryExistence(name) {
  if (!factories.hasOwnProperty(name)) {
    throw new Error(`Factory ${name} has not been defined`)
  }
}

function _addProperties(obj, modelName) {
  return Object.assign(obj, { __properties: {
    modelName: modelName
  }})
}

exports = {
  build,
  define,
  defineAs,
  create
};
