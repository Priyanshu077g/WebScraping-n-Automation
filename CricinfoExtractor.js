let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
let excel4node = require("excel4node");
let pdf = require("pdf-lib");

let args = minimist(process.argv);


let responseKaPromise = axios.get(args.source);
responseKaPromise.then(function(response){
    let html = response.data;
    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;
    // console.log(document.querySelector('title').textContent); // title nikalne ke liye
    let matchScoreDivs = document.querySelectorAll("div.ds-px-4.ds-py-3")
    // console.log(matchScoreDivs.length); 
    let matches = []; 
    for(let i = 0; i < matchScoreDivs.length; i++){
        let match = {
            t1 : '',
            t2 : '',
            t1_Score : '',
            t2_Score : '',
            result : '',
        };
        let nameps = matchScoreDivs[i].querySelectorAll("p.ds-text-tight-m.ds-font-bold.ds-capitalize");
        // console.log(nameps[0].textContent);
        // console.log(nameps[1].textContent);
        match.t1 = nameps[0].textContent;
        match.t2 = nameps[1].textContent;

        let scoreStrong = matchScoreDivs[i].querySelectorAll("strong");
        // console.log(scoreStrong[0].textContent);
        // console.log(scoreStrong[1].textContent);
        match.t1_Score = scoreStrong[0].textContent;
        match.t2_Score = scoreStrong[1].textContent;

        let resultSpan = matchScoreDivs[i].querySelectorAll("p.ds-text-tight-s.ds-font-regular.ds-truncate.ds-text-typo-title > span");
        // console.log(resultSpan[0].textContent);
        match.result = resultSpan[0].textContent;

        matches.push(match);
    }
    console.log(matches);

}).catch(function(err){
    console.log(err);
})
