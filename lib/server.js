const contentType = "application/json; charset=utf-8";

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

const log = (req) => {
    const now = new Date();
    const message = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${req.method}\t    ${req.url}`;
    console.log(message);
};

const requestListener = (req, res) => {
    log(req);
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

exports.requestListener = requestListener;