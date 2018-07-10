
// GLOBAL VARIABLES:

var emotionArray = ["Anger", "Shock", "Dissatisfaction", "Satisfaction", "Happiness", "Boredom", "Love", "Hatred", "Admiration", "Distaste"]
search = $("#searchInput").val().trim();


// DOCUMENT READY:

$(document).ready(function () {

    // FUNCTION THAT POPULATES THE INITIAL 10 BUTTONS:
    // The $( at the beginning simply ensures this function will run on document ready without a call

    $(function populateButtons() {

        // EMPTY CONTENTS OF BUTTON CONTAINER
        $("#buttonContainer").empty();

        // CREATE A BUTTON FOR EVERY ELEMENT IN THE ARRAY; ADD APPROPRIATE CLASSES, ARRAY NAME, AND ARRAY TEXT
        for (var i = 0; i < emotionArray.length; i++) {
            var emotion = $("<button>");
            emotion.addClass("loadGifWhenClicked");
            emotion.addClass("btn-info");
            emotion.addClass("btn btn-primary")
            emotion.attr("data-name", emotionArray[i]);
            emotion.text(emotionArray[i]);

            // APPEND BUTTONS TO THE BUTTON CONTAINER DIV (STILL WITHIN FOR LOOP)
            $("#buttonContainer").append(emotion);
        }
    });


    // FUNCTION TO ADD NEW BUTTONS DYNAMICALLY ON CLICK OF SUBMIT BUTTON:
    // The $( at the beginning simply ensures this function will run on document ready without a call

    $(function () {

        $('#newTopicButton').on('click', function () {

            // GRAB INPUT FROM SEARCH BAR
            var search = $("#searchInput").val().trim();

            // RETURN FALSE IF USER TRIES TO SUBMIT WITHOUT ENTERING A VALUE
            if (search === "") {
                return false;
            }
            // CREATE BUTTON

            var newTopic = $("<button>");
            newTopic.addClass("loadGifWhenClicked");
            newTopic.addClass("btn-info");
            newTopic.addClass("btn btn-primary")
            newTopic.attr("data-name", search);
            newTopic.text(search);

            //APPEND BUTTON TO THE LIST AND ADD IT TO THE ARRAY
            $("#buttonContainer").append(newTopic);
            emotionArray.push(search);

        });
    });


    // FUNCTION TO QUERY AND RETURN FOR LOOP SPECIFIED DATA

    function getGif() {

        search = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&apikey=8iB1yv88fnnwDTQ4Wm0yhxOghzzbO7Yq&limit=10";
        console.log(this);

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            console.log(results);
            if (results == "") {
                return false;
            }
            // TODO THE BELOW CODE DOES NOT APPEAR TO BE FIRING. I ADDED EVENT LISTENERS BELOW SO THAT IF THE TWO CLASSES ARE CLICKED, IT SHOULD RUN THE WHOLE CODE ALL THE WAY THROUGH TO THE APPEND. NOT GETTING ERRORS AND I AM STILL NOT CLEAR AS TO HOW TO DEBUG.

            for (var i = 0; i < results.length; i++) {
                var gifName = $("<div>");
                var gifName = $("<img>");
                gifName.text(results[i].title);
                gifName.attr("alt", results[i].title);
                gifName.attr("src", results[i].images.fixed_height.url);
                gifName.attr("data-animate",results[i].images.original.url);
                gifName.attr("data-still",results[i].images.original_still.url);
                gifName.attr("data-state", "still");
                gifName.addClass("newGif");
                console.log(gifName);
                $('#gifDisplayArea').append(gifName);
            }
        });
    }

    function emptyGifs(){
        $("#gifDisplayArea").empty();
    }

    // POINT TO THE DOM AND LISTEN FOR AN EVENT WITH ONE OF THE THREE CLASSES LISTED. ONCE THAT EVENT OCCURS, RUN THE getGif FUNCTION.

    $(document).on("click", ".search", getGif);
    $(document).on("click", ".loadGifWhenClicked", getGif);
    $(document).on("click", "#clearGifsButton", emptyGifs);

    // LOAD STILL IMAGES OF THE GIF INITIALLY. ON CLICK, CHANGE THE STATE OF THE IMAGE TO ONE THAT IS ANIMATED.
    // TODO - NOT FUNCTIONING RIGHT. IT CYCLES THROUGH THE STATES AND WILL PAUSE AND PLAY THE GIFS BUT IT DOES NOT START OFF FROM THE CORRECTLY SPECIFIED STILL STATE

    $(document).on("click", ".newGif", function(){

    var state = $(this).attr('data-state');
    console.log(state);

    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        console.log(this);
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});






}); // End of document ready function