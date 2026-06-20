const Community = require("../models/Community");
const User = require("../models/User");

const createCommunity = async (req, res) => {
  try {
    const {
      name,
      description,
      logo,
      privacy,
    } = req.body;

    const community = await Community.create({
      name,
      description,
      logo,
      privacy,
      owner: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json({
      success: true,
      community,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyCommunities = async (req, res) => {
  try {

    const communities =
      await Community.find({
        owner: req.user._id,
      });

    res.status(200).json({
      success: true,
      communities,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getCommunityById = async (
  req,
  res
) => {
  try {

    const community =
      await Community.findById(
        req.params.id
      )
      .populate(
        "owner",
        "fullName profilePic"
      )
      .populate(
        "members",
        "fullName profilePic"
      )
      .populate(
        "contents.watchedBy",
        "fullName profilePic"
      );

    if (!community) {
      return res.status(404).json({
        success: false,
        message:
          "Community not found",
      });
    }

    res.status(200).json({
      success: true,
      community,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteCommunity = async (
  req,
  res
) => {
  try {

    const community =
      await Community.findById(
        req.params.id
      );

    if (!community) {
      return res.status(404).json({
        success:false,
        message:"Community not found",
      });
    }

    if (
      community.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success:false,
        message:
          "Only creator can delete community",
      });
    }

    await Community.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success:true,
      message:
        "Community deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};

const joinCommunity = async (req, res) => {
  try {

    const community =
      await Community.findById(
        req.params.id
      );

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found",
      });
    }

    if (
      community.members.includes(
        req.user._id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Already joined",
      });
    }

    community.members.push(
      req.user._id
    );

    await community.save();

    const user = await User.findById(
      req.user._id
    );

    if (
      !user.joinedCommunities.some(
        (communityId) =>
          communityId.toString() ===
          community._id.toString()
      )
    ) {
      user.joinedCommunities.push(
        community._id
      );
      await user.save();
    }

    res.status(200).json({
      success: true,
      community,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getUserCommunities =
  async (req, res) => {

    try {

      const communities =
        await Community.find({
          $or: [
            { owner: req.user._id },
            { members: req.user._id },
          ],
        });

      res.status(200).json({
        success: true,
        communities,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
};

const addContent = async (req, res) => {
  try {

    const {
      title,
      description,
      type,
      url,
    } = req.body;

    const community =
      await Community.findById(
        req.params.id
      );

    if (!community) {
      return res.status(404).json({
        success: false,
        message:
          "Community not found",
      });
    }

    community.contents.push({
      title,
      description,
      type,
      url,
      uploadedBy: req.user._id,
    });

    await community.save();

    res.status(201).json({
      success: true,
      message:
        "Content added successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteContent = async (req, res) => {
  try {
    const { id, contentId } = req.params;

    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found",
      });
    }

    const contentIndex = community.contents.findIndex(
      (content) =>
        content._id.toString() ===
        contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Content item not found",
      });
    }

    const contentItem = community.contents[contentIndex];

    if (
      community.owner.toString() !==
        req.user._id.toString() &&
      contentItem.uploadedBy?.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only the community owner or uploader can delete this content",
      });
    }

    community.contents.splice(contentIndex, 1);
    await community.save();

    res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPopularCommunities = async (req, res) => {
  try {

    const communities =
      await Community.find({
        privacy: "Public",
      });

    communities.sort((a, b) => {

      const memberDiff =
        b.members.length -
        a.members.length;

      if (memberDiff !== 0) {
        return memberDiff;
      }

      const aLatest =
        a.contents.length > 0
          ? new Date(
              a.contents[
                a.contents.length - 1
              ].uploadedAt
            )
          : new Date(0);

      const bLatest =
        b.contents.length > 0
          ? new Date(
              b.contents[
                b.contents.length - 1
              ].uploadedAt
            )
          : new Date(0);

      return bLatest - aLatest;
    });

    res.status(200).json({
      success: true,
      communities:
        communities.slice(0, 3),
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const searchCommunities =
  async (req, res) => {

    try {

      const search =
        req.query.search || "";

      const communities =
        await Community.find({
          privacy: "Public",
          name: {
            $regex: search,
            $options: "i",
          },
        });

      res.json({
        success: true,
        communities,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };
  const markContentViewed =
  async (req, res) => {

    const communities =
      await Community.find();

    let content;

    let community;

    for (const c of communities) {

      content =
        c.contents.id(
          req.params.contentId
        );

      if (content) {
        community = c;
        break;
      }
    }

    if (!content) {
      return res.status(404).json({
        success:false,
      });
    }

    const alreadyViewed =
      content.watchedBy.some(
        (id) =>
          id.toString() ===
          req.user._id.toString()
      );

    if (!alreadyViewed) {

      content.watchedBy.push(
        req.user._id
      );

      await community.save();
    }

    res.json({
      success:true,
    });
};

module.exports = {
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
};