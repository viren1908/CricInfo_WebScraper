 // npm init -y
 // npm i request 
 // npm install cheerio 


 // request link -- get the results page

 const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
 const request = require("request");
 const cheerio = require("cheerio");
 const fs = require("fs");

 // html load karo main url se 
 // fir anker tag ka url dekho 

 request(url, function (err, response, html) {
     if (err) {
         console.log("Error", err);
     } else {
         extractHTML(html);
     }
 })

 function extractHTML(html) {
     let $ = cheerio.load(html);
     let elemArr = $(".widget-items.cta-link");
     let href = $(elemArr).find("a").attr("href");

     let linkOfResults = "https://www.espncricinfo.com/" + href;
     // console.log(linkOfResults);
     getResultPage(linkOfResults);

 }

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
    }
 }