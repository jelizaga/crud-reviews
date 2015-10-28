// Initializing Parse and the review raty.
Parse.initialize("hnkJHK9wfuwpvFvE3rkakJRXoF1JpLyNveOV5g64", "qVGWixyvuf5EKo4RKMkkAybzbDGAEbAbiCW3fEJZ");
$("#ratyReview").raty();
var Review = Parse.Object.extend("Review");
// Aggregate data.
var totalReviews = 0;
var totalStars = 0;
var averageScore = 0;

// Triggered on form submission.
$("#submitReview").on("click", function() {
	
	// Getting form elements.
	var reviewerName = $("#reviewerName").val();
	var reviewTitle = $("#reviewTitle").val();
	var reviewStars = $("#ratyReview").raty("score");
	var reviewText = $("#reviewText").val();
	
	// Authenticate that there's stuff in the form.
	if (reviewerName === "" || reviewTitle === "" || reviewStars === 0 || reviewText === "") {
		alert("You forgot something. Please fill out the form completely.");
	} else {
		// If stuff's in the form, get the stuff, send to Parse.
		var aReview = new Review();
		aReview.set("reviewerName", reviewerName);
		aReview.set("reviewTitle", reviewTitle);
		aReview.set("reviewStars", parseInt(reviewStars));
		aReview.set("reviewText", reviewText);
		aReview.set("upvotes", 0);
		aReview.set("downvotes", 0);
		aReview.save(null, {
			// Save is successful: thanks the user for the review, updates reviews, clears form.
			success: function(aReview) {
				alert("Thank you for your review!");
				$("#reviewerName").empty();
				$("#reviewTitle").empty();
				$("#reviewText").empty();
				getReviews();
			},
			// Save failed: error code displayed.
			error: function(aReview, error) {
				alert("ERROR: " + error.message);
			}
		});
	}
	return false;

});

// Queries parse for the reviews.
var getReviews = function() {

	$("#reviews").empty();

	var query = new Parse.Query(Review);
	query.find({
		success:function(results) {
			insertReviews(results);
		}
	});

};

// Empties out the reviews <div>, loops through my Parse data and sends each piece of data
// to addReview.
var insertReviews = function(data) {

	$("#reviewList").empty();
    for (i in data) {
        addReview(data[i]);
    }

};

// Adds a review to the "reviews" div.
var addReview = function(rev) {

	// Acquiring the review's parameters.
	var reviewerName = rev.get("reviewerName");
	var reviewTitle = rev.get("reviewTitle");
	var reviewStars = rev.get("reviewStars");
	var reviewText = rev.get("reviewText");

	// Updating aggregate data.
	totalReviews++;
	totalStars = totalStars + reviewStars;
	averageScore = (totalStars / totalReviews);
	$("#ratyAverage").raty({
		readOnly: true,
		score: averageScore
	});

	// Debugging alert.
	// alert("[REVIEWER NAME:] " + reviewerName + " [REVIEW TITLE:] " + reviewTitle + " [REVIEW SCORE:] " + reviewStars + " [REVIEW TEXT:] " + reviewText);

	// Constructing review.
	var oneReview = $("<div class='islandDiv'><div id='ratyDiv'></div><text class='bold'>" + reviewTitle + "</text><p>" + "</p><p>" + reviewText + "</p><p class='italic'>- " + reviewerName + "</p></div>");
	$("#ratyDiv").raty({
		readOnly: true,
		score: reviewStars
	});
	
	// Inserting review.
	$("#reviewList").append(oneReview);

};