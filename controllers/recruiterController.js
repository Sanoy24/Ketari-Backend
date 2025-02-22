const Job = require("../Model/jobSchema");
const asyncHandler = require("express-async-handler");
const AppliedJob = require("../Model/appliedJobSchema");

// Get Job All Via Applicant Id
const getJobByRecruiter = asyncHandler(async (req, res, next) => {
  try {
    const getJobByRecruiter = await Job.find({
      recruiter: req.user.id,
    }).populate("recruiter", "_id name");
    if (getJobByRecruiter) {
      res.status(200).json({
        JobByRecruiter: getJobByRecruiter,
      });
    } else {
      res.status(400).json({
        message: "Something went wrong. Please try Again",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Get Job All Via Applicant Id
const getApplicantByJob = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  try {
    const getApplicantByJob = await AppliedJob.find({
      job: { _id: req.params.id },
    });
    if (getApplicantByJob) {
      res.status(200).json({
        ApplicantByJob: getApplicantByJob,
      });
    } else {
      res.status(400).json({
        message: "Something went wrong. Please try Again",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Post New Job Controller
const postJob = asyncHandler(async (req, res, next) => {
  try {
    const newJob = await Job.create({ ...req.body, recruiter: req.user.id });
    console.log("new job", newJob);
    if (newJob) {
      res.status(200).json({
        success: true,
        message: "Successfully Create The Job",
        newJob,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something went wrong. Please try again",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Delete Job Controller
const deleteJob = asyncHandler(async (req, res, next) => {
  try {
    const isDelete = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (isDelete) {
      res.status(200).json({
        success: true,
        message: `Job deleted successfully`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Job not found by the id: ${req.params.id}`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = {
  postJob,
  getJobByRecruiter,
  getApplicantByJob,
  deleteJob,
};
