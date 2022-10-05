const ProjectModel = require('../models/project_model');

const getProjectList = async (req, res, next) => {
  try {
    const response = await ProjectModel.getProjectList(req.query.paging);
    res.status(200).json({ data: response });
    return;
  } catch (err) {
    next(err);
  }
};

const getProjectDetail = async (req, res, next) => {
  try {
    const response = await ProjectModel.getProjectDetail(req.query.projectid);
    res.status(200).json({ data: response });
    return;
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProjectList,
  getProjectDetail
};
