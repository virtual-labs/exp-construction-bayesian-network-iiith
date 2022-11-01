import { clearResult, nodes} from "./node.js";

"use strict";

function checkConstraints(adjlist, key, values, isCorrect, splFlag = 0){
    if(isCorrect == false)return isCorrect;
    key = key.toUpperCase();
    if(splFlag == 1){
        if((key in adjlist)){
            alert(`${key} is redundant variable shoudnt be there in the playground, please check hints and recheck your answers`);
            return false;
        }
        else return isCorrect;
    }

    if(!(key in adjlist)){
        console.log(key);
        console.log(adjlist);
        alert(`${key} is not connected, please check hints`);
        return false;
    }
    if(adjlist[key].parents.length == values.length){
        let temp = [];
        // console.log(adjlist[key].parents);
        for(let i of adjlist[key].parents){
            temp.push(i.name.toLowerCase());
        }
        for(let i of values){
            if(temp.includes(i)===false){
                alert(`In the current scenario, ${i} is not a parent of ${key}, please check hints and recheck your answer`);
                return false;
            }
        }
    }   
    else{
        alert(`Number of parents for ${key} doesnt match please check hints`);
        return false;
    } 
    return isCorrect;
}

export function domainValidator1() {
    let node_list = nodes;
    clearResult();
    let isCorrect = true;
    let adjlist = {};
    let newdic = {};
    for(let [key, value] of Object.entries(node_list)){
        adjlist[value.name] = value;
    }
    isCorrect = checkConstraints(adjlist, "alarm", ["earthquake", "burglary"], isCorrect);
    isCorrect = checkConstraints(adjlist, "earthquake", [], isCorrect);
    isCorrect = checkConstraints(adjlist, "burglary", [], isCorrect);
    isCorrect = checkConstraints(adjlist, "johncalls", ["alarm"], isCorrect);
    isCorrect = checkConstraints(adjlist, "marycalls", ["alarm"], isCorrect);
    isCorrect = checkConstraints(adjlist, "india", [], isCorrect, 1);
    isCorrect = checkConstraints(adjlist, "olympics", [], isCorrect, 1);
    
    const result = document.getElementById("result");

    if (isCorrect) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
        setTimeout(function () {result.innerHTML = "";}, 3000);
    } else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
        setTimeout(function () {result.innerHTML = "";}, 3000);
    }
}

export function domainValidator2() {
    let node_list = nodes;
    clearResult();
    let isCorrect = true;
    let adjlist = {};
    let newdic = {};
    for(let [key, value] of Object.entries(node_list)){
        adjlist[value.name] = value;
    }
    isCorrect = checkConstraints(adjlist, "electricityfailure", [], isCorrect);
    isCorrect = checkConstraints(adjlist, "computermalfunction", [], isCorrect);
    isCorrect = checkConstraints(adjlist, "lightfailure", ["electricityfailure"], isCorrect);
    isCorrect = checkConstraints(adjlist, "computerfailure", ["electricityfailure", "computermalfunction"], isCorrect);
    isCorrect = checkConstraints(adjlist, "earthquake", [], isCorrect, 1);
    isCorrect = checkConstraints(adjlist, "india", [], isCorrect, 1);
    isCorrect = checkConstraints(adjlist, "olympics", [], isCorrect, 1);

    const result = document.getElementById("result");

    if (isCorrect) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
        setTimeout(function () {result.innerHTML = "";}, 3000);
    } else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
        setTimeout(function () {result.innerHTML = "";}, 3000);
    }
}