const fs = require("fs");
const csv = require("csv-parser");
const Record = require("../models/Record");

module.exports = async function (job) {
  const filePath = job.data.filePath;
  let count = 0;
  let totalRows = 0;

  // First count total rows for progress %
  await new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", () => totalRows++)
      .on("end", resolve);
  });

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
        try {
          // Optional: Convert lat/lng to numbers if needed
          const data = {
            storeName: row.storeName,
            storeAddress: row.storeAddress,
            cityName: row.cityName,
            regionName: row.regionName,
            retailerName: row.retailerName,
            storeType: row.storeType,
            storeLongitude: parseFloat(row.storeLongitude),
            storeLatitude: parseFloat(row.storeLatitude),
            status: "success",
          };

          await Record.create(data);
        } catch (err) {
          await Record.create({
            ...row,
            status: "failed",
            errorReason: err.message,
          });
        }

        count++;
        const percent = Math.floor((count / totalRows) * 100);
        job.progress(percent);
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
