const darkMode = document.querySelector(".dark-mode");
const negative = document.querySelector(".negative");
const keys = document.querySelectorAll(".key");
const clearKey = document.querySelector(".clear");
const deleteKey = document.querySelector(".delete");
const equalKey = document.querySelector("#equal-key");
const timesKey = document.querySelector(".times");
const addKey = document.querySelector(".add");

const display = document.querySelector("#display-box");
let displayArray = [];
let textToDisplay;
let array = [];
let operKeyNum = 0;
let dyArray = [];
let beforeResult;

let deleteOrClear = false;//for deleteLast and clearAll
let classicBefore = false;//avoid ++ or -- or ** or //
//let hasDot = false;//avoid dot number > 1
let nothingEnter = true;//avoid +*/ become the first one
let dotCrossOper = true;
let hasDot = false;

function deleteLast() {
    if (displayArray.length <= 1) {
        clearAll();
    } else {
        deleteOrClear = true;
        let lastEle = displayArray[displayArray.length - 1];
        let lastEleCode = lastEle.charCodeAt(0);

        console.log(displayArray);
        console.log("code", lastEleCode);
        console.log("lastEle", lastEle);
        console.log(displayArray[0]);
        /***********************************/
        if (displayArray[0] === "0" && (lastEleCode === 43 || lastEleCode === 215 || lastEleCode === 247)) {
            operKeyNum = 0;
            hasDot = false;
            deleteOrClear = false;
            dotCrossOper = true;
            nothingEnter = false;
            classicBefore = false;
            displayArray = ["0"];
            display.innerHTML = `<span class="display-text">${Number(displayArray)}</span>`;             
            return;
        }
        /*************************************/
        if (lastEleCode === 46) {
            dotCrossOper = true;
        } else if (lastEleCode === 43 || lastEleCode === 8722 || lastEleCode === 247 || lastEleCode === 215) {
            dotCrossOper = false;
            classicBefore = false;
            operKeyNum--;
        }
        console.log("classicBefore:", classicBefore);
        displayArray = displayArray.slice(0, displayArray.length - 1);
        //   
        displayText();
        //
        let copyArray = JSON.parse(JSON.stringify(displayArray));
        let arrayReverse = copyArray.reverse();
        let dotIn = arrayReverse.indexOf(".");
        let addIn = arrayReverse.indexOf("+");
        let divideIn = arrayReverse.indexOf("÷");
        let timesIn = arrayReverse.indexOf("×");
        let minusIn = arrayReverse.indexOf("-");
        if (dotIn != -1 && (addIn != -1 || divideIn != -1 || timesIn != -1 || minusIn != -1)) {
            if (addIn < dotIn || divideIn < dotIn || timesIn < dotIn || minusIn < dotIn) {
                dotCrossOper = true;
            } else {
                dotCrossOper = false;
            }
        }
        if (displayArray.indexOf(".") != -1) {
            hasDot === true;
        } else {
            hasDot === false;
            dotCrossOper = true;
        } 
        lastEle = displayArray[displayArray.length - 1];
        lastEleCode = lastEle.charCodeAt(0);

        if (lastEleCode === 43 || lastEleCode === 8722 || lastEleCode === 247 || lastEleCode === 215) {
            classicBefore = true;
        } else {
            classicBefore = false;
        }
        console.log(displayArray);
        nothingEnter = false;
        deleteOrClear = false;
    }   

}

function clearAll() {
    operKeyNum = 0;
    hasDot = false;
    dotCrossOper = true;
    deleteOrClear = true;
    displayArray = [];
    displayText();
    //boolean condition
    deleteOrClear = false;
    // hasDot = false;
    classicBefore = false;
    nothingEnter = true;
}

function displayText(e, f) {
    if (displayArray.length === 1 && displayArray[0] == 0 && e != ("+" || "÷" || "×")) {
        displayArray.shift();
        nothingEnter = true;
    } else if (displayArray[displayArray.length - 1] == 0 && displayArray[displayArray.length - 2] == ("+" || "-" || "÷" || "×")) {
        if (f == "times" || f == "add" || f == "minus" || f == "divide") {            
            console.log("DESIGN & CODE BY DAVE");
        } else {
            displayArray.pop();
        }        
    }
    if (deleteOrClear === false) {
        displayArray.push(e);        
    } 
    if (displayArray[0] == "+" || displayArray[0] == "÷" || displayArray[0] == "×") {
        displayArray.unshift("0");
    }  
    if (displayArray.length > 11) {
        textToDisplay = displayArray.slice(displayArray.length - 11, displayArray.length).join("");
    } else {
        textToDisplay = displayArray.join("");
    }
    // console.log(displayArray);
    // console.log(textToDisplay);
    display.innerHTML = `<span class="display-text">${textToDisplay}</span>`;
    // console.log(displayArray);
    // console.log(operKeyNum);
    beforeResult = combineArray(displayArray);
    console.log(displayArray);
    return beforeResult;

}

