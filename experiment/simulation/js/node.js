import { registerNode, jsPlumbInstance } from "./main.js";
import { setPosition } from "./layout.js";
import { domainValidator1, domainValidator2 } from "./validator.js";

'use strict';

export let nodes = {};
window.numNodes = 0;

export function clearNodes(){
    for( let id in nodes){
        delete nodes[id];
    }
    nodes = {};

}

export class Node {
    constructor(name){
        this.name = name;
        this.id = this.name + "-" + window.numNodes++;
        this.xcordinate = 0;
        this.ycordinate = 0;
        this.isConnected = false; 
        this.parents = [];
        this.inputPoints = [];
    }
    setId(id){
        this.id = id;
    }
    addParent(node){
        clearCPT();
        this.parents.push(node);
    }
    addInputPoints(input) {
        clearCPT();
        this.inputPoints.push(input);
    }
    removeNode(node){
        clearCPT();
        let index = this.parents.indexOf(node);
        if (index > -1){
            this.parents.splice(index, 1);
        }
    }
    updatePosition(id) {
        this.ycordinate =
            window.scrollY + document.getElementById(id).getBoundingClientRect().top; // Y

        this.xcordinate =
            window.scrollX + document.getElementById(id).getBoundingClientRect().left; // X
    }
    generateComponent(){
        let component = `<div class= "drag-drop node ${this.name.toLowerCase()}" id= ${this.id}>${this.name.toUpperCase()}</div>`;
        return component;
    }

    registerComponent(workingArea, x = 0, y = 0) {

        const width = document.getElementById(workingArea).offsetWidth;
        const height = document.getElementById(workingArea).offsetHeight;
        let scale = 900;
        let yScale = 800;
        x = (x / scale) * width;
        y = (y / yScale) * height;

        const el = document.getElementById(this.id);
        el.style.left = x + "px";
        el.style.top = y + "px";

        el.addEventListener(
            "contextmenu",
            function (ev) {
                ev.preventDefault();
                const origin = {
                    left: ev.pageX - document.getScroll()[0],
                    top: ev.pageY - document.getScroll()[1],
                };
                setPosition(origin);
                window.selectedComponent = this.id;
                window.componentType = "node";
                return false;
            },
            false
        );
        
        nodes[this.id] = this;
        registerNode(this.id, this);

        this.updatePosition(this.id);
    }
    setConnected(val) {
        this.isConnected = val;
    }
}

function clearCPT(){
    const cpttable = document.getElementById("cpt");
    cpttable.innerText = "";
    let node_list = nodes;
    let adjlist = {};
    for(let [key, value] of Object.entries(node_list)){
        adjlist[value.name] = value;
    }
    for(let [key, value] of Object.entries(adjlist)){
        const ele = document.getElementById(value.id);
        ele.onclick = function(event) {};
        const elel  = document.getElementById("finalbutton");
        elel.innerText = "Check (use after submitting sucessfully)";
        elel.onclick = function(){}; 
    }   
}

function addNode(event) {
    clearCPT();    
    const name = event.target.innerHTML.toUpperCase();
    const node = new Node(name);
    const component = node.generateComponent();
    const wa = document.getElementById("working-area");
    wa.insertAdjacentHTML("beforeend", component);
    node.registerComponent("working-area");
    event.target.outerHTML = "";
}

window.addNode = addNode;

