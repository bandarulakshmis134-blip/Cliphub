const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createCommunity,
  getMyCommunities,
  getCommunityById,
  deleteCommunity,
  joinCommunity,
  getUserCommunities,
  addContent,
  deleteContent,
  getPopularCommunities,
  searchCommunities,
  markContentViewed,
} = require("../controllers/communityController");

router.post(
  "/create",
  protect,
  createCommunity
);
router.get(
  "/my-communities",
  protect,
  getMyCommunities
);
router.get(
  "/user-communities",
  protect,
  getUserCommunities
);
router.post(
  "/:id/content",
  protect,
  addContent
);
router.delete(
  "/:id/content/:contentId",
  protect,
  deleteContent
);
router.get(
  "/popular",
  getPopularCommunities
);
router.get(
  "/search",
  searchCommunities
);
router.put(
  "/content/:contentId/watch",
  protect,
  markContentViewed
);
router.get(
  "/:id",
  protect,
  getCommunityById
);
router.put(
  "/:id/join",
  protect,
  joinCommunity
);

router.delete(
  "/:id",
  protect,
  deleteCommunity
);

module.exports = router;