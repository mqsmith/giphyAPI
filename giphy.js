console.log("This Worked!");

// Initial array of movies
var animals = ["Cats", "Dogs", "Tigers", "Meer Cat"];

// Function for displaying movie data
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var button = $("<button>");
        // Adding a class
        button.addClass("animal");
        // Adding a data-attribute with a value of the movie at index i
        button.attr("data-name", animals[i]);
        // Providing the button's text with a value of the movie at index i
        button.text(animals[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(button);
    }
}

// This function handles events where one button is clicked
$("#add-button").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    console.log("You clicked me!")
    // This line will grab the text from the input box
    var topic = $("#button-input").val();
    // The movie from the textbox is then added to our array
    animals.push(topic);
    console.log(animals);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
    $("#button-input").val("");
});

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();
$("#button-input").val("");