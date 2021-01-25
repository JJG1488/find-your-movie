// + $("#userInput").val() + "&begin_date=20120101&end_date=20121231&api-key=n8ZpZeGBjpYFymrs0Lcvt46sbEJDkNuY"
//check for Navigation Timing API support

//  ------------------------------ Local Storage -------------------------------===================================
// getting user input value
const inpValue = document.getElementById('userInput')
// selecting btn from html
const btnInsert = document.getElementById('btn')
// setting an array for localStorage
const lsArray = []
// selecting a place to display local storage
const lsOutput = document.getElementById('lsOutput');
// setting up the last item in the local storage to be selected with getItem() method
const lastItemInLocalStorage = JSON.parse(window.localStorage.getItem("lsArray"))
// logging last item in local storage to check value
// console.log(lastItemInLocalStorage[lastItemInLocalStorage.length - 1]);

let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
if (searchHistory == undefined || searchHistory == null){
    searchHistory = ["shrek"];
}
let lastSearchedInput = searchHistory[(searchHistory.length - 1)];


// creating a function for the button click for local storage
btnInsert.onclick = function () {
    // setting user input value to the variable value
    const value = inpValue.value;
    // pushing user input value to the local storage array lsArray
    lsArray.push(value);
    // considtional for if there is a value
    if (value) {
        // if there is a value, stringify lsArray and set that value in the local storage
        localStorage.setItem("lsArray", JSON.stringify(lsArray));
        // used to check and make sure that data persists//----> if location.reload() is not commented out,
        // then the previous search history will ONLY show the last result
        // location.reload()

    }
    getMyMovie(value)
}



// setting for loop for the local storage
for (let index = 0; index < localStorage.length; index++) {
    // setting const for local storage key
    const key = localStorage.key(index);
    // setting getItem() method for the loop to get the key from the local storage
    const value = localStorage.getItem(key);
    // placing the key and value into html selected tag
    lsOutput.innerHTML += `${key}: ${value}<br>`;

}


//  ------------------------------ Global Variables -------------------------------===================================
// setting searchHistory array
// let searchHistory = [];
// setting foundArray
let foundArray = [];
// setting array for major streaming services
let majorStreamServices = ["Amazon", "Netflix", "Hulu"];

if (performance.type == performance.TYPE_RELOAD) {

    getMyMovie(lastItemInLocalStorage[lastItemInLocalStorage.length - 1]);
}

// creating function to find Netflix

function findNetflix(api, input) {
    let netflixLinkEl = $('#netflix-text');
    for (let index = 0; index < api.length; index++) {
        let streamLink = "";
        if (api[index].Watch === "Netflix") {
            streamLink = api[index].WatchUrl
            netflixLinkEl.attr("href", streamLink)
            netflixLinkEl.text('You can find ' + input + ', here on Netflix');
            netflixLinkEl.removeAttr("linkBroke");
            netflixLinkEl.attr("class", "linkWorks");
            break;
        } else {
            streamLink = "";
            netflixLinkEl.attr("href", streamLink)
            netflixLinkEl.text("Not available on Netflix");
            netflixLinkEl.removeAttr("linkWorks");
            netflixLinkEl.attr("class", "linkBroke");
        }
    }
}
function findHulu(api, input) {
    let huluLinkEl = $('#hulu-text');
    for (let index = 0; index < api.length; index++) {
        let streamLink = "";
        if (api[index].Watch === "Hulu") {
            streamLink = api[index].WatchUrl
            huluLinkEl.attr("href", streamLink)
            huluLinkEl.text('You can find ' + input + ', here on Hulu');
            huluLinkEl.removeAttr("linkBroke");
            huluLinkEl.attr("class", "linkWorks");
            break;
        } else {
            streamLink = "";
            huluLinkEl.attr("href", streamLink)
            huluLinkEl.text("Not available on Hulu");
            huluLinkEl.removeAttr("linkWorks");
            huluLinkEl.attr("class", "linkBroke");
        }
    }
}
function findAmazon(api, input) {
    let amazonLinkEl = $('#amazon-text');
    for (let index = 0; index < api.length; index++) {
        let streamLink = "";
        if (api[index].Watch === "Amazon") {
            streamLink = api[index].WatchUrl
            amazonLinkEl.attr("href", streamLink)
            amazonLinkEl.text('You can find ' + input + ', here on Amazon');
            amazonLinkEl.removeAttr("linkBroke");
            amazonLinkEl.attr("class", "linkWorks");
            break;
        } else {
            streamLink = "";
            amazonLinkEl.attr("href", streamLink)
            amazonLinkEl.text("Not available on Amazon");
            amazonLinkEl.removeAttr("linkWorks");
            amazonLinkEl.attr("class", "linkBroke");
        }
    }
}

