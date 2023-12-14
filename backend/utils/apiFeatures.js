// utils/APIFeatures.js
const { Op } = require("sequelize");

class APIFeatures {
  constructor(model, queryStr) {
    this.model = model;
    this.queryStr = queryStr;
  }

  async search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            [Op.iLike]: `%${this.queryStr.keyword}%`,
          },
        }
      : {};

    this.model = await this.model.findAll({
      where: { ...keyword },
    });

    return this;
  }

  async filter() {
    const queryCopy = { ...this.queryStr };

    // Removing fields from the query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advanced filter for other fields
    let whereClause = {};

    for (const key in queryCopy) {
      if (queryCopy.hasOwnProperty(key)) {
        whereClause[key] = {
          [Op.eq]: queryCopy[key],
        };

        // Add more cases for other operators as needed
        // For example:
        // if (key === 'price') {
        //   whereClause[key] = {
        //     [Op.gte]: queryCopy[key],
        //   };
        // }
      }
    }

    this.model = await this.model.findAll({
      where: whereClause,
    });

    return this;
  }

  async pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const offset = resPerPage * (currentPage - 1);

    this.model = await this.model.findAll({
      limit: resPerPage,
      offset: offset,
    });

    return this;
  }

  getModel() {
    return this.model;
  }
}

module.exports = APIFeatures;
