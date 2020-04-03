export function appendHtml({html,parent=document.body,...attr}) {
    var div = document.createElement("DIV");
    div.insertAdjacentHTML('afterbegin', html);
    for (let [k,v] of attr)
      div.setAttribute(k, v)
    parent.appendChild(div)
    return div
}