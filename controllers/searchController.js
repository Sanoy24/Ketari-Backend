const jobSchema = require("../Model/jobSchema");
const sanitizedString = require("../utilities/sanitizedString");

const getSearchResult = async (req, res, next) => {
  try {
    const { keyword, location, category } = req.query;

    const keywordRegex = new RegExp(sanitizedString(keyword), "i");
    const locationRegex = new RegExp(sanitizedString(location), "i");

    const searchResult = await jobSchema.find({
      $or: [
        { title: { $regex: keywordRegex } },
        { description: { $regex: keywordRegex } },
        { address: { $regex: locationRegex } },
        { categoryName: { $regex: category } },
      ],
    });

    res.status(200).json({ searchResult });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getSearchResult;
