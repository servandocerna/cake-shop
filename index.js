const express = require('express');

const app = express();
const port = process.env.PORT || 1337;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello Cake show!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