// previous search history function //
function previousSearch(searchHistory) {
    let ul = document.getElementById("search-history");
    $('#search-history').empty();
    // console.log(searchHistory)
    for (let index = 0; index < searchHistory.length; index++) {
        let li = document.createElement("li");
        let t = document.createTextNode(searchHistory[index]);
        li.appendChild(t);
        ul.appendChild(li);
        li.classList.add("search-history-list");
    }
}


function getMyMovie(input) {

    var queryURL = "https://watch-here.p.rapidapi.com/wheretowatch?title=" + input + "&mediaType=tv%20show";
    
    // ------------------------------------ Setting up local storage -------------------------------------------------
    
    if (searchHistory.includes(input)) {

    }else if (searchHistory.length === 5) {

        searchHistory.shift(0);
        searchHistory.push(input);

    } else {

        searchHistory.push(input);
    }

    // console.log(searchHistory)

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));


    // function for search on the li element
    $("#search-history").on("click", "li", function () {
        // calls getMyMovie() on the text value of the click li element
        getMyMovie($(this).text());
    });

    // ---------------------------------------- Where to watch API --------------------------------------------------

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
            "x-rapidapi-host": "watch-here.p.rapidapi.com"
        },
        "processData": false,
        "data": "{\n    \"mediaType\": \"tv show\",\n    \"title\": \"" + input + "\"\n}"
    };
    // ------------------------------------------------------------- First Ajax Call ------------------------------------------------
    $.ajax(settings).done(function (response) {

        let parsedResponse = JSON.parse(response)

        // Which Streaming Service Available

        findNetflix(parsedResponse, input);
        findHulu(parsedResponse, input);
        findAmazon(parsedResponse, input);
        console.log("response 1 below");
        console.log(parsedResponse);
        let newArray = [];
        for (let index = 0; index < parsedResponse.length; index++) {
            newArray.push(parsedResponse[index].Watch)
        }
        // console.log(newArray);

    })

    // ---------------------------------------- IMDB API --------------------------------------------------

    const settings2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-by-title&title=" + input,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
            "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
        }
    };
    $.ajax(settings2).done(function (response2) {
        let imdbID = "";
        console.log("response 2 below");
        console.log(response2);
        // console.log(response2.search_results);
        let response2Results = response2.movie_results;
        // console.log(response2Results);
        for (let i = 0; i < response2Results.length; i++) {

            if ((response2Results[i].title).toLowerCase() == input.toLowerCase()) {
                imdbID = response2Results[i].imdb_id;
                // console.log(imdbID);
            }
        }
        // Movie Picture API
        const settings3 = {
            "async": true,
            "crossDomain": true,
            "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-images-by-imdb&imdb=" + imdbID,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
                "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
            }
        };
        $.ajax(settings3).done(function (response3) {
            // console.log(response3.poster);
            let moviePoster = response3.poster;
            $(".thumbnail").attr("src", moviePoster);
            // title / description / rated / release_date / runtime
            const settings4 = {
                "async": true,
                "crossDomain": true,
                "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movie-details&imdb=" + imdbID,
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
                    "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
                }
            };
            $.ajax(settings4).done(function (response4) {
                // console.log(response4.title);
                $('.title').text(response4.title);
                $('.rated').text("Rated: " + response4.rated);
                $('.release-date').text("Release Date: " + response4.release_date);
                $('.runtime').text("Runtime: " + response4.runtime + " minutes");
                $('.description').text(response4.description);
                //If we want to expand to recommended movies here are recommended titles.
                const settings5 = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-similar-movies&imdb=" + imdbID + "&page=1",
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
                        "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
                    }
                };
                $.ajax(settings5).done(function (response5) {
                    // console.log(response5);
                    let recommendedMovies = response5["movie_results"];
                    $('#recommended').empty();
                    for (let index = 0; index < recommendedMovies.length; index++) {
                        $('#recommended').append(`<li class="recommended-list hidden">${recommendedMovies[index].title}</li>`);
                    }

                    // -------------------- Search History --------------------- //
                    previousSearch(searchHistory);

                    // Displays Document

                    $(".hidden").removeClass("hidden")
                    $(".recommended-list").on("click", function () {
                        let recommendedInput = $(this).text();
                        console.log(recommendedInput);

                        getMyMovie(recommendedInput);
                    })
                    $(".search-history-list").on("click", function () {
                        let searchHistoryInput = $(this).text();

                      getMyMovie(searchHistoryInput);
                    })
                });
            });
        });
    });
}


// window.onload = getMyMovie(lastSearchedInput);

// $("#btn").on("click", () => {
//     let userInput = $("#userInput").val();
//     getMyMovie(userInput);
// });


function modalAlert() {

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    modal.classList.add(".show");

    modal.style.display = 'block';
    // When the user clicks on <span> (x), close the modal

    span.onclick = function () {
        modal.style.display = 'none';
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

}

