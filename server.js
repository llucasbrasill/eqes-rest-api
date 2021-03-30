import app from './app';

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log();
  console.log(`Listen the port: ${port}`);
  console.log(`Application url: http://localhost/${port}`);
  console.log();
});
