function searchGoogle(keyword) {
	axios.get('https://adcoin.fr/api/query/' + keyword).then(response => {
		console.log(response)
		$(".story-ctn").append(`<img src="${response.data.images_results[0].thumbnail}"/>`);
	});
}