"use strict";
// This function gets a a public google sheet from its id
// and transforms it to a readable array of records
function getSheetData(sheetId, cb) {
  try {
    const sheetsUrl = `https://spreadsheets.google.com/feeds/cells/${sheetId}/1/public/values?alt=json-in-script`;

    return fetch(sheetsUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error fetching sheet");
        }

        return response.text();
      })
      .then(resultText => {
        const formattedText = resultText
          .replace("gdata.io.handleScriptLoaded(", "")
          .slice(0, -2);
        cb(null, processGoogleSheet(JSON.parse(formattedText)));
      });
  } catch (err) {
    cb(err, null);
    return {};
  }

  function processGoogleSheet(JSONResponse) {
    const data = JSONResponse.feed.entry;
    const startRow = 2;

    let processedResults = [{}];
    let colNames = {};

    for (let item of data) {
      const cell = item["gs$cell"];
      const val = cell["$t"];
      const columnNum = cell["col"];
      const thisRow = cell["row"];

      const colNameToAdd = colNames[columnNum];

      if (thisRow < startRow) {
        colNames[columnNum] = val.toLowerCase();
        continue;
      }

      if (typeof processedResults[thisRow] === "undefined") {
        processedResults[thisRow] = {};
      }

      if (typeof colNameToAdd !== "undefined" && colNameToAdd.length > 0) {
        processedResults[thisRow][colNameToAdd] = val;
      }
    }
    return processedResults.filter(result => Object.keys(result).length);
  }
}

export { getSheetData };
