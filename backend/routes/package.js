const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const User = require('../models/User');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, async (req, res) => {
  const packages = await Package.findAll({ include: User });
  res.json(packages);
});

router.post('/', authenticate, async (req, res) => {
  const pkg = await Package.create(req.body);
  res.json(pkg);
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const pkg = await Package.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const pkg = await Package.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });

    await pkg.update(req.body);
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const pkg = await Package.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });

    await pkg.destroy();
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;