export function appendHtml({html,parent=document.body,...attr}) {
    var div = document.createElement("DIV");
    div.insertAdjacentHTML('afterbegin', html);
    console.log(Object.keys(attr))
    for (let k of Object.keys(attr)){
        console.log(k)
      div.setAttribute(k, attr[k])
    }
    parent.appendChild(div)
    return div
}