const ContactService = require('../services/contact.service');

exports.getAll = (req, res) => {
  ContactService.getAll(result => {
    res.send(result);
  });
}

exports.create = (req, res) => {
  const data = req.body;
  ContactService.create(data, result => {
    res.json(result);
  });
}

exports.update = (req, res) => {
  const data = req.body;
  ContactService.updateStatus(data, result => {
    res.json(result);
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  ContactService.delete(id, result => {
    res.json(result);
  });
}
