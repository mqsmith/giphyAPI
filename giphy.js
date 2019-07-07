console.log("This Worked!");

// Initial array of movies
var animals = ["Cats", "Dogs", "Tigers", "MeerCat"];

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
        button.addClass("animal btn btn-info");
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

// This function allows the user to click on a button and make an API call
$(document).on("click", ".animal", function (event) {
    var animalButton = $(this).text();
    console.log(this);
    console.log(animalButton);
    // Storing our giphy API URL for a random cat image
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalButton + "&api_key=xkVN1aICU0Smv71QT38YrVYUsE8L0SwN&limit=10";
    console.log(queryURL);
    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // After the data from the AJAX request comes back
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                //   if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div for the gif
                var gifDiv = $("<div>");

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var animalImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                animalImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(animalImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
                //   }
            }
        });

});