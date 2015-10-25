// Initializing Parse.
window.onload = function() {
	Parse.initialize("hnkJHK9wfuwpvFvE3rkakJRXoF1JpLyNveOV5g64", "qVGWixyvuf5EKo4RKMkkAybzbDGAEbAbiCW3fEJZ");
	alert("Parse initialized. Creating raty.");
	$("#ratyReview").raty();
	alert("raty created.");
	// Initializing a raty rating plugin.
	// Initializing Review.
	var Review = Parse.Object.extend("Review");
	alert("Done.");
	// getData for the reviews.
	getData();
}

// Triggered on form submission.
$("reviewForm").submit(function() {

	alert("Submitted.");

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
	var reviewTitle = rev.get("reviewTitle");
	var reviewStars = rev.get("reviewStars");
	var reviewText = rev.get("reviewText");
}