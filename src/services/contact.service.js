const ContactModel = require('../models/contact.model');

const ContactService = {
  getAll        : (result)          => ContactModel.getAll(result),
  create        : (contact, result) => ContactModel.create(contact, result),
  updateStatus  : (contact, result) => ContactModel.updateStatus(contact, result),
  delete        : (id, result)      => ContactModel.delete(id, result),
}

module.exports = ContactService;