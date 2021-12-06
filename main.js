 // npm init -y
 // npm i request 
 // npm install cheerio 


 // request link -- get the results page

 const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
 const request = require("request");
 const cheerio = require("cheerio");
 const allMatchObject = require("./allMatch");
 const fs = require("fs");
 const path = require("path");
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
    allMatchObject.getAllMatches(linkOfResults);

 }

 function createDir(filepath){
     if(fs.existsSync(filepath) == false){
         fs.mkdirSync(filepath);
     }
 }