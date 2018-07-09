
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
            newTopic.addClass("btn-info");
            newTopic.addClass("btn btn-primary")
            newTopic.attr("data-name", search);
            newTopic.text(search);

            //APPEND BUTTON TO THE LIST AND ADD IT TO THE ARRAY
            $("#buttonContainer").append(newTopic);
            emotionArray.push(search);

        });
    });

    // AJAX COMMUNICATION

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&apikey=8iB1yv88fnnwDTQ4Wm0yhxOghzzbO7Yq&limit=10";
    console.log(queryURL);

    // FUNCTION TO QUERY AND RETURN FOR LOOP SPECIFIED DATA

    function getGif() {

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
                gifName.text(results[i].data.title);
                gifName.attr("src", results[i].images.fixed_height_small_still.url);
                gifName.addClass("newGif");
                console.log(gifName);
                gifName.attr("data-state", "still");
                $('.gifColumn').append(gifName);
            }
        });
    }
    $(document).on("click", ".search", getGif);
    $(document).on("click", ".newGif", getGif);



















}); // End of document ready function