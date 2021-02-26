const express = require('express');
const router = express.Router();
const postController = require('../controller/post')

router.get('/', postController.getHomepage)
router.get('/product',postController.getProduct)
router.get('/signin', postController.getSignInPage)
router.get('/signup',postController.getSignUpPage)

router.post('/post', postController.createPost);
router.get('/posts',postController.getPosts);
router.delete('/posts/:postID', postController.deletePost)

module.exports = router;