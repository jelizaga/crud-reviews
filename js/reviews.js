// Initializing Parse.
Parse.initialize("hnkJHK9wfuwpvFvE3rkakJRXoF1JpLyNveOV5g64", "qVGWixyvuf5EKo4RKMkkAybzbDGAEbAbiCW3fEJZ");
// Initializing a raty rating plugin.
$("#reviewRating").raty();
// Initializing Review.
var Review = Parse.Object.extend("Review");
alert("Done.");

// Triggered on form submission.
$("reviewForm").submit(function() {

	var newReview = new Review();

	newReview.set("reviewerName", $("#reviewerName").val());
	newReview.set("reviewTitle", $("reviewTitle").val());
	newReview.set("reviewStars", $("#reviewStars").val());
	newReview.set("reviewText", $("#reviewText").val());

	// After setting each property, save your new instance back to your database
	newReview.save(null, {
        success: getData
    });
	return false
});



// Write a function to get data
var getData = function() {
	
    var query = new Parse.Query(Review);

	// Set a parameter for your query -- where the website property isn't missing
    query.notEqualTo("reviewerText", "");

	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/
    query.find({
        success:function(results) {
            insertReviews(results);
        }
    })
}

// Empties out the reviews <div>, loops through my parse data and sends each piece of data
// to addReview.
var insertReviews = function(data) {
	$('#reviews').empty();
    for (i in data) {
        addReview(data[i]);
    }
    /* data.forEach(functions(d) {
        addItem(d);
    }); */
}

var addReview = function(rev) {
	// Get parameters (website, band, song) from the data item passed to the function
	var reviewerName = rev.get("reviewerName");
	var reviewStars = rev.get("reviewStars");

    var band = item.get('band');
    var website = item.get('website');
    var song = item.get('song');

	// Append li that includes text from the data item
    var li = $('<li>' + band + ', ' + song + ', ' + website + '</li>');
    var button = $("<button class='btn-danger btn-xs'><span class='glyphicon'>Remove</span></button>'");
    button.click(function() {
        item.destroy({
            success:getData
        });
    })
    li.append(button);
    $('#list').append(li);

	// Time pending, create a button that removes the data item on click
}

// Call your getData function when the page loads
getData();