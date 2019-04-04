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
window.jQuery.ajax = function(url,method,body,success,fail){
  let request = new XMLHttpRequest()
  request.open(method, url)
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
}

//下面的代码为封装的AJAX函数的调用
button.addEventListener('click', e => {
  window.jQuery.ajax.call(undefined,'/xxx','post','name=logan&&password=112233',(yyy)=>{console.log(yyy)},(xxx)=>{console.log(xxx)})
})
