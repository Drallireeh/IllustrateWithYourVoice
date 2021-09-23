import {addDbImage} from './main.js'

/**
 * Make a request with serp api to search images on google
 * @param {string} keyword keyword to use for search 
 * @param {string} index index used to replace img in their initial order 
 * @param {string} options if selected, we can add more informations while searching (for example, different style of images)
 */
export default function searchGoogle(keyword, index, options = "") {
	// request on our server while using serp api
	axios.get('https://adcoin.fr/api/query/' + keyword + ' ' + options).then(response => {
		$(".story-ctn-temp").append(`<img src="${response.data.images_results[0].thumbnail}" data-index="${$(".story-ctn").children().length + 1 + index}"/>`);
		addDbImage(keyword + ' ' + options, response.data.images_results[0].thumbnail);
	});
}