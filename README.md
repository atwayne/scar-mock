# sneezy
[![sneezy-mock-api][npm-image]][npm-url]

[npm-url]: https://www.npmjs.com/package/sneezy-mock-api
[npm-image]: http://img.shields.io/npm/v/sneezy-mock-api.svg?style=flat-square


Sneezy is a mock API server for testing purposees. Run `sneezy` and get whatever response you want.

## Install

```
npm install -g sneezy-mock-api
```

## Usage

-  Start the mock server on default port 9000

    ```
    sneezy
    ```
 - Or if the port is being used by another process, use the command below to run it on a different port

    ```
    sneezy --port 9001
    ```
 - <kbd>Ctrl</kbd> + <kbd>C</kbd> to exit
## API

-   `http://localhost:9000/200`  
Returns HTTP Status Code 200
-   `http://localhost:9000/500`  
Returns HTTP Status Code 500
-   `http://localhost:9000/sneezy`  
Returns HTTP 200 for most of the time. One in 10 times it returns 500
-   Anything else gets an HTTP 404 response
