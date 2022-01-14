require('dotenv').config();

const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.API_CLARIFAI_KEY}`);

const CLARIFAI_FACEDETECT_MODEL = 'a403429f2ddf4b49b307e318f00e528b';

const handleAPICall = (req, res) => {
  stub.PostModelOutputs(
    {
      model_id: CLARIFAI_FACEDETECT_MODEL,
      inputs: [{ data: { image: { url: req.body.url } } }]
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Error: " + err);
        return;
      }
      if (response.status.code !== 10000) {
        console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
        return;
      }
      res.json(response);

    }
  );
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => { res.json(entries[0]); })
    .catch(() => { res.status(400).json('Unable to get entries'); });
}

module.exports = {
  handleImage,
  handleAPICall
}