const table_body = document.getElementById('table_body')
var link_list = JSON.parse(window.localStorage.getItem('link_list'))
var selected_position = -1
var hidePass = true

function showLink() {

    //var type = link_list[selected_position]

    table_body.innerHTML = ''
    if (link_list == null) {
        link_list = new Array()
        return
    }

    link_list.forEach(item => {
        
        const pos = link_list.indexOf(item)
        
        var line = document.createElement("tr")
        var td_id = document.createElement("td")
        var td_desc = document.createElement("td")
        var td_link = document.createElement("td")
        var td_environment = document.createElement("td")
        var td_delete = document.createElement("td")

        var s_description = item["description"]
        if(s_description.length > 30){
            s_description = s_description.substring(0,28)+'...'
        }

        var t_id = document.createTextNode(`${pos}`)
        var t_description = document.createTextNode(s_description)

        // var t_link = document.createTextNode('-->'/*item["passwd"]*/)
        // if(!hidePass){
        //     t_link = document.createTextNode(item["link"])
        // }

        var a = document.createElement('a');
        var linkText = document.createTextNode("LINK")
        a.appendChild(linkText)
        a.title = item["link"]
        a.href = item["link"]
        var t_link = a

        var t_environment= document.createTextNode(item["environment"])

        var el_checklist_delete = document.createElement("img")
        el_checklist_delete.setAttribute("type", "img")
        el_checklist_delete.setAttribute("src", "src/delete_icon.svg")
        el_checklist_delete.setAttribute('onclick', `deleteLink(${pos})`)
        el_checklist_delete.setAttribute('class', 'button_very_small')

        td_id.appendChild(t_id)
        td_desc.appendChild(t_description)
        td_link.appendChild(t_link)
        td_environment.appendChild(t_environment)
        td_delete.appendChild(el_checklist_delete)

        line.appendChild(td_id)
        line.appendChild(td_desc)
        line.appendChild(td_link)
        line.appendChild(td_environment)
        line.appendChild(td_delete) 

        line.setAttribute('onclick', `selectedLink(${pos})`)

        table_body.appendChild(line)

        item=undefined
    })
}

function selectedLink(position){
    var item = link_list[position]

    if (item == undefined) return
    selected_position = position

    description.value = item.description
    link.value = item.link
    combobox_environment.value = item.environment
    
    id.innerText = position
}

function addLink() {
    if (description.value == ""){
        alert("Insira a descrição do link")
        return
    }  

    if (link_list == null) {
        link_list = new Array()
    }

    json_array = {}
    json_array["description"] = description.value
    json_array["link"] = link.value
    json_array["environment"] = combobox_environment.value

    link_list.push(json_array)

    showLink()
    LocalStorageSave(3, link_list)
}

function updateLink(){
    if (description.value == ""){
        alert("Insira a descrição do link")
        return
    }  

    if (selected_position == -1) {
        return
    }

    if (!confirm('Deseja realmente alterar?')) {        
        return
    }

    if (link_list == null) {
        link_list = new Array()
    }

    json_array = {}
    json_array["description"] = description.value
    json_array["link"] = link.value
    json_array["environment"] = combobox_environment.value

    link_list[selected_position] = json_array

    showLink()
    LocalStorageSave(3, link_list)
}

function deleteLink(inner_position) {
    if (inner_position == -1 || inner_position > link_list.length-1) {
        return
    }

    if (!confirm('Deseja realmente remover o item (ID: '+inner_position+')?')) {        
        return
    }

    link_list.splice(inner_position, 1)
    showLink()

    LocalStorageSave(3, link_list)
}

function buttonCopyInfo(){
    link.select()

    var text = ''
    var text_temp = description.value
    text = link.value
    description.value = text
    description.select()
    document.execCommand('copy')
    description.value = text_temp
}

function clearLink(){
    table_body.innerHTML = ''    
    selected_checklist_position = -1

    description.value = '' 
    link.value = '' 
    combobox_environment.value = '' 
}