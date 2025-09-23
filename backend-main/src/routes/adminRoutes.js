const express = require('express');
const router = express.Router();
const { getAnalytics, registerAdmin, loginAdmin, datasetUpload } = require('../controllers/adminController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/analytics', getAnalytics);
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/dataset', upload.single('dataset'), datasetUpload);

module.exports = router;