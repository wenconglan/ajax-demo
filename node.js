var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  if (path === '/') {
    let string = fs.readFileSync('./index.html', 'utf-8')
    let cookies = request.headers.cookie.split('; ')
    let hash = {}
    for (let i = 0; i < cookies.length; i++) {
      let parts = cookies[i].split('=')
      let key = parts[0]
      hash[key] = parts[1]
    }
    let email = hash.sign_in_email
    let users = fs.readFileSync('./db1/users', 'utf8')
    users = JSON.parse(users)
    let foundUser
    for (let i=0;i<users.length;i++){
      if(users[i].email === email){
        foundUser = users[i]
        break
      }
    }
    if(foundUser){
      string = string.replace('__password__',foundUser.password)
    }else{
      string = string.replace('__password__','未登录')
    }
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_up' && method === 'GET') {
    let string = fs.readFileSync('./sign_up.html', 'utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_up' && method === 'POST') {
    readBody(request).then(body => {
      let strings = body.split('&') //以&作为分割点分割
      let hash = {}
      strings.forEach(element => {
        let parts = element.split('=') ////以=作为分割点分割
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
      })
      let { email, password, password_confirmation } = hash
      if (email.indexOf('@') === -1) {
        response.statusCode = 400
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write(`{
          "errors":{"email":"invalid"}
        }`)
      } else if (password !== password_confirmation) {
        response.statusCode = 400
        response.write('password not match')
      } else {
        let users = fs.readFileSync('./db1/users', 'utf8')
        try {
          users = JSON.parse(users)
        } catch (exception) {
          users = []
        }
        let inUse = false
        for (let i = 0; i < users.length; i++) {
          let user = users[i]
          if (user.email === email) {
            inUse = true
            break
          }
        }
        if (inUse) {
          response.statusCode = 400
          response.write('email in use')
        } else {
          users.push({ email: email, password: password })
          let usersToString = JSON.stringify(users)
          fs.writeFileSync('./db1/users', usersToString)
          response.statusCode = 200
        }
      }
      response.end()
    })
  } else if (path === '/sign_in' && method === 'GET') {
    let string = fs.readFileSync('./sign_in.html', 'utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_in' && method === 'POST') {
    readBody(request).then(body => {
      let strings = body.split('&') //以&作为分割点分割
      let hash = {}
      strings.forEach(element => {
        let parts = element.split('=') ////以=作为分割点分割
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
      })
      let { email, password } = hash
      let users = fs.readFileSync('./db1/users', 'utf8')
      try {
        users = JSON.parse(users)
      } catch (exception) {
        users = []
      }
      let found
      for (let i = 0; i < users.length; i++) {
        let user = users[i]
        if (user.email === email && user.password === password) {
          found = true
          break
        }
      }
      if (found) {
        response.setHeader('Set-Cookie', `sign_in_email=${email}`)
        response.statusCode = 200
      } else {
        response.statusCode = 401
      }
      response.end()
    })
  } else if (path === '/style.css') {
    let string = fs.readFileSync('./style.css', 'utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/main.js') {
    let string = fs.readFileSync('./main.js', 'utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/javascript')
    response.write(string)
    response.end()
  } else if (path === '/jquery-3.3.1.min.js') {
    let string = fs.readFileSync('./jquery-3.3.1.min.js', 'utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/javascript')
    response.write(string)
    response.end()
  } else if (path === '/form.js') {
    let string = fs.readFileSync('./form.js', 'utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/javascript')
    response.write(string)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('{"error":"not found"}')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = []
    request
      .on('data', chunk => {
        body.push(chunk)
      })
      .on('end', () => {
        body = Buffer.concat(body).toString()
        resolve(body)
      })
  })
}

server.listen(port)
console.log(
  '监听 ' +
    port +
    ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' +
    port
)
