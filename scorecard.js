
// const url = "https://www.espncricinfo.com//series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");

function processScorecard(url){
    request(url, function (err, response, html) {
        if (err) {
            console.log("Error", err);
        } else {
            extractMatchDetail(html);
        }
    }) 
}



function extractMatchDetail(html){
    // venue date opponent result run
    // balls four sixes ssr 
    //ipl Folder -->
           //-------> team 
               // ---------> player file and details 

    // venue data -> .event .description 
    // result -> .event .status-text  
     let $ = cheerio.load(html);
     let descElem = $(".event .description");
     let resultElem = $(".event .status-text");
     
     let descArr = descElem.text().split(",");
     let venue = descArr[1] ;
     let date = descArr[2] ;
    let  result = resultElem.text();
    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
//    let htmlStr = "";
    for(let i=0;i<innings.length;i++){
        // htmlStr += $(innings[i]).html(); 
        // let headingArr = $(".header-title.label");
        //   let hname = headingArr.text();
        //   console.log(hname);  

        let teamName  = $(innings[i]).find("h5").text();  
        teamName = teamName.split("INNINGS")[0].trim(); 

        let opponentIndex = i == 0 ? 1 : 0 ;
        let opponentName = $(innings[opponentIndex]).find("h5").text(); 
        opponentName = opponentName.split("INNINGS")[0].trim(); 
        // console.log(` ${teamName} ${opponentName} ${result}`); 
        // player runs balls fours six 
        let currInning = $(innings[i]); 
        let allRows = currInning.find(".table.batsman tbody tr"); 

        for(let j=0;j<allRows.length;j++){
            let allCols  =  $(allRows[j]).find("td");
            let isValid = $(allCols[0]).hasClass("batsman-cell"); 
            if(isValid == true){
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();
                console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
            }
        }
    } 
    // console.log(htmlStr); 

} 

module.exports = {
    process : processScorecard
} 

