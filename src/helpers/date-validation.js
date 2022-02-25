const { isExists, isAfter } = require("date-fns");

module.exports = {
  // Check if a given date is exists
  isValidDate(dateToTest) {
    const result = dateToTest.split("-");
    console.log(result[0], result[1], result[2]);
    const newDate = isExists(+result[0], +(result[1] - 1), +result[2]);
    return newDate;
  },
  // Check if a given date is exists
  isDateAfter(startDate, endDate) {
    const splitStartDate = startDate.split("-");
    const splitEndDate = endDate.split("-");
    return isAfter(
      new Date(+splitEndDate[0], +(splitEndDate[1] - 1), +splitEndDate[2]),
      new Date(+splitStartDate[0], +(splitStartDate[1] - 1), +splitStartDate[2])
    );
  },
};
