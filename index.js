const server = require('./server/server.js');
const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log("\n==Running on 4000==\n");
});