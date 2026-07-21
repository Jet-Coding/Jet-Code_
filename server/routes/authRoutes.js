const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of a route protected by both Authentication and RBAC
router.get('/admin-dashboard', protect, authorizeRoles('Admin'), (req, res) => {
    res.json({ message: 'Welcome to the secure Admin Dashboard!' });
});

module.exports = router;