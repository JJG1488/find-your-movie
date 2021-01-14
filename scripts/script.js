 // + $("#userInput").val() + "&begin_date=20120101&end_date=20121231&api-key=n8ZpZeGBjpYFymrs0Lcvt46sbEJDkNuY"


 $("#btn").on("click", () => {

    let userInput = $("#userInput").val();

    var queryURL = "https://netflix-unofficial.p.rapidapi.com/api/search";

    // ----------------------------------------Where to watch API--------------------------------------------------

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://watch-here.p.rapidapi.com/wheretowatch?title=" + userInput + "&mediaType=tv%20show",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
            "x-rapidapi-host": "watch-here.p.rapidapi.com"
        },
        "processData": false,
        "data": "{\n    \"mediaType\": \"tv show\",\n    \"title\": \""+ userInput +"\"\n}"
    };

    $.ajax(settings).done(function (response) {
        let parsedResponse = JSON.parse(response)
        console.log(typeof parsedResponse);
        // console.log(response)
        // console.log(typeof response)
        console.log(parsedResponse[0]);

    });

    // ----------------------------------------IMDB API --------------------------------------------------

    const settings2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-by-title&title="+ userInput,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "69d811a2bemsh7406c1b512a31f1p10322djsn64aee285beed",
            "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
        }
    };

    $.ajax(settings2).done(function (response2) {
        console.log(response2);
    });

})
