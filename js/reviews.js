// Initializing Parse and the review raty.
window.onload = function() {
	Parse.initialize("hnkJHK9wfuwpvFvE3rkakJRXoF1JpLyNveOV5g64", "qVGWixyvuf5EKo4RKMkkAybzbDGAEbAbiCW3fEJZ");
	$("#ratyReview").raty();
	var Review = Parse.Object.extend("Review");
	// getData for the reviews.
	getData();
}

// Triggered on form submission.
$("reviewForm").submit(function() {

	alert("Submitted.");

	var newReview = new Review();
	var stars = $("#ratyReview").raty("score");

	alert("Stars: " + stars);

	// Setting the newReview's content.
	newReview.set("reviewerName", $("#reviewerName").val());
	newReview.set("reviewTitle", $("reviewTitle").val());
	newReview.set("reviewStars", $("#ratyReview").val());
	newReview.set("reviewText", $("#reviewText").val());
	// Setting the newReview's vote counts to zero.
	newReview.set("upvotes", 0);
	newReview.set("downvotes", 0);

	// After setting each property, save your new instance back to your database
	newReview.save(null, {
        success: getData
    });
	return false
});



// Queries parse for review data.
var getData = function() {
	
    var query = new Parse.Query(Review);
	// Set a parameter for your query -- where the website property isn't missing
    query.notEqualTo("reviewerText", "");
	// Executes the query above (var query); if it's successful the returned results are sent
	// to insertReviews to be inserted onto the page.
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
}

var addReview = function(rev) {
	// Acquiring the review's parameters.
	var reviewerName = rev.get("reviewerName");
	var reviewTitle = rev.get("reviewTitle");
	var reviewStars = rev.get("reviewStars");
	var reviewText = rev.get("reviewText");

	alert(reviewerName + " " + reviewTitle + " " + reviewStars + " " + reviewText);
}