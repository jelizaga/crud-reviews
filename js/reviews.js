// Initializing Parse and the review raty.
Parse.initialize("hnkJHK9wfuwpvFvE3rkakJRXoF1JpLyNveOV5g64", "qVGWixyvuf5EKo4RKMkkAybzbDGAEbAbiCW3fEJZ");
$("#ratyReview").raty();
var Review = Parse.Object.extend("Review");
getData();

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
		// I think there's a serious bug here. Some nineteen out of twenty times Parse will return
		// an error message; every once in awhile it will work, and this has nothing to do with the
		// contents of the form.
		// The error code is "XMLHttpRequest failed: {}," and it can't be found on Parse's error
		// code page at https://parse.com/docs/js/guide#errors.
		aReview.save(null, {
			success: function(aReview) {
		    	alert("Thank you for your review!");
		    	getData();
		  	},
	  		error: function(aReview, error) {
	    		alert("ERROR: " + error.message);
	  		}
		});
	}
	return false;
});

// Queries parse for review data.
var getData = function() {
	alert("getData called.");
    var query = new Parse.Query(Review);
	query.notEqualTo("reviewerName", "");
	query.notEqualTo("reviewTitle", "");
	query.notEqualTo("reviewStars", 0);
    query.notEqualTo("reviewerText", "");
	// Executes the query above (var query); if it's successful the returned results are sent
	// to insertReviews to be inserted onto the page.
    query.find({
        success:function(results) {
            insertReviews(results);
        }
    });
};

// Empties out the reviews <div>, loops through my parse data and sends each piece of data
// to addReview.
var insertReviews = function(data) {
	alert("insertReviews");
	// $("#reviews").empty();
    for (i in data) {
        addReview(data[i]);
    }
};

var addReview = function(rev) {
	// Acquiring the review's parameters.
	var reviewerName = rev.get("reviewerName");
	var reviewTitle = rev.get("reviewTitle");
	var reviewStars = rev.get("reviewStars");
	var reviewText = rev.get("reviewText");

	// Constructing review.
	var oneReview = ("<div class='islandDiv'><p>" + reviewTitle + " by " + reviewerName + "</p><p>" + reviewStars + "</p><p>" + reviewText + "</p></div>");

	// Inserting review.
	$("#reviewIntro").after(oneReview);
};