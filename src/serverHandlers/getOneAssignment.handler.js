export default function(req, res) {
	res.send({
		"_id": "1",
		"author": "Joseph",
		"isHomework": true,
		"isReview": false,
		"title": "Homwework 5",
		"school": "Georgia Institute of Technology",
		"subject": "CS",
		"classNumber": 1301,
		"className": "Introduction to CS",
		"professor": "Moolah Boolah",
		"semester":  2,
		"video": "1",
		"questions": [
			{
        "question": "Can't touch this",
        "timeStart": 0,
        "timeEnd": 4
      },
      {
        "question": "Begin",
        "timeStart": 4,
        "timeEnd": 30
      },
      {
        "question": "Scream",
        "timeStart": 30,
        "timeEnd": 52
      },
      {
        "question": "Build Up",
        "timeStart": 52,
        "timeEnd": 62
      },
      {
        "question": "Loud Part",
        "timeStart": 62,
        "timeEnd": 86
      }
		],
		"tags": ["Thing"]
	})
}
