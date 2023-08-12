const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const postModel = require('../models/post.model');
const categoryModel = require('../models/category.model');
const roleType = require('../config/roles');

const createPost = catchAsync(async (req, res) => {
  const category = await categoryModel.getCategoryByName(req.body.categoryname);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  req.body.categoryid = category.categoryid;
  const post = await postModel.createPost(req.body);
  res.status(httpStatus.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  let posts;
  if (req.user.membership === roleType.ADMIN) {
    // Get all posts for admin
    posts = await postModel.getAllPosts();
  } else if (req.user.membership === roleType.PREMIUM) {
    // Get normal and premium posts for premium users
    posts = await postModel.getAllPostsPublished();
  } else {
    // Get only normal posts for normal users
    posts = await postModel.getNormalPostsPublished();
  }

  res.status(httpStatus.OK).send(posts);
});

const getPost = catchAsync(async (req, res) => {
  const post = await postModel.getPostById(req.params.postId);
  // Check if the user is a normal user and the post is premium
  if (
    (req.user.membership !== roleType.PREMIUM ||
      req.user.membership !== roleType.ADMIN) &&
    post.label === 'Premium'
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Premium Content, upgrade to unlock'
    );
  }
  // Check if post is not published and user is not admin
  if (req.user.membership !== roleType.ADMIN && post.status !== 'Published') {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  res.send(post);
});

const updatePost = catchAsync(async (req, res) => {
  const category = await categoryModel.getCategoryByName(req.body.categoryname);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  req.body.categoryid = category.categoryid;
  const post = await postModel.updatePostById(req.params.postId, req.body);
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  await postModel.deletePostById(req.params.postId);
  res.status(httpStatus.OK).send({ message: 'Post deleted' });
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
