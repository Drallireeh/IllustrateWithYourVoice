/**
 * Make a request with serp api to search images on google
 * @param {string} keyword keyword to use for search 
 * @param {string} options if selected, we can add more informations while searching (for example, different style of images)
 */
function searchGoogle(keyword, options = "") {
	// request on our server while using serp api
	axios.get('https://adcoin.fr/api/query/' + keyword + ' ' + options).then(response => {
		console.log(response)
		$(".story-ctn").append(`<img src="${response.data.images_results[0].thumbnail}"/>`);
	});
}