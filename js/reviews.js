// Initializing Parse and the review raty.
Parse.initialize("hnkJHK9wfuwpvFvE3rkakJRXoF1JpLyNveOV5g64", "qVGWixyvuf5EKo4RKMkkAybzbDGAEbAbiCW3fEJZ");
$("#ratyReview").raty();
var Review = Parse.Object.extend("Review");
/*
var newReview = new Review();
newReview.save({
	reviewerName: "W",
	reviewTitle: "X",
	reviewStars: "Y",
	reviewText: "Zs"
});
*/
// getData();

// Triggered on form submission.
$("#submitReview").on("click", function() {
	
	// Getting form elements.
	var reviewerName = $("#reviewerName").val();
	var reviewTitle = $("#reviewTitle").val();
	var reviewStars = $("#ratyReview").raty("score");
	var reviewText = $("#reviewText").val();
	alert("This should be sent to Parse: " + reviewerName + " " + reviewTitle + " " + reviewStars + " " + reviewText);

	var testReview = new Review();
	testReview.save({
		reviewerName: "?",
		reviewTitle: "?",
		reviewStars: "?",
		reviewText: "?"
	});



	/*
	var reviewerName = $("#reviewerName").val();
	var reviewTitle = $("#reviewTitle").val();
	var reviewStars = $("#ratyReview").raty("score");
	var reviewText = $("#reviewText").val();
	alert(reviewerName + " " + " " reviewTitle + " " + reviewStars + " " + reviewText);

	var stars = $("#ratyReview").raty("score");

	alert("Stars: " + stars);

	// Setting the newReview's content.
	newReview.set("reviewerName", $("#reviewerName").val());
	newReview.set("reviewTitle", $("#reviewTitle").val());
	newReview.set("reviewStars", stars);
	newReview.set("reviewText", $("#reviewText").val());
	// Setting the newReview's vote counts to zero.
	newReview.set("upvotes", 0);
	newReview.set("downvotes", 0);

	// Saves newReview to parse, getData.
	newReview.save();
	getData();
	*/
});

// Queries parse for review data.
var getData = function() {
	alert("getData");
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
	alert("insertReviews");
	// $("#reviews").empty();
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

	// Constructing review.
	var oneReview = ("<div class='islandDiv'><p>" + reviewTitle + " by " + reviewName + "</p><p>" + reviewStars + "</p><p>" + reviewText + "</p></div>");

	// Inserting review.
	$("#reviewIntro").after(oneReview);
}