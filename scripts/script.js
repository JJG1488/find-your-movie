// + $("#userInput").val() + "&begin_date=20120101&end_date=20121231&api-key=n8ZpZeGBjpYFymrs0Lcvt46sbEJDkNuY"

//  ------------------------------ Global Variables -------------------------------===================================

let searchHistory = [];

$("#btn").on("click", () => {

    let userInput = $("#userInput").val();
    var queryURL = "https://watch-here.p.rapidapi.com/wheretowatch?title=" + userInput + "&mediaType=tv%20show";

    // ------------------------------------ Setting up local storage -------------------------------------------------

    searchHistory.push(userInput);

    window.localStorage.setItem('searchHistory', searchHistory);

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
        "data": "{\n    \"mediaType\": \"tv show\",\n    \"title\": \"" + userInput + "\"\n}"
    };
// ------------------------------------------------------------- First Ajax Call ------------------------------------------------
    $.ajax(settings).success(function (response) {

        let parsedResponse = JSON.parse(response)

            if(parsedResponse[0].Watch === "Amazon" || parsedResponse[0].Watch === "Netflix" || parsedResponse[0].Watch === "Hulu"){
            // console.log(response["search-results"]);

            // alert("Its on!!!!!")
            console.log(parsedResponse[0].Watch);
            // console.log(parsedResponse[0]["Watch"]);

        } else {

            // Get the modal
            const modal = document.getElementById('myModal')

            // Get the button that opens the modal
            const btn = document.getElementById('myBtn')

            // Get the <span> element that closes the modal
            const span = document.getElementsByClassName('close')[0]

            modal.style.display = 'block'

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = 'none'
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none'
                }
            }

            // alert("That aint no movie")
            // console.log(response);
            // console.log(parsedResponse[0]["Watch"]);
            console.log(parsedResponse[0].Watch);
        }
    })

    // ---------------------------------------- IMDB API --------------------------------------------------

    const settings2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-by-title&title=" + userInput,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
            "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
        }
    };

    $.ajax(settings2).success(function (response2) {
        // ---------------------------------- create search history list ------------------------
        
        let ul = document.getElementById("search-history");
        let li = document.createElement("li");
        let t = document.createTextNode(userInput);
        li.appendChild(t);
        ul.appendChild(li);

        console.log(response2);

    });
    $(".hidden").removeClass("hidden")
})