function addCPT(event) {
    const name = event.target.innerHTML.toUpperCase();
    const cpttable = document.getElementById("cpt");
    if(name == "BURGLARY"){
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Burglary</th>
                    <th colspan="1">No Burglary</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>0.001</td>
                    <td>0.999</td>
                </tr>
            </tbody>
        </table>`  
    }
    else if (name == "ALARM"){
    cpttable.innerHTML = `<b>CPT Table</b>
    <table class="table is-bordered is-fullwidth">
        <thead id="table-head">
            <tr>
                <th colspan="1">Burglary</th>
                <th colspan="1">Earthquake</th>
                <th colspan="1">Alarm</th>
                <th colspan="1">No Alarm</th>
                
            </tr>
        </thead>
        <tbody id="table-body">
                <tr>
                <td>T</td>
                <td>T</td>
                <td>0.95</td>
                <td>0.05</td>
                </tr>
                <tr>
                <td>T</td>
                <td>F</td>
                <td>0.94</td>
                <td>0.06</td>
                </tr>
                <tr>
                <td>F</td>
                <td>T</td>
                <td>0.29</td>
                <td id="op2" contenteditable='true'>?</td>
                </tr>
                <tr>
                <td>F</td>
                <td>F</td>
                <td>0.001</td>
                <td>0.999</td>
                </tr>
        </tbody>
    </table>`
    }
    else if(name == "EARTHQUAKE"){
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">EARTHQUAKE</th>
                    <th colspan="1">No EARTHQUAKE</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>0.002</td>
                    <td>0.998</td>
                </tr>
            </tbody>
        </table>`   
    }
    else if(name == "MARYCALLS"){
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">ALARM</th>
                    <th colspan="1">MARYCALLS</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>True</td>
                    <td>0.7</td>
                </tr>
                <tr>
                <td>False</td>
                <td>0.3</td>
            </tr>
            
            </tbody>
        </table>`
    }
    else if(name == "JOHNCALLS"){
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">ALARM</th>
                    <th colspan="1">JOHNCALLS</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>True</td>
                    <td>0.9</td>
                </tr>
                <tr>
                <td>False</td>
                <td>0.1</td>
            </tr>
            
            </tbody>
        </table>`
    }
    else if (name == "ELECTRICITYFAILURE")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Electricity Failure</th>
                    <th colspan="1">No Electricity Failure</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>0.02</td>
                    <td>0.98</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "COMPUTERMALFUNCTION")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Computer Malfunction</th>
                    <th colspan="1">No Computer Malfunction</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>0.1</td>
                    <td>0.9</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "LIGHTFAILURE")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Electricity Failure</th>
                    <th colspan="1">Light Failure</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>True</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>0.2</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "COMPUTERFAILURE")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Electricity Failure</th>
                    <th colspan="1">Computer Malfunction</th>
                    <th colspan="1">Computer Failure</th>
                    <th colspan="1">No Computer Failure</th>    
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>True</td>
                    <td>True</td>
                    <td>1</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>True</td>
                    <td>False</td>
                    <td>1</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>True</td>
                    <td>0.8</td>
                    <td>0.2</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>False</td>
                    <td>0.6</td>
                    <td id = "op3" contenteditable='true'>?</td>
                </tr>
                
                
            </tbody>
        </table>` 
    }
    else if (name == "EXAMDIFFICULTY")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Exam Easy</th>
                    <th colspan="1">Exam Difficult</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>0.6</td>
                    <td>0.4</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "IQ")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">High IQ</th>
                    <th colspan="1">Low IQ</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>0.1</td>
                    <td id = "op4" contenteditable='true'>?</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "SCORE")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Exam</th>
                    <th colspan="1">IQ</th>
                    <th colspan="1">High Score</th>
                    <th colspan="1">Low Score</th>    
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>Difficult</td>
                    <td>High</td>
                    <td>0.8</td>
                    <td>0.2</td>
                </tr>
                <tr>
                    <td>Easy</td>
                    <td>Low</td>
                    <td>0.6</td>
                    <td>0.4</td>
                </tr>
                <tr>
                    <td>Easy</td>
                    <td>High</td>
                    <td>0.95</td>
                    <td>0.05</td>
                </tr>
                <tr>
                    <td>Difficult</td>
                    <td>Low</td>
                    <td>0.1</td>
                    <td>0.9</td>
                </tr>
                
                
            </tbody>
        </table>` 
    }
    else if (name == "APTITUDESCORE")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">IQ</th>
                    <th colspan="1">High Aptitude score</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>Low</td>
                    <td>0.2</td>
                </tr>
                <tr>
                    <td>High</td>
                    <td>0.9</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "WINDY")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Windy</th>
                    <th colspan="1">Not Windy</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>0.1</td>
                    <td>0.9</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "CLOUDY")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Cloudy</th>
                    <th colspan="1">Not Cloudy</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>0.05</td>
                    <td id = "op5" contenteditable='true'>?</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "RAIN")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Windy</th>
                    <th colspan="1">Cloudy</th>
                    <th colspan="1">Rain</th>
                    <th colspan="1">No Rain</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>True</td>
                    <td>True</td>
                    <td>0.8</td>
                    <td>0.2</td>
                </tr>
                <tr>
                    <td>True</td>
                    <td>False</td>
                    <td>0.6</td>
                    <td>0.4</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>True</td>
                    <td>0.75</td>
                    <td>0.25</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>False</td>
                    <td>0.1</td>
                    <td>0.9</td>
                </tr>
                
            </tbody>
        </table>` 
    }
    else if (name == "MATCH")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Rain</th>
                    <th colspan="1">Match</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>Yes</td>
                    <td>0.3</td>
                </tr>
                <tr>
                    <td>No</td>
                    <td>0.9</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "HARSHTACKLE")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Harsh Tackle</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>0.2</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "YELLOWCARD")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Yellow Card</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>0.34</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "REDCARD")
    {
        cpttable.innerHTML = `<b>CPT Table</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Harsh Tackle</th>
                    <th colspan="1">Yellow Card</th>
                    <th colspan="1">Red Card</th>
                    <th colspan="1">No Red Card</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>True</td>
                    <td>True</td>
                    <td>0.9</td>
                    <td id = "op6" contenteditable='true'>?</td>
                </tr>
                <tr>
                    <td>True</td>
                    <td>False</td>
                    <td>0.7</td>
                    <td>0.3</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>True</td>
                    <td id="op7" contenteditable='true'>?</td>
                    <td>0.5</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>False</td>
                    <td>0.1</td>
                    <td>0.9</td>
                </tr>
                
            </tbody>
        </table>` 
    }
}

window.addCPT = addCPT;



export function clearResult() {
    const result = document.getElementById("result");
    result.innerHTML = "";
}

export function printErrors(message,objectId) {
    const result = document.getElementById('result');
    result.innerHTML += message;
    result.className = "failure-message";
    if(objectId !== null)
    {
        objectId.classList.add("highlight")
        setTimeout(function () {objectId.classList.remove("highlight")}, 5000);
    }
}

export function submitCircuit() {

    clearResult();
    if(window.currentTab == "Domain1")
    domainValidator1();
    else
    domainValidator1();
}
window.submitCircuit = submitCircuit;

export function deleteElement(nodeid) {
    let node = nodes[nodeid];
    jsPlumbInstance.removeAllEndpoints(document.getElementById(node.id));
    jsPlumbInstance._removeElement(document.getElementById(node.id));
    let el = `<div class= "component-button ${node.name.toLowerCase()}" onclick="addNode(event)">${node.name.toUpperCase()}</div>`;
    clearCPT();
    const toolb = document.getElementById("toolbar");
    toolb.insertAdjacentHTML("beforeend", el);
    for (let elem in nodes) {
        if (nodes[elem].parents.includes(node)) {
            nodes[elem].removeNode(node);
        }
    }
    delete nodes[nodeid];
}