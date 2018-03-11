import requester from 'superagent';

export default function(req, res) {
	console.log('here')
	if (!req.query.q) {
		requester.get('https://api.zenow.io/v1/set/58bc9ef82a4dde24c01ad6a9/item?apikey=' + process.env.API_KEY)
			.end((err, result) => {
				if (err) {
					console.log(err);
					res.send([]);
				} else {
					console.log('success');
					res.send(result.body.items.read);
				}
			});
	} else {
		requester.post('https://api.zenow.io/v1/set/58bc9ef82a4dde24c01ad6a9/item/search?apikey=' + process.env.API_KEY)
			.send({
				$text: {
					$search: req.query.q
				}
			})
			.end((err, result) => {
				if (err) {
					console.log(err);
					res.send([]);
				} else {
					console.log('success');
					res.send(result.body.items.read);
				}
			});
	}
}
