/**  Lists of image object fields, that are omitted from the image object
 before being sent to the requester, depending on what type of user
 is requesting thos objects. These are strings, representing
 select: operator in options object of mongoose populate() model method. */

const omitedImageFields = {
  userOwner: "-imageHostingId -smallImageHostingId -width -height",
  userSharedWith:
    "-imageHostingId -smallImageHostingId -imageInfo.openedTo -imageInfo.sharedByLink -width -height",
  userPublic:
    "-imageHostingId -smallImageHostingId -imageInfo.openedTo -imageInfo.belongsTo -imageInfo.sharedByLink -width -height",
};

module.exports = omitedImageFields;
