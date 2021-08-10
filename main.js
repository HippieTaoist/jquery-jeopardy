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
let jeopardyRounds = []
let dblJeoparedyRounds = []


// setup scoreboard
let scoreboard = document.getElementById("div#scoreboard");


// data stored in jeopObj Array
async function getData() {
    const rawData = await fetch('jeopardy.json');
    const data = await rawData.json();
    jeopObj = data;

    jeopardyRounds = await arrayGather('round', 'Jeopardy!')
    dblJeopardyRounds = await arrayGather('round', 'Double Jeopardy!')

}

// randomizes the show to pull from.
function randomizer(objLength) {

    return Math.floor(Math.random() * objLength)
}

// value table setup function
function prizeValueTable() {

}

function arrayGather(attri, value) {
    let tempArray = []
    jeopObj.forEach(object => {
        let tempObj = object[attri]
        if (tempObj === value) {
            tempArray.push(object);
        }
    })
    console.log('arrayGather', attri, value, tempArray);
    return tempArray;
}

// get random categories
async function randomCategory(headingArray) {
    let jeopardyCategoryArray = jeopObj //filter by jeapardy in catergories

    // assign random categories to headings
    for (let heading = 0; heading < 5; heading++) {

        // get random category
        let currentJeopardyCategory = jeopObj[randomizer(jeopardyCategoryArray)].category;

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

async function gotQuestion(category, value) {
    let filteredCategoryArray = [];
    let filteredCategoryValueArray = []
    console.log(category, value)
    jeopObj.forEach(object => {

        if (object.category === category) {
            filteredCategoryArray.push(object)
        }
    })
    console.log('filteredCategoryArray', filteredCategoryArray)

    filteredCategoryArray.forEach(object => {
        if (object.value === value) {
            filteredCategoryValueArray.push(object);
        }
    })
    console.log('filteredCategoryValueArray', filteredCategoryValueArray)

}


async function setupJeopardyBoard() {
    await getData()
    jeopardyTable.append(table)

    table.append(thead);
    thead.append(tr)

    // get random categories and assign data to jeopObj object
    await randomCategory(jeopardyTableHeaders);

    // setup headers with random categories aquired
    jeopardyTableHeaders.forEach(heading => {
        let count = 1;
        let th = document.createElement("th");
        th.className = "table-head-cell";
        th.innerText = heading;
        console.log(th.innerText);
        th.classList.add('column-' + count);
        tr.append(th)

    });

    // append the body group to head group
    thead.append(tbody)

    // setup questions based on categories
    // setup value to be pulled from an array that is built off of the heading category

    jeopardyTableHeaders.forEach(heading => {
        let count = 1;
        let td = document.createElement("td");
        td.className = "table-data-cell";
        td.classList.add('column-' + count, 'row-' + count);
        gotQuestion(heading, '$100')

        // !!!! after sending, take price levels from results
        // !!!! adjust price levels and filter out second jeopardy
        // !!!! take remaining setup table. (have double jeapoirduy on
        // cell that is half the value
        // of hte double jeopardy cell)




        let jeopObjQuestionArray = jeopObj[count].question.includes(heading);

        // if (td.classList.contains('row-0')) {
        //     td.innerText = jeopObjQuestionArray[heading].value.filter('$100')
        // }
        // if (td.classList.contains('row-1')) {
        //     td.innerText = jeopObjQuestionArray[count].value.filter('$200')
        // }
        // if (td.classList.contains('row-2')) {
        //     td.innerText = jeopObjQuestionArray[heading].value.filter('$400')
        // }
        // if (td.classList.contains('row-3')) {
        //     td.innerText = jeopObjQuestionArray[heading].value.filter('$600')
        // }
        // if (td.classList.contains('row-4')) {
        //     td.innerText = jeopObjQuestionArray[heading].value.filter('$800')
        // }

        // td.innerText()
        count++
    })

    console.log("setupJeopardyBoardRunning");




}
$(document).ready(setupJeopardyBoard())