function displayKey(eTarget) {
    const keyClass = eTarget.classList;
    const lastEleInArray = displayArray[displayArray.length - 1];
    let text;    
    let mark;
    if (keyClass.contains("classic")) {
        operKeyNum++;
    }
    if (!keyClass.contains("key")) {
        if (keyClass.contains("dot") && dotCrossOper === false) {return;}
        if (keyClass.contains("add") && nothingEnter === true) {return;}
        if (keyClass.contains("times") && nothingEnter === true) {return;}
        if (keyClass.contains("divide") && nothingEnter === true) {return;}
        if (keyClass.contains("classic") && classicBefore === true) {return;}
        if (keyClass.contains("classic") && lastEleInArray === ".") {return;}
        if (keyClass.contains("key0") && lastEleInArray == 0 && displayArray.length === 1) {return;}
        text = eTarget.parentNode.dataset.key;
        mark = eTarget.parentNode.dataset.mark;
        displayText(text, mark);
    } else {
        if (keyClass.contains("dot") && dotCrossOper === false) {return;}
        if (keyClass.contains("add") && nothingEnter === true) {return;}
        if (keyClass.contains("times") && nothingEnter === true) {return;}
        if (keyClass.contains("divide") && nothingEnter === true) {return;}
        if (keyClass.contains("classic") && classicBefore === true) {return;}
        if (keyClass.contains("classic") && lastEleInArray === ".") {return;}
        if (keyClass.contains("key0") && lastEleInArray == 0 && displayArray.length === 1) {return;}
        text = eTarget.dataset.key;
        mark = eTarget.dataset.mark;
        displayText(text, mark);
    }
    if (keyClass.contains("dot")) {
        dotCrossOper = false;
        
    }//avoid dot number > 2
    if (keyClass.contains("classic")) {
        classicBefore = true;
        dotCrossOper = true;
    } else {
        classicBefore = false;
    }
    if (keyClass.contains("key0") && displayArray.length == 0) {
        nothingEnter = true;
    } else {
        nothingEnter = false;
    }
    
}

/********keyboard support*********/
window.addEventListener("keydown", connectKey);
window.addEventListener("keyup", disconnectKey);

function disconnectKey(e) {
    console.log(e.code);
    let keyMatch = document.querySelector(`[data-match="${e.code}"]`);
    if (!e.ctrlKey && e.code === "Backspace") {
        deleteKey.children[0].classList.remove("press"); 
    }
    if (e.ctrlKey && e.code === "Backspace") {
        clearKey.children[0].classList.remove("press"); 
    }
    if (e.code === "Enter") {
        equalKey.children[0].classList.remove("press"); 
    } else if (e.shiftKey && e.code === "Digit8") {
        timesKey.children[0].classList.remove("press"); 
    } else if (e.shiftKey && e.code === "Equal") {
        addKey.children[0].classList.remove("press"); 
    } else {
        //key0 to key9
        keyMatch.children[0].classList.remove("press");        
    }   
}

function connectKey(e) {
    console.log(e);
    console.log(e.code);
    let keyMatch = document.querySelector(`[data-match="${e.code}"]`);

    if (!e.ctrlKey && e.code === "Backspace") {
        deleteKey.children[0].classList.add("press"); 
        deleteLast();
    }
    if (e.ctrlKey && e.code === "Backspace") {
        clearKey.children[0].classList.add("press"); 
        clearAll();
    }
    if (e.code === "Enter") {
        equalKey.children[0].classList.add("press"); 
        equalStart();
    } else if (e.shiftKey && e.code === "Digit8") {
        timesKey.children[0].classList.add("press"); 
        displayKey(timesKey);
    } else if (e.shiftKey && e.code === "Equal") {
        addKey.children[0].classList.add("press"); 
        displayKey(addKey);
    } else {
        //key0 to key9
        keyMatch.children[0].classList.add("press");        
        displayKey(keyMatch);
    }
    //if (e.code === ``)
}
/********keyboard support*********/

