import express from 'express';
import path from 'path';

const app = express();
const port = 3023;


app.use(express.static(path.join(__dirname, '..')));  


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});