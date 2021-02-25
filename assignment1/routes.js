const requestHandler = (req, res) => {
  const { url, method } = req;

  if (url === '/' && method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Welcome</title></head>');
    res.write('<body>');
    res.write('<h1>Hello, welcome to the page</h1>');
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='username' /><button type='submit'>Submit</button></form>"
    );
    res.write('</body >');
    res.write('</html>');

    return res.end();
  }

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Users</title></head>');
    res.write('<body>');
    res.write('<h1>Users</h1>');
    res.write('<ul>');
    res.write('<li>user1</li>');
    res.write('<li>user2</li>');
    res.write('</ul>');
    res.write('</body >');
    res.write('</html>');

    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();

      console.log(`new user: ${parsedBody.split('=')[1]}`);

      res.statusCode = 302;
      res.setHeader('Location', '/');
      
      return res.end();
    });
  }
};

module.exports = requestHandler;
