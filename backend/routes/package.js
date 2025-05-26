const express = require('express');
const { Package } = require('../models');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const pkg = await Package.create({ ...req.body, UserId: req.user.id });
  res.json(pkg);
});

router.get('/', authenticate, async (req, res) => {
  const packages = await Package.findAll({ where: { UserId: req.user.id } });
  res.json(packages);
});

router.get('/:id', authenticate, async (req, res) => {
  const pkg = await Package.findOne({
    where: { id: req.params.id, UserId: req.user.id }
  });
  if (!pkg) return res.status(404).json({ message: 'Package not found' });
  res.json(pkg);
});

router.put('/:id', authenticate, async (req, res) => {
  const [updated] = await Package.update(req.body, {
    where: { id: req.params.id, UserId: req.user.id }
  });
  if (!updated) return res.status(404).json({ message: 'Package not found' });
  res.json({ message: 'Updated' });
});

router.delete('/:id', authenticate, async (req, res) => {
  const deleted = await Package.destroy({
    where: { id: req.params.id, UserId: req.user.id }
  });
  if (!deleted) return res.status(404).json({ message: 'Package not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
