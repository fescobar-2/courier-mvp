const express = require('express');
const { Package } = require('../models');
const authenticate = require('../middleware/auth');

const router = express.Router();


/**
 * @swagger
 * /package:
 *   post:
 *     summary: Create a package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - trackingNumber
 *             properties:
 *               description:
 *                 type: string
 *               trackingNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Package created
 */
router.post('/', authenticate, async (req, res) => {
  const pkg = await Package.create({ ...req.body, UserId: req.user.id });
  res.json(pkg);
});

/**
 * @swagger
 * /package:
 *   get:
 *     summary: Get all packages for the logged-in user
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of packages
 */
router.get('/', authenticate, async (req, res) => {
  const packages = await Package.findAll({ where: { UserId: req.user.id } });
  res.json(packages);
});

/**
 * @swagger
 * /package/{id}:
 *   get:
 *     summary: Get package by ID for authenticated user
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package object
 *       404:
 *         description: Package not found
*/
router.get('/:id', authenticate, async (req, res) => {
  const pkg = await Package.findOne({
    where: { id: req.params.id, UserId: req.user.id }
  });
  if (!pkg) return res.status(404).json({ message: 'Package not found' });
  res.json(pkg);
});

/**
 * @swagger
 * /package/{id}:
 *   put:
 *     summary: Update a package by ID
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               trackingNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Package updated
 *       404:
 *         description: Package not found
 */
router.put('/:id', authenticate, async (req, res) => {
  const [updated] = await Package.update(req.body, {
    where: { id: req.params.id, UserId: req.user.id }
  });
  if (!updated) return res.status(404).json({ message: 'Package not found' });
  res.json({ message: 'Updated' });
});

/**
 * @swagger
 * /package/{id}:
 *   delete:
 *     summary: Delete a package by ID
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Package ID
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Package not found
 */
router.delete('/:id', authenticate, async (req, res) => {
  const deleted = await Package.destroy({
    where: { id: req.params.id, UserId: req.user.id }
  });
  if (!deleted) return res.status(404).json({ message: 'Package not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
