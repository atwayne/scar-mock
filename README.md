# sneezy
Sneezy is an unstable mock server for testing purpose.

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
## API

-   `http://localhost:9000/200`  
Returns HTTP Status Code 200
-   `http://localhost:9000/500`  
Returns HTTP Status Code 500
-   `http://localhost:9000/sneezy`  
Returns HTTP 200 for most of the time. One in 10 times it returns 500