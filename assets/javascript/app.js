

var emotionArray = ["Anger", "Shock", "Dissatisfaction","Satisfaction","Happyness", "Boredom","Love", "Hatred", "Admiration", "Distaste"]

$(document).ready(function(){

// FUNCTION THAT POPULATES THE INITIAL 10 BUTTONS

function populateButtons (){
    $("#buttonContainer").empty();
    for (var i = 0; i < emotionArray.length; i++){
        var emotion = $("<button>");
        emotion.addClass("btn-info");
        emotion.addClass("btn btn-primary")
        emotion.attr("data-name", emotionArray[i]);
        emotion.text(emotionArray[i]);
        $("#buttonContainer").append(emotion);
    }
}
populateButtons();

// FUNCTION TO ADD NEW BUTTONS DYNAMICALLY ON CLICK OF SUBMIT BUTTON
// The $( at the beginning simply ensures this function will run on document ready without a call

$(function(){
    $('#newTopicButton').on('click',function(){
        var newTopic = $("<button class='btn btn-info btn-primary'>");
        $("#buttonContainer").append(newTopic);
    });
});
}); // End of document ready function