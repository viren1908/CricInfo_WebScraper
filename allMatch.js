

const request = require("request");
const cheerio = require("cheerio"); 
const scorecardObj = require("./scorecard"); 


// going on to the results Page 1 - sending request

function getResultPage(link) {

    request(link, function (err, response, html) {
        if (err) {
            console.log("Error at Loading Results page", err);

        } else {
            openResults(html);
        }
    })

}

// Results page - Getting html 

function openResults(html) {
    let $ = cheerio.load(html);
    let scorecardElem =  $("a[data-hover='Scorecard']");
   for(let i=0;i<scorecardElem.length;i++){
      let scorecardLink = $(scorecardElem[i]).attr("href"); 
      let fullLink = "https://www.espncricinfo.com/" + scorecardLink;
      console.log(fullLink);
      scorecardObj.process(fullLink);
   }
} 

module.exports = {
    getAllMatches : getResultPage
}