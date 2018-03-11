import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '..', '..', 'web', 'public')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'web', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
})