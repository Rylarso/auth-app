const app = require("./server/server");;
const {connect, onConnect} = require("./persist/connect");
const config = require("./config");

onConnect(() => {
    app.listen(config.http_port, () => {
        console.log(`server running on port ${config.http_ports}`);
    });
});

try{
    connect(
        config.mongo_user,
        config.mongo_pass,
        config.mongo_host,
        config.mongo_port,
        config.mongo_db
    );
} catch (err) {
    console.log(err);
    throw "Couldn't Start";
}