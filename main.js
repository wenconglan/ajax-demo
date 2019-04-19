
//下面的代码为封装的AJAX函数
window.$ = window.jQuery
window.jQuery = function(nodeOrSelector) {
  let nodes = {
    0:nodeOrSelector,
    length:1
  }
  nodes.addClass = function(classes){
    for(let key in classes){ //classes = {'class1':ture,'class2':false,'class3':true}
      let value = classes[key]
      if(value){
        node.classList.add(key)
      }else{
        node.classList.remove(key)
      }
    }
  }
  return nodes
  }
window.jQuery.ajax = function({url,method,body,headers}){
  return new Promise (function(resolve,reject){
    let request = new XMLHttpRequest()
  request.open(method, url)
  for(let key in headers){
    let value = headers[key]
    request.setRequestHeader(key,value)
  }
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        resolve.call(undefined,request.responseText)
      } else if (request.status >= 400) {
        reject.call(undefined,request)
      }
    }
  }
  request.send(body)
  })
}

button.addEventListener('click', e => {
  window.jQuery.ajax.call(undefined, {
      url: '/xxx',
      method: 'post',
      data: 'name=logan&&password=112233',
      headers: {
        'content-type': 'application/x-www-form-urlenconded',
        frank: '18'
      }
    }).then(
      xxx => {
        console.log(xxx)
      },
      yyy => {
        console.log(yyy)
        console.log(yyy.status)
        console.log(yyy.responseText)
      }
    )
})
