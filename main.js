/*
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
window.jQuery.ajax = function({url,method,body,success,fail,headers}){
  let request = new XMLHttpRequest()
  request.open(method, url)
  for(let key in headers){
    let value = headers[key]
    request.setRequestHeader(key,value)
  }
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        success.call(undefined,request.responseText)
      } else if (request.status >= 400) {
        fail.call(undefined,request)
      }
    }
  }
  request.send(body)

}*/
/*function success(responseText) {
  console.log(responseText)
}
function fail(request) {
  console.log(request)
  console.log(request.status)
  console.log(request.responseText)
}*/

button.addEventListener('click', e => {
  window.jQuery.ajax
    .call(undefined, {
      url: '/xxx',
      method: 'post',
      data: 'name=logan&&password=112233',
      headers: {
        'content-type': 'application/x-www-form-urlenconded',
        frank: '18'
      }
    })
    .then(
      responseText => {
        console.log(responseText)
      },
      request => {
        console.log(request)
        console.log(request.status)
        console.log(request.responseText)
      }
    )
})
