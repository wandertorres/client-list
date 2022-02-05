//Install express server
/*const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/client-list'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/client-list/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);*/
const express = require('express');
const app = express();
const appName = 'client-list';
const outputPath = `${__dirname}/dist/${appName}`;
app.use(express.static(outputPath));
app.get('/*', (req, res) => {
    res.sendFile(`${outputPath}/index.html`);
});
app.listen(process.env.PORT);