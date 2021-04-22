import {authUser, getUserProfile, registerUser, updateUserProfile} from '../controllers/userController.js'

import express from 'express';
import {protect} from '../middleware/authMiddleware.js'

// A route determins what function controller should handle a spesific request to the api. 

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;