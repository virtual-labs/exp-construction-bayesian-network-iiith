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
        this.parents.push(node);
    }
    addInputPoints(input) {
        this.inputPoints.push(input);
    }
    removeNode(node){
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
        let component = `<div class= "drag-drop node ${this.name.toLowerCase()}" id= ${this.id}>${this.name.toUpperCase()} 
        </div>`;
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


function addNode(event) {
    const name = event.target.innerHTML.toUpperCase();
    const node = new Node(name);
    const component = node.generateComponent();
    const wa = document.getElementById("working-area");
    wa.insertAdjacentHTML("beforeend", component);
    node.registerComponent("working-area");
    event.target.outerHTML = "";
}

window.addNode = addNode;

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
    domainValidator2();
}
window.submitCircuit = submitCircuit;

export function deleteElement(nodeid) {
    let node = nodes[nodeid];
    jsPlumbInstance.removeAllEndpoints(document.getElementById(node.id));
    jsPlumbInstance._removeElement(document.getElementById(node.id));
    let el = `<div class= "component-button ${node.name.toLowerCase()}" onclick="addNode(event)">${node.name.toUpperCase()}</div>`;
    const toolb = document.getElementById("toolbar");
    toolb.insertAdjacentHTML("beforeend", el);
    for (let elem in nodes) {
        if (nodes[elem].parents.includes(node)) {
            nodes[elem].removeInput(node);
        }
    }
    delete nodes[nodeid];
}