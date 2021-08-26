// gameArea section collection
let gameArea = document.getElementById("jeopardy-game-area");
let tableArea = document.getElementById("table-area");
let scoreboardArea = document.getElementById("scoreboard")
let categorySection = document.getElementById("category-section")
let winWagerSection = document.getElementById("win-wager-section");
let questionsSection = document.getElementById("questions-section");
let answerInputSection = document.getElementById("answer-input");






// Preliminary Variables
let headingOne = '1';
let headingTwo = '2';
let headingThree = '3';
let headingFour = '4';
let headingFive = '5';
let jeopardygameAreaHeaders = [
    headingOne,
    headingTwo,
    headingThree,
    headingFour,
    headingFive
];

// data transfer variable
let jeopObj = []

// seperater arrays
let jeopardyRounds = []
let dblJeoparedyRounds = []
let jeopardyPrizeLevels = []

// game decider
let prizeLevels = 2;


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

// randomizes based off array length
function randomizer(obj) {

    return Math.floor(Math.random() * obj.length)
}

// value table setup function
function prizeValueTable() {
    jeopardyPrizeLevels = []
    if (prizeLevels === 1) {
        jeopardyRounds.forEach(object => {
            if (object.value === '$100' || '$200' || '$300' || '$400' || '$500') {
                jeopardyPrizeLevels.push(object)
            }
        })
    }
    if (prizeLevels === 2) {
        jeopardyRounds.forEach(object => {
            if (object.value === '$200' || '$400' || '$600' | '|$800' | '|$1,000') {
                jeopardyPrizeLevels.push(object)
            }
        })
    }

}

function arrayGather(attri, value) {
    let tempArray = []
    jeopObj.forEach(object => {
        let tempObj = object[attri]
        if (tempObj === value) {
            tempArray.push(object);
        }
    })
    // console.log('arrayGather', attri, value, tempArray);
    return tempArray;
}

// get random categories
function randomCategory(headingArray) {
    let category100 = arrayGather('value', '$100')
    let category800 = arrayGather('value', '$800')
    // console.log('category100', category100)
    // console.log('category800', category800)


    // assign random categories to headings
    for (let heading = 0; heading < 5; heading++) {
        // console.log('randomcategory', jeopardyRounds)
        // get random category
        // console.log('randomcategory', jeopardyPrizeLevels)
        let currentCategory
        if (prizeLevels === 1) {

            currentCategory = category100[randomizer(category100)].category;
            console.log('Current Cat 100', currentCategory)
        }

        if (prizeLevels === 2) {
            currentCategory = category800[randomizer(category800)].category;
            console.log('current cat 800', currentCategory)
        }

        // apply random category
        if (!headingArray.includes(currentCategory)) {
            headingArray[heading] = currentCategory;
        } else {
            heading--
        }

    }
    // console.log("headingArray", headingArray)

    // return updated array with new random categories
    return headingArray;
}

function filterCategoryByValue(arrayToFilter, value) {
    let returnArray = [];
    arrayToFilter.forEach(item => {
        if (item.value === value) {
            returnArray.push(item);
        }
    })
    return returnArray
}

