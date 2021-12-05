
const url = "https://www.espncricinfo.com//series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");


request(url, function (err, response, html) {
    if (err) {
        console.log("Error", err);
    } else {
        extractMatchDetail(html);
    }
}) 

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
        
    } 
    // console.log(htmlStr); 

}