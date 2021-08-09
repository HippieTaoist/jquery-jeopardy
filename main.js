// table section collection
let jeopardySection = document.getElementById("jeopardy-table-build-section");
let jeopardyTable = document.getElementById("questions-table");
let jeopardyTableHeadGroup = document.getElementsByClassName("div.table-head-group");
let jeopardyTableBodyGroup = document.getElementsByClassName("div.table-body-group");
let jeopardyTableRow = document.getElementsByClassName("div.table-row");
let jeopardyTableHeadCell = document.getElementsByClassName("div.table-head-cell");
let jeopardyTableDataCell = document.getElementsByClassName("div.table-data-cell");


//Table Creation Tools
let table = document.createElement("table");
table.className = "table"
let tr = document.createElement("tr");
tr.className = "table-row";


let thead = document.createElement("thead");
thead.className = "table-head-group";
let tbody = document.createElement("tbody");
tbody.className = "table-body-group";
let div = document.createElement("div");


// Preliminary Variables

let headingOne = '1';
let headingTwo = '2';
let headingThree = '3';
let headingFour = '4';
let headingFive = '5';
let jeopardyTableHeaders = [
    headingOne,
    headingTwo,
    headingThree,
    headingFour,
    headingFive
];

let jeopObj = []


// setup scoreboard
let scoreboard = document.getElementById("div#scoreboard");


// data stored in jeopObj Array
async function getData() {
    const rawData = await fetch('jeopardy.json');
    const data = await rawData.json();
    jeopObj = data;
}

// randomizes the show to pull from.
function randomizer() {
    return Math.floor(Math.random() * 49377)
}

// get random categories
async function randomCategory(headingArray) {

    // assign random categories to headings
    await getData()
    for (let heading = 0; heading < 5; heading++) {

        // get random category
        let currentCategory = jeopObj[randomizer()].category;

        // apply random category
        if (!headingArray.includes(currentCategory)) {
            headingArray[heading] = currentCategory;
        } else {
            heading--
        }

    }
    console.log("headingArray", headingArray)

    // return updated array with new random categories
    return headingArray;
}


async function setupJeopardyBoard() {
    await getData()

    console.log("jeoObj", jeopObj)
    jeopardyTable.append(table)

    table.append(thead);
    thead.append(tr)

    randomCategory(jeopardyTableHeaders);



    jeopardyTableHeaders.forEach(heading => {
        let th = document.createElement("th");
        th.className = "table-head-cell";
        th.innerText = heading;
        console.log('innertext ran');
        console.log(th.innerText);
        th.classList.add('column-' + [heading]);
        tr.append(th)

    });


    thead.append(tbody)

    jeopardyTableHeaders.forEach(heading => {
        let td = document.createElement("td");
        td.className = "table-data-cell";
        td.classList.add('column-' + [heading], 'row-' + [heading]);
        let jeopObjQuestionArray = jeopObj[heading].question.includes(heading);

        if (td.classList.contains('row-0')) {
            td.innerText = jeopObjQuestionArray[heading].value.filter('$100')
        }
        if (td.classList.contains('row-1')) {
            td.innerText = jeopObjQuestionArray[heading].value.filter('$200')
        }
        if (td.classList.contains('row-2')) {
            td.innerText = jeopObjQuestionArray[heading].value.filter('$400')
        }
        if (td.classList.contains('row-3')) {
            td.innerText = jeopObjQuestionArray[heading].value.filter('$600')
        }
        if (td.classList.contains('row-4')) {
            td.innerText = jeopObjQuestionArray[heading].value.filter('$800')
        }

        td.innerText()
    })

    console.log("setupJeopardyBoardRunning");


    console.log(randomCategory(jeopardyTableHeaders))

}
$(document).ready(getData())
$(getData()).ready(setupJeopardyBoard())