keys.forEach(key => {
    key.addEventListener("click", (e) => {
        console.log(e);
        console.log(e.target.classList);
        if (!e.target.classList.contains("oper")) {
            displayKey(e.target);
        }        
        //console.log(e.target);
    });
})




//key-press-effect(start)
function keyPressEnter(e) {
    if (e.target.classList.contains("inner")) {
        e.target.classList.add("press")
        //console.log(e.target.classList);
    } else {
        e.target.children[0].classList.add("press");
    } 
}
function keyPressLeave(e) {
    if (e.target.classList.contains("inner")) {
        e.target.classList.remove("press");     
    } else {
        e.target.children[0].classList.remove("press");
    }
}
keys.forEach(key => key.addEventListener("mousedown", keyPressEnter);
keys.forEach(key => key.addEventListener("mouseup", keyPressLeave);
keys.forEach(key => key.addEventListener("touchstart", keyPressEnter);
keys.forEach(key => key.addEventListener("touchend", keyPressLeave);
//key-press-effect(end)

let startPressTime;
let releasePressTime;
darkMode.addEventListener("mousedown", () => {
    startPressTime = Date.now();
    //console.log(startPressTime);//long-press detect
})
darkMode.addEventListener("mouseup", () => {
    releasePressTime = Date.now();
    let pressDuration = releasePressTime - startPressTime;
    if (pressDuration > 500) {
        negative.classList.remove("hide");
        darkMode.classList.add("hide");//dark-mode to negative key transform
    } else {
        document.body.classList.toggle("dark-mode")//dark-mode toggle
    }
})
negative.addEventListener("mousedown", () => {
    startPressTime = Date.now();
    //console.log(startPressTime);
})
negative.addEventListener("mouseup", () => {
    releasePressTime = Date.now();
    let pressDuration = releasePressTime - startPressTime;
    if (pressDuration > 500) {
        negative.classList.add("hide");
        darkMode.classList.remove("hide");
    } else {
        //negative function
        if ((displayArray.indexOf("+") !== -1) || (displayArray.indexOf("−") !== -1) || (displayArray.indexOf("÷") !== -1) || (displayArray.indexOf("×") !== -1)) {
            return;//only when no classic operator inside the displayArray would work
        } else {
            if (displayArray[0] !== "−") {
                deleteOrClear = true;
                displayArray.unshift("−");
                displayText();
                deleteOrClear = false;
            }
        }           
    }
})
//negative-mode-exchange(end)

array = displayArray;

function combineArray(arr) {
    let preAdd = findAllElePosition(arr, "+");
    let preMinus = findAllElePosition(arr, "−");
    let preTimes = findAllElePosition(arr, "×");
    let preDivide = findAllElePosition(arr, "÷");
    
    let operPre = preAdd.concat(preDivide, preMinus, preTimes);
    let operPreFixed = operPre.sort((a, b) => a > b ? 1 : -1);
    // console.log("operPreFixed", operPreFixed);

    let numPreFixed = findNumPosition(arr, operPreFixed);
    // console.log(numPreFixed);

    let numPreRange = findNumRange(operPreFixed, arr);
    // console.log(numPreRange);


    let numPreSplit = [];
    for (let i = 0; i < numPreRange.length; i++) {
        numPreSplit.push([]);
    }
    numPreFixed.forEach(num => {
        for (let i = 0; i < numPreRange.length; i++) {
            if (num > numPreRange[i][0] && num < numPreRange[i][1]) {
                numPreSplit[i].push(num);
            }
        }
        return numPreSplit;
    })
    
    if (operPreFixed[0] != 0) {
        let shiftArray = [];
        for (let i = 0; i < operPreFixed[0]; i++) {
            shiftArray.push(i);
        }
        numPreSplit.unshift(shiftArray);
    }
    // console.log(numPreSplit);

    let numCatchArray = [];
    for (let i = 0; i < numPreSplit.length; i++) {
        numCatchArray.push([]);
    }
    let round = 0;
    numPreSplit.forEach(num => {
        for (let i = 0; i < num.length; i++) {
            let index = num[i];
            let ele = arr[index];
            numCatchArray[round].push(ele);//error
        }
        round++;
        return numCatchArray;
    })
    
    numCatchArray.forEach(numArray => {
        if (numArray[0] === ".") {
            numArray.unshift("0");
        }
        
    })
    // console.log(numCatchArray);

    let numString = numCatchArray.map(ele => ele.join(""));
    // console.log(numString);

    if (operPreFixed.length < numString.length) {
        let r = 1;
        for (let i = 0; i < operPreFixed.length; i++) {            
            numString.splice(r, 0, arr[operPreFixed[i]])
            r += 2;
        }
    } else if (operPreFixed.length === numString.length) {
        let r = 0;
        for (let i = 0; i < operPreFixed.length; i++) {            
            numString.splice(r, 0, arr[operPreFixed[i]])
            r += 2;
        }
    }
    // console.log(numString);
    return numString;

}

//let divideZero = false;
function equalStart() {
    console.log(beforeResult);
    console.log(displayArray);
    if (displayArray.length === 0) {return;}
    if ((displayArray[0] === "." || displayArray[0] === "−") && displayArray.length === 1) {
        return;
    }
    //if (displayArray[0] === "." && displayArray.length === 1)
    //displayArray === ["-"]

    let indexOfDivide = findAllElePosition(beforeResult, "÷");
    let indexOfAdd = findAllElePosition(beforeResult, "+");
    let indexOfMinus = findAllElePosition(beforeResult, "−");
    let indexOfTimes = findAllElePosition(beforeResult, "×");
    let operConcat = indexOfDivide.concat(indexOfMinus, indexOfAdd, indexOfTimes);
    if (operConcat.length === 0) {
        display.innerHTML = `<span class="display-text">${Number(displayArray.join(""))}</span>`;
        return;
    }

    let essentialZero = indexOfDivide.map(e => e + 1).map(e => beforeResult[e]);
    if (essentialZero.includes("0")) {
        display.innerHTML = `<span class="display-text">ERROR!!!</span>`;
        return;
    }
    // console.log(indexOfDivide);
    // console.log(essentialZero);
    // console.log(beforeResult);
    console.log(equal(beforeResult));
    let finalNum = Number(equal(beforeResult));
    let finalResult;
    if (!Number.isInteger(finalNum)) {
        let finalNumArrRe = [...`${finalNum}`].reverse();
        if (finalNumArrRe.indexOf(".") > 5) {
            finalResult = finalNum.toFixed(5);
        } else {
            finalResult = finalNum;
        }        
        dotCrossOper = false;
    } else {
        finalResult = finalNum;
        dotCrossOper = true;
    }
    let newStartNum = [...`${finalResult}`];
    if (newStartNum.length > 11) {
        finalResult = finalResult.toExponential(4);
    }    
    newStartNum = [...`${finalResult}`];
    display.innerHTML = `<span class="display-text">${finalResult}</span>`;
    
    displayArray = newStartNum;
}

//core.js //

function findAllElePosition(array, ele) {
    let positionCount = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === ele) {
        positionCount.push(i)
        };
    }
    return positionCount;
    }

function findNumPosition(array, fixed) {
    let numPositionArray = [];
    for (let i = 0; i < array.length; i++) {//改了-1
        if (!fixed.includes(i)) {
            numPositionArray.push(i);
        }
    }
    return numPositionArray;
}

function findNumRange(fixed, array) {
    let numPosition = [];
    let eachPart;
    for (let i = 1; i < fixed.length; i++) {
    eachPart = fixed.slice(i - 1, i + 1);
    numPosition.push(eachPart);
    }
    let lastConcat = [fixed[fixed.length - 1], array.length];//last element define
    numPosition.push(lastConcat);
    return numPosition;
}

function equal(array) {    
    
    let positionAdd = findAllElePosition(array, "+");
    let positionMinus = findAllElePosition(array, "−");
    let positionTimes = findAllElePosition(array, "×");
    let positionDivide = findAllElePosition(array, "÷");
    
    let operPosition = positionAdd.concat(positionDivide, positionMinus, positionTimes);
    let operPositionFixed = operPosition.sort((a, b) => a > b ? 1 : -1);

  //get numPositionFixed (start)
    let numPositionFixed = findNumPosition(array, operPositionFixed);
  //get numPositionFixed (end)
    
  //get numInEachRange (start)
    let numPositionRange = findNumRange(operPositionFixed, array);
    let numInEachRange = numPositionRange.map(num => num[1] - num[0] - 1);
  //get numInEachRange (end)
    
  //get numPositionSplit (start)
    let numPositionSplit = [];
    for (let i = 0; i < numPositionRange.length; i++) {
        numPositionSplit.push([]);
    }
    numPositionFixed.forEach(num => {
        for (let i = 0; i < numPositionRange.length; i++) {
            if (num > numPositionRange[i][0] && num < numPositionRange[i][1]) {
                numPositionSplit[i].push(num);
            }
        }
        return numPositionSplit;
    })
  //get numPositionSplit (end)
    
  //get numCatchArray (start)
    let numCatchArray = [];
    for (let i = 0; i < numPositionSplit.length; i++) {
        numCatchArray.push([]);
    }
    let round = 0;
    numPositionSplit.forEach(num => {
        for (let i = 0; i < num.length; i++) {
            let index = num[i];
            let ele = array[index];
            numCatchArray[round].push(ele);//error
        }
        round++;
        return numCatchArray;
    })
  //get numCatchArray (end)
    
  //convert numArray to numString
    let numString = numCatchArray.map(ele => ele.join(""));
  //if first ele in array is "-", then the first ele in numString would times "-1"
  //and delete the first ele in operPositionFixed
    if (array[0] === "−") {
        numString[0] = "-" + numString[0];
        operPositionFixed.shift();
    }
    
  //list all the oper in order
    let operList = operPositionFixed.map(index => array[index]);
  //insert all the oper into numString
    let k = 1;
    for (let i = 0; i < operList.length; i++) {    
        numString.splice(k, 0, operList[i]);
        k += 2;
    }
    if (array[0] !== "−") {
        numString = array;
    }
    /*******EXECUTE "×" & "÷" FIRST (START)*********/
    let positionTimesNew = findAllElePosition(numString, "×");
    let positionDivideNew = findAllElePosition(numString, "÷");
    //list times and divide's position in order
    let timesDividePosition = positionTimesNew.concat(positionDivideNew);
    let timesDividePositionFixed = timesDividePosition.sort((a, b) => a > b ? 1 : -1)
    
    let beforeEleIndex;
    let afterEleIndex;
    let t = 0;
    for (i = 0; i < timesDividePositionFixed.length; i++) {
        beforeEleIndex = timesDividePositionFixed[i] - 1 - t;
        afterEleIndex = timesDividePositionFixed[i] + 1 - t;
        let beforeEle = JSON.parse(numString[beforeEleIndex]);
        let afterEle = JSON.parse(numString[afterEleIndex]);
    
        if (numString[timesDividePositionFixed[i] - t] === "×") {
          let operCurrentRe = beforeEle * afterEle;
            numString.splice(beforeEleIndex, 3, operCurrentRe);
        } else if (numString[timesDividePositionFixed[i] - t] === "÷") {
            let operCurrentRe = beforeEle / afterEle;
            numString.splice(beforeEleIndex, 3, operCurrentRe);
        }
        t += 2;
    }
    /*******EXECUTE "×" & "÷" FIRST (END)*********/
    
    /*******EXECUTE "+" & "-" SECOND (START)*********/
    let positionAddNew = findAllElePosition(numString, "+");
    let positionMinusNew = findAllElePosition(numString, "−");
    //list Add and Minus's position in order
    let addMinusPosition = positionAddNew.concat(positionMinusNew);
    let addMinusPositionFixed = addMinusPosition.sort((a, b) => a > b ? 1 : -1);
    
    let beforeEleIndex2;
    let afterEleIndex2;
    let v = 0;
    for (i = 0; i < addMinusPositionFixed.length; i++) {
        beforeEleIndex2 = addMinusPositionFixed[i] - 1 - v;
        afterEleIndex2 = addMinusPositionFixed[i] + 1 - v;
        let beforeEle = JSON.parse(numString[beforeEleIndex2]);
        let afterEle = JSON.parse(numString[afterEleIndex2]);
    
        if (numString[addMinusPositionFixed[i] - v] === "+") {        
            let operCurrentRe = beforeEle + afterEle;
            numString.splice(beforeEleIndex2, 3, operCurrentRe);
        } else if (numString[addMinusPositionFixed[i] - v] === "−") {
            let operCurrentRe = beforeEle - afterEle;
            numString.splice(beforeEleIndex2, 3, operCurrentRe);
        }
        v += 2;
    }
    return numString; 
}
/**************Event Listen**************/
clearKey.addEventListener("click", clearAll);
deleteKey.addEventListener("click", deleteLast);
equalKey.addEventListener("click", equalStart);

document.body.addEventListener('mousedown',function(e){ 
	e.preventDefault(); //prevent db click highlight effect
}) 

document.addEventListener('touchstart', this.touchstart);
document.addEventListener('touchmove', this.touchmove);

function touchstart(e) {
    e.preventDefault()
}

function touchmove(e) {
    e.preventDefault()
}
