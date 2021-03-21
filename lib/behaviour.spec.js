const {
  echo, notFound, sneezy, serverError, ok,
} = require('./behaviour');

test('notFound should set statusCode 404', () => {
  // Arrange
  const expectedStatusCode = 404;
  const expectedBody = JSON.stringify({ status: expectedStatusCode });
  const res = { writeHead: jest.fn(), write: jest.fn(), end: jest.fn() };

  // Act
  notFound(res);

  // Assert
  expect(res.writeHead.mock.calls.length).toBe(1);
  expect(res.writeHead.mock.calls[0][0]).toBe(expectedStatusCode);
  expect(res.write.mock.calls.length).toBe(1);
  expect(res.write.mock.calls[0][0]).toBe(expectedBody);
  expect(res.end.mock.calls.length).toBe(1);
});

test('ok should set statusCode 200', () => {
  // Arrange
  const expectedStatusCode = 200;
  const expectedBody = JSON.stringify({ status: expectedStatusCode });
  const res = { writeHead: jest.fn(), write: jest.fn(), end: jest.fn() };

  // Act
  ok(res);
  expect(res.writeHead.mock.calls.length).toBe(1);
  expect(res.writeHead.mock.calls[0][0]).toBe(expectedStatusCode);

  // Assert
  expect(res.write.mock.calls.length).toBe(1);
  expect(res.write.mock.calls[0][0]).toBe(expectedBody);
  expect(res.end.mock.calls.length).toBe(1);
});

test('serverError should set statusCode 200', () => {
  // Arrange
  const expectedStatusCode = 500;
  const expectedBody = JSON.stringify({ status: expectedStatusCode });
  const res = { writeHead: jest.fn(), write: jest.fn(), end: jest.fn() };

  // Act
  serverError(res);
  expect(res.writeHead.mock.calls.length).toBe(1);
  expect(res.writeHead.mock.calls[0][0]).toBe(expectedStatusCode);

  // Assert
  expect(res.write.mock.calls.length).toBe(1);
  expect(res.write.mock.calls[0][0]).toBe(expectedBody);
  expect(res.end.mock.calls.length).toBe(1);
});

test('sneezy should set return 200 for given random result', () => {
  // Arrange
  const expectedStatusCode = 200;
  const expectedBody = JSON.stringify({ status: expectedStatusCode });
  const res = { writeHead: jest.fn(), write: jest.fn(), end: jest.fn() };
  jest.spyOn(global.Math, 'random').mockReturnValue(0.2);

  // Act
  sneezy(res);
  expect(res.writeHead.mock.calls.length).toBe(1);
  expect(res.writeHead.mock.calls[0][0]).toBe(expectedStatusCode);

  // Assert
  expect(res.write.mock.calls.length).toBe(1);
  expect(res.write.mock.calls[0][0]).toBe(expectedBody);
  expect(res.end.mock.calls.length).toBe(1);
  jest.spyOn(global.Math, 'random').mockRestore();
});

test('sneezy should set return 500 for given random result', () => {
  // Arrange
  const expectedStatusCode = 500;
  const expectedBody = JSON.stringify({ status: expectedStatusCode });
  const res = { writeHead: jest.fn(), write: jest.fn(), end: jest.fn() };
  jest.spyOn(global.Math, 'random').mockReturnValue(0.1);

  // Act
  sneezy(res);
  expect(res.writeHead.mock.calls.length).toBe(1);
  expect(res.writeHead.mock.calls[0][0]).toBe(expectedStatusCode);

  // Assert
  expect(res.write.mock.calls.length).toBe(1);
  expect(res.write.mock.calls[0][0]).toBe(expectedBody);
  expect(res.end.mock.calls.length).toBe(1);
  jest.spyOn(global.Math, 'random').mockRestore();
});

test('echo should return 200 with request body', () => {
  // Arrange
  const expectedStatusCode = 200;
  const expectedBody = JSON.stringify({ title: 'Star Wars' });
  const req = {
    on: jest.fn((action, callback) => {
      switch (action) {
        default:
          return;
        case 'data': {
          const bufffer = Buffer.from(expectedBody, 'utf8');
          callback(bufffer);
          break;
        }
        case 'end': {
          callback();
          break;
        }
      }
    }),
  };
  const res = {
    writeHead: jest.fn(), write: jest.fn(), end: jest.fn(),
  };

  // Act
  echo(req, res);
  expect(res.writeHead.mock.calls.length).toBe(1);
  expect(res.writeHead.mock.calls[0][0]).toBe(expectedStatusCode);

  // Assert
  expect(res.write.mock.calls.length).toBe(1);
  expect(res.write.mock.calls[0][0]).toEqual(expect.stringContaining('Star Wars'));
  expect(res.end.mock.calls.length).toBe(1);
});
