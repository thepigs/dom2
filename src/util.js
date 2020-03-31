export function appendHtml(html, attr) {
    var div = document.createElement("DIV");
    if (attr) for (let k of Object.keys(attr))
        div.setAttribute(k, attr[k])
    div.insertAdjacentHTML('afterbegin', html);
    document.body.appendChild(div)
    return div
}