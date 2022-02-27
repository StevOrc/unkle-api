const { isBefore, format } = require("date-fns");

module.exports = {
  /**
   * Will update the status of the contract depends on startDate and endDate of the currentContract
   * @param {*} contract
   */
  validateStatus(contract) {
    let status = "";
    const splitStartDate = format(contract.startDate, "yyyy-MM-dd").split("-");
    const dateNow = new Date(Date.now());
    const isDateNowBeforeStartDate = isBefore(
      new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()),
      new Date(splitStartDate[0], splitStartDate[1] - 1, splitStartDate[2])
    );

    if (isDateNowBeforeStartDate) {
      status = "pending";
    } else {
      status = "active";
      if (contract.endDate) {
        const splitEndDate = format(contract.endDate, "yyyy-MM-dd").split("-");
        const isDateNowBeforeEndDate = isBefore(
          new Date(
            dateNow.getFullYear(),
            dateNow.getMonth(),
            dateNow.getDate()
          ),
          new Date(splitEndDate[0], splitEndDate[1] - 1, splitEndDate[2])
        );

        if (isDateNowBeforeEndDate) status = "active";
        else status = "finished";
      }
    }

    return status;
  },
};
