// @ts-check
"use strict";

const API = "https://api.kychiu.me/v1/ocean/ocean"
const TAG_FILTER_BUTTON = document.querySelector("#confirmFilterTags");
const TAG_SEARCH_BAR = document.getElementById("tagsToFilter");
const CLEAR_SEARCH_BUTTON = document.querySelector("#clearFilterTags");
const OCEAN = document.querySelector("#ocean");
const ALL_TAGS = document.querySelector("#allTags");
const FILTERED_TAGS = document.querySelector("#filteredTags");

function handleError(error) {
    console.error(error);
}

TAG_FILTER_BUTTON.addEventListener("click", function (event) {
    event.preventDefault();
    searchTags();
});

 TAG_SEARCH_BAR.addEventListener("submit", function (event) {
    event.preventDefault();
    searchTags();
});


CLEAR_SEARCH_BUTTON.addEventListener("click", function (event) {
    event.preventDefault();

    TAG_SEARCH_BAR.value = "";
    searchTags();
});


function searchTags() {
    fetch(API + "?tags="+prepareQueryString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        renderOcean(data);
    }).catch(err => {
        console.log(err);
    });
}

window.onload = function(e){ 
    searchTags();
}


function renderOcean(data) {
    ALL_TAGS.innerHTML = "";
    OCEAN.innerHTML = "";

    // get all the tags into a single string
    let currTags = data.tags;
    let convertedTags = tagsToString(currTags);
    ALL_TAGS.innerHTML = convertedTags;
    let filteredTags = data.filteredBy;
    FILTERED_TAGS.innerHTML = arrayToString(filteredTags);

    // getting the bottle
    if (data.bottles && data.bottles.length != 0) {
        data.bottles.forEach(function (b) {
            getBottle(b);
        })
    }
}


function tagsToString(currTags) {
    // get all the tags into a single string
    let convertedTags = "";
    if (currTags && currTags.length != 0) {
        convertedTags = " " + currTags[0].name;
        if (currTags.length > 1) {
            let i = 1;
            while (i < currTags.length) {
                convertedTags = convertedTags + ", " + currTags[i].name;
                i++;
            }
        }
    }
    return convertedTags;
}

function arrayToString(array) {
    // get all the tags into a single string
    let result = "";
    if (array && array.length != 0) {
        result = " " + array[0];
        if (array.length > 1) {
            let i = 1;
            while (i < array.length) {
                result = result + " , " + array[i];
                i++;
            }
        }
    }
    return result;
}


function bodyToString(currBody) {
    let convertedBody = "";
    if (currBody && currBody.length != 0) {
        currBody.forEach(function (b) {
            if (b.length != 0) {
                convertedBody = convertedBody + b + " <br />";
            }
        });
    }
    return convertedBody;
}

function getBottle(bottle) {
    let cardHolder = document.createElement("div");
    cardHolder.className = "col-sm-6 col-md-4 col-lg-3 d-flex";

    let card = document.createElement("div");
    card.className = "card";
    //card.style = "width: 18rem;"

    let cardContent = document.createElement("div");
    cardContent.className = "card-block p-3";
    
    // get the tags
    let currTags = tagsToString(bottle.tags);
    let tags = document.createElement("div");
    tags.innerHTML = "<b>Tagged:</b>  " + bottle.tags;

    let emotion = document.createElement("div");
    emotion.innerHTML = "<b>Emotion:</b>  " + emotionCleaned(bottle.emotion);

    let exercise = document.createElement("div");
    exercise.innerHTML = "<b>Exercise:</b>  " + exerciseCleaned(bottle.exercise);

    let createdAt = document.createElement("div");
    createdAt.innerHTML = "<b>Date Posted:</b>  " + bottle.createdAt.substring(0, 10) + "</br> </br>";

    // getting the body
    let body = bodyToString(bottle.body);
    let text = document.createElement("div");
    text.innerHTML = body;

    cardContent.appendChild(tags);
    cardContent.appendChild(emotion);
    cardContent.appendChild(exercise);
    cardContent.appendChild(createdAt);
    cardContent.appendChild(text);

    card.appendChild(cardContent);
    cardHolder.appendChild(card);
    OCEAN.appendChild(cardHolder);
}

function prepareQueryString(){
    let tags = TAG_SEARCH_BAR.value;
    return tags;
}


function emotionCleaned(emotion) {
    switch (emotion) {
        case "-2":
          return "Awful";
        case "-1":
          return "Bad";
        case "0":
           return "Ok";
         case "+1":
           return "Good";
         case "+2":
           return "Great";
      }
}

function exerciseCleaned(exercise) {
    return "Emotion Processing";
    //switch (exercise) {
    //    case "1":
    //      return "Emotion Processing";
    //  }
}