function gotQuestion(category) {
    let filteredCategoryArray = arrayGather('category', category)
    // console.log('fga', filteredCategoryArray)
    // console.log('sorted', filteredCategoryArray.sort(function (a, b) {
    //     return a.value - b.value
    // }))

    // let filteredCategoryValueArray = []
    // console.log(category, value)
    // jeopObj.forEach(object => {

    //     if (object.category === category) {
    //         filteredCategoryArray.push(object)
    //     }
    // })
    // console.log('filteredCategoryArray', filteredCategoryArray)
    let returnArray = [];
    if (prizeLevels === 1) {
        returnArray[0] = filterCategoryByValue(filteredCategoryArray, '$100')
        returnArray[1] = filterCategoryByValue(filteredCategoryArray, '$200')
        returnArray[2] = filterCategoryByValue(filteredCategoryArray, '$300')
        returnArray[3] = filterCategoryByValue(filteredCategoryArray, '$400')
        returnArray[4] = filterCategoryByValue(filteredCategoryArray, '$500')
        // console.log('returnArray - got questions', returnArray)
    }
    if (prizeLevels === 2) {
        returnArray[0] = filterCategoryByValue(filteredCategoryArray, '$200')
        returnArray[1] = filterCategoryByValue(filteredCategoryArray, '$400')
        returnArray[2] = filterCategoryByValue(filteredCategoryArray, '$600')
        returnArray[3] = filterCategoryByValue(filteredCategoryArray, '$800')
        returnArray[4] = filterCategoryByValue(filteredCategoryArray, '$1000')
        // console.log('returnArray - got questions', returnArray)
    }
    let filteredReturnArray = []
    returnArray.forEach(object => {
        if (object.length > 1) {
            console.log('gotQuestion returnArray randomizer')
            object = object[randomizer(object)]
            // console.log('object', object)
            filteredReturnArray.push(object)
            console.log(filteredReturnArray)
        }
    })


    console.log('got questions - prizeLevels', prizeLevels)



    // let valueArray100 = []
    // filteredCategoryArray.forEach(item => {
    //     if (item.value === '$100') {
    //         valueArray100.push(item)
    //     }
    // })

    // let valueArray200 = []
    // filteredCategoryArray.forEach(item => {
    //     if (item.value === '$200') {
    //         valueArray200.push(item)
    //     }
    // })
    // console.log('valueArray200', valueArray200)


    // let valueArray300 = []
    // filteredCategoryArray.forEach(item => {
    //     if (item.value === '$300') {
    //         valueArray300.push(item)
    //     }
    // })
    // console.log('valueArray300', valueArray300)

    // let valueArray400 = []
    // filteredCategoryArray.forEach(item => {
    //     if (item.value === '$400') {
    //         valueArray400.push(item)
    //     }
    // })
    // console.log('valueArray400', valueArray400)

    // let valueArray500 = []
    // filteredCategoryArray.forEach(item => {
    //     if (item.value === '$500') {
    //         valueArray500.push(item)
    //     }
    // })
    // console.log('valueArray500', valueArray500)
    // let valueArray600 = []
    // filteredCategoryArray.forEach(item => {
    //     if (item.value === '$600') {
    //         valueArray600.push(item)
    //     }
    // })
    // console.log('valueArray600', valueArray600)
    // let valueArray800 = []
    // filteredCategoryArray.forEach(item => {
    //     if (item.value === '$800') {
    //         valueArray800.push(item)
    //     }
    // })
    // console.log('valueArray800', valueArray800)
    // let valueArray1000 = []
    // filteredCategoryArray.forEach(item => {
    //     if (item.value === '$1000') {
    //         valueArray1000.push(item)
    //     }
    // })
    // console.log('valueArray1000', valueArray1000)
    // let valueArray1500 = []
    // filteredCategoryArray.forEach(item => {
    //     if (item.value === '$1500') {
    //         valueArray1500.push(item)
    //     }
    // })
    // console.log('valueArray1500', valueArray1500)
    // let valueArray2000 = []
    // filteredCategoryArray.forEach(item => {
    //     if (item.value === '$2000') {
    //         valueArray2000.push(item)
    //     }
    // })
    // console.log('valueArray2000', valueArray2000)
    // console.log('valueArray100', valueArray100)
    // let valueArray300 = []
    // let valueArray200 = []
    // let valueArray400 = []
    // let valueArray500 = []
    // let valueArray600 = []
    // let valueArray800 = []
    // let valueArray1500 = []
    // let valueArray2000 = []
    // let valueArray1000 = []

    // filteredCategoryArray.forEach(object => {
    //     if (object.value === value) {
    //         filteredCategoryValueArray.push(object);
    //     }
    // })
    // console.log('filteredCategoryValueArray', filteredCategoryValueArray)
    return filteredReturnArray
}


async function setupJeopardyBoard() {
    // get data for game
    await getData()

    // decide on prize levels
    prizeLevels = randomizer([1, 2])
    if (prizeLevels === 0) {
        prizeLevels = 1
    }
    console.log('prizeLevels', prizeLevels)

    prizeValueTable()


    // tableArea.append(categorySection)

    // categorySection.append();
    // thead.append(tr)

    // get random categories and assign data to jeopObj object
    randomCategory(jeopardygameAreaHeaders);

    // setup headers with random categories aquired
    let count = 1;
    jeopardygameAreaHeaders.forEach(heading => {

        let th = document.createElement("div");
        th.className = "gameArea-head-cell";
        th.innerText = heading;
        // console.log(th.innerText);
        th.classList.add('column-' + count);
        categorySection.append(th)
        count++
    });

    // append the body group to head group
    // thead.append(tbody)

    // setup questions based on categories
    // setup value to be pulled from an array that is built off of the heading category
    count = 1;
    jeopardygameAreaHeaders.forEach(heading => {
        // let's creates some column
        let div = document.createElement("div");
        let currentColumn = "column-" + count
        div.className = currentColumn;
        div.innerText = heading
        let headingDiv = document.querySelector('div.' + currentColumn);
        console.log(headingDiv);
        let count2 = 1;
        let tempQuestArray = gotQuestion(heading);


        // let td = document.createElement("td");
        // td.className = "gameArea-data-cell";
        // td.classList.add('column-' + count);
        count2 = 1;
        console.log(tempQuestArray);
        tempQuestArray.forEach(question => {
            let div = document.createElement("div");
            div.classList.add(currentColumn, 'row-' + count2)
            div.innerText = question.value
            count2++
            // winWagerSection
            headingDiv.append(div)

        })

        count++
    })




    //     // !!!! after sending, take price levels from results
    //     // !!!! adjust price levels and filter out second jeopardy
    //     // !!!! take remaining setup gameArea. (have double jeapoirduy on
    //     // cell that is half the value
    //     // of hte double jeopardy cell)




    //     let jeopObjQuestionArray = jeopObj[count].question.includes(heading);

    //     // if (td.classList.contains('row-0')) {
    //     //     td.innerText = jeopObjQuestionArray[heading].value.filter('$100')
    //     // }
    //     // if (td.classList.contains('row-1')) {
    //     //     td.innerText = jeopObjQuestionArray[count].value.filter('$200')
    //     // }
    //     // if (td.classList.contains('row-2')) {
    //     //     td.innerText = jeopObjQuestionArray[heading].value.filter('$400')
    //     // }
    //     // if (td.classList.contains('row-3')) {
    //     //     td.innerText = jeopObjQuestionArray[heading].value.filter('$600')
    //     // }
    //     // if (td.classList.contains('row-4')) {
    //     //     td.innerText = jeopObjQuestionArray[heading].value.filter('$800')
    //     // }

    //     // td.innerText()
    //     count++
    // })

    console.log("setupJeopardyBoardRunning");




}
$(document).ready(setupJeopardyBoard())