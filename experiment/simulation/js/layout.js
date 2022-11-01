//Your JavaScript goes in here
import { deleteElement } from "./node.js";
"use strict";
import {
    connectNode,
    unbindEvent,
    refreshWorkingArea,
} from "./main.js";

export const wireColours = "#ff0000";
const menu = document.querySelector(".menu");
const menuOption = document.querySelector(".menu-option");

export const setPosition = ({ top, left }) => {
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    menu.style.display = "block";
};

window.addEventListener("click", e => {
    if (menu.style.display != "none")
    {
      menu.style.display = "none";
    }
    window.selectedComponent = null;
    window.componentType = null;
});

menuOption.addEventListener("click", e => {
    if (e.target.innerHTML === "Delete") {
      if (window.componentType === "node") {
        deleteElement(window.selectedComponent);
      }
    }
    window.selectedComponent = null;
    window.componentType = null;
});

function changeTabs(e) {
    const task = e.target.parentNode.id;
    if (window.currentTab === task) {
        return;
    }
    if (window.currentTab != null) {
        document.getElementById(window.currentTab).classList.remove("is-active");
    }
    window.currentTab = task;
    document.getElementById(task).classList.add("is-active");
    unbindEvent();
    connectNode();
    refreshWorkingArea();
    updateToolbar();
    updateInstructions();
    clearObservations();
    resize();
}


window.changeTabs = changeTabs;

const updateInstructions = () => {
    const task = window.currentTab;
    const instructionBox = document.getElementById("instruction-title");
    let title = ""; 
    if (task === "Domain1") {
      title = `<b>Burglary Alarm</b>

      <ul style="list-style: disc;">
         You have a new burglar alarm installed at home. It is fairly reliable at detecting a burglary, but also responds on occasion to minor earthquakes. (This example is due to Judea Pearl, a resident of Los Angeles—hence the acute interest in earthquakes.) You also have two neighbors, John and Mary, who have promised to call you at work when they hear the alarm. John nearly always calls when he hears the alarm, but sometimes confuses the telephone ringing with the alarm and calls then, too. Mary, on the other hand, likes rather loud music and often misses the alarm altogether. Given the evidence of who has or has not called, we would like to estimate the probability of a burglary.
      </ul>`;
    } else {
        title = `<b>Malfunctioning AC</b>

        <ul style="list-style: disc;">
        Imagine an AC which is used extensively in summer seasons. And a scenario where you switch on AC but it doesn’t work.
        There is a possibility that the AC is not working or maybe because the plug is not working.
        Now imagine a case where we have charger connected to same plug. 
        Now using observations from charger and AC we can derive many inferences about the probabilities.        
        </ul>`;
    }
    instructionBox.innerHTML = title;
}

function updateToolbar() {
    let elem = "";
    if (window.currentTab === "Domain1") {
      elem =
      '<div class="component-button burglary" onclick="addNode(event)">Burglary</div>        <div class="component-button earthquake" onclick="addNode(event)">Earthquake</div>        <div class="component-button alarm" onclick="addNode(event)">Alarm</div>        <div class="component-button johncalls" onclick="addNode(event)">Johncalls</div><div class="component-button marycalls" onclick="addNode(event)">Marycalls</div>        <div class="component-button india" onclick="addNode(event)">India</div>        <div class="component-button olympics" onclick="addNode(event)">Olympics</div>';
    } else{
      elem =
        '<div class="component-button electricityfailure" onclick="addNode(event)">electricityfailure</div>        <div class="component-button earthquake" onclick="addNode(event)">Earthquake</div>        <div class="component-button computerfailure" onclick="addNode(event)">computerfailure</div>        <div class="component-button lightfailure" onclick="addNode(event)">lightfailure</div><div class="component-button computermalfunction" onclick="addNode(event)">computermalfunction</div>        <div class="component-button india" onclick="addNode(event)">India</div>        <div class="component-button olympics" onclick="addNode(event)">Olympics</div>';
    } 
  
    document.getElementById("toolbar").innerHTML = elem;
}


function clearObservations() {
    document.getElementById("table-body").innerHTML = "";
    let head = "";
  
  
    document.getElementById("table-head").innerHTML = head;
    document.getElementById("result").innerHTML = "";
}

const circuitBoard = document.getElementById("circuit-board");
// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;
// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;
if (width < 1024) {
  circuitBoard.style.height = 600 + "px";
} else {
  circuitBoard.style.height = windowHeight - circuitBoardTop - 20 + "px";
}

function resize() {
    const circuitBoard = document.getElementById("circuit-board");
    const sidePanels = document.getElementsByClassName("v-datalist-container");
  
    if (width >= 1024) {
      for (let i = 0; i < sidePanels.length; i++) {
        sidePanels[i].style.height = circuitBoard.style.height;
      }
    }
}
  
resize();

