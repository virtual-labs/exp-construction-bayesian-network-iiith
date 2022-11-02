import { clearResult, nodes} from "./node.js";

"use strict";

function errorMessageGeneral(msg){
    var alertmodal = document.getElementById("alertmodal1");
    alertmodal.innerText = "";
    alertmodal.style.display = "none";
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    alertmodal = document.getElementById("alertmodal2");
    alertmodal.innerText = msg;
    alertmodal.style.display = "block";
    console.log("Failed");
}

function checkConstraints(adjlist, key, values, isCorrect, splFlag = 0){
    if(isCorrect == false)return isCorrect;
    key = key.toUpperCase();
    if(splFlag == 1){
        if((key in adjlist)){
            errorMessageGeneral(`${key} is redundant variable shoudnt be there in the playground, please check hints and recheck your answers`);
            return false;
        }
        else return isCorrect;
    }

    if(!(key in adjlist)){
        console.log(key);
        console.log(adjlist);
        errorMessageGeneral(`${key} is not connected, please check hints`);
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
                errorMessageGeneral(`In the current scenario, ${i} is not a parent of ${key}, please check hints and recheck your answer`);
                return false;
            }
        }
    }   
    else{
        errorMessageGeneral(`Number of parents for ${key} doesnt match please check hints`);
        return false;
    } 
    return isCorrect;
}

function successMessageGeneral(){
    var alertmodal = document.getElementById("alertmodal2");
            alertmodal.innerText = "";
            alertmodal.style.display = "none";

            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            alertmodal = document.getElementById("alertmodal1");
            alertmodal.innerText = "The Bayesian Network is connected properly";
            alertmodal.style.display = "block";
            window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
            }
            console.log("Sucesss");
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
    let edges = {"alarm": ["earthquake", "burglary"], "earthquake": [], "burglary": [], "johncalls": ["alarm"], "marycalls": ["alarm"] };
    let spcedges = {"india": [], "olympics": []};
    for(let [key, value] of Object.entries(edges) ){
        isCorrect = checkConstraints(adjlist, key, value, isCorrect);
    } 
    for(let [key, value] of Object.entries(spcedges) ){
        isCorrect = checkConstraints(adjlist, key, value, isCorrect, 1);
    } 
    
    // isCorrect = checkConstraints(adjlist, "alarm", ["earthquake", "burglary"], isCorrect);
    // isCorrect = checkConstraints(adjlist, "earthquake", [], isCorrect);
    // isCorrect = checkConstraints(adjlist, "burglary", [], isCorrect);
    // isCorrect = checkConstraints(adjlist, "johncalls", ["alarm"], isCorrect);
    // isCorrect = checkConstraints(adjlist, "marycalls", ["alarm"], isCorrect);
    // isCorrect = checkConstraints(adjlist, "india", [], isCorrect, 1);
    // isCorrect = checkConstraints(adjlist, "olympics", [], isCorrect, 1);
    
    const result = document.getElementById("result");

    if (isCorrect) {
        successMessageGeneral();
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";

        for(let [key, value] of Object.entries(adjlist)){
            const ele = document.getElementById(value.id);
            ele.onclick = function(event) {addCPT(event);};
        }
        const elel  = document.getElementById("finalbutton");
        elel.innerText = "Check";
        elel.onclick = function(){checkCPT();};
        setTimeout(function () {result.innerHTML = "";}, 3000);
    } else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
        for(let [key, value] of Object.entries(adjlist)){
            const ele = document.getElementById(value.id);
            ele.onclick = function(event) {};
        }
        setTimeout(function () {result.innerHTML = "";}, 3000);
    }
}

function successMessageCPT(){
    var alertmodal = document.getElementById("alertmodal2");
            alertmodal.innerText = "";
            alertmodal.style.display = "none";

            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            alertmodal = document.getElementById("alertmodal1");
            alertmodal.innerText = "The CPT Table is filled correctly";
            alertmodal.style.display = "block";
            window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
            }
            console.log("Sucesss");
}

function errorMessageCPT(){
    var alertmodal = document.getElementById("alertmodal1");
    alertmodal.innerText = "";
    alertmodal.style.display = "none";
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    alertmodal = document.getElementById("alertmodal2");
    alertmodal.innerText = "The CPT Table is filled incorrectly";
    alertmodal.style.display = "block";
    console.log("Failed");
}

function checkCPT(){
    if(window.currentTab == "Domain1" ){
        const el2 = document.getElementById("op2");
        const vl2 = parseFloat(el2.innerText);
        console.log(vl2);
        if(vl2 == 0.71){
            successMessageCPT();
        }
        else{
            errorMessageCPT();
        }
    }
    else if(window.currentTab == "Domain2"){
        const el = document.getElementById("op3");
        const vl = parseFloat(el.innerText);
        // console.log(vl2);
        if(vl == 0.4){
            successMessageCPT();
        }
        else{
            errorMessageCPT();
        }
    }
    else if(window.currentTab == "Domain3"){
        const el = document.getElementById("op4");
        const vl = parseFloat(el.innerText);
        // console.log(vl2);
        if(vl == 0.9){
            successMessageCPT();
        }
        else{
            errorMessageCPT();
        }
    }
    else if(window.currentTab == "Domain4"){
        const el = document.getElementById("op5");
        const vl = parseFloat(el.innerText);
        // console.log(vl2);
        if(vl == 0.95){
            successMessageCPT();
        }
        else{
            errorMessageCPT();
        }
    }
    else if(window.currentTab == "Domain5"){
        const el = document.getElementById("op6");
        const ell = document.getElementById("op7");
        const vl = parseFloat(el.innerText);
        const vll = parseFloat(ell.innerText);
        console.log(vl);
        console.log(vll);
        if(vl == 0.1 && vll== 0.5){
            successMessageCPT();
        }
        else{
            errorMessageCPT();
        }
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