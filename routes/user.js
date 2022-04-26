const express = require('express');
const router = express.Router();
/**
 * User Routes
 */
router.get('/', (req, res) => {
    res.send('get user!');
});
router.post('/', (req, res) => {
    res.send('post user ');
});
router.put('/{id}/update', (req, res) => {
    res.send('put user!');
});
router.delete('/{id}/delete', (req, res) => {
    res.send('delete user!');
});

module.exports = router;
