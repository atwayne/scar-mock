const http = require("http");
const contentType = "application/json; charset=utf-8";

const getPort = () => {
    const defaultPort = 9000;
    const argv = process.argv.slice(2);
    if (argv.length === 2 && argv[0] === "--port") {
        return argv[1];
    }
    return defaultPort;
};

const writeStatusCode = (res, statusCode) => {
    res.writeHead(statusCode, { "Content-Type": contentType });
    res.write(JSON.stringify({ "status": statusCode }));
    res.end();
};

const ok = (res) => {
    writeStatusCode(res, 200);
    return;
};

const serverError = (res) => {
    writeStatusCode(res, 500);
    return;
};

const sneezy = (res) => {
    // once in every 10 request we screw up
    const dice = Math.ceil(Math.random() * 10);
    if (dice === 1) {
        return serverError(res);
    }
    return ok(res);
};

const notFound = (res) => {
    writeStatusCode(res, 404);
    return;
};

const requestListener = (req, res) => {
    const url = req.url;
    switch (url) {
        case "/200":
            ok(res);
            break;
        case "/500":
            serverError(res);
            break;
        case "/sneezy":
            sneezy(res);
            break;
        default:
            notFound(res);
    }
};

const port = getPort();

http.createServer(requestListener).listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});