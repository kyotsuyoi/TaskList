const table_passwdlist_body = document.getElementById('table_passwdlist_body')
var selected_passwd_position = -1
var hidePass = true

function showPassWD() {

    var type = type_list[selected_position]

    table_passwdlist_body.innerHTML = ''
    if (type.passwd_list == null) {
        type.passwd_list = new Array()
        return
    }

    type.passwd_list.forEach(item => {
        
        const pos = type.passwd_list.indexOf(item)
        
        var line = document.createElement("tr")
        var td_id = document.createElement("td")
        var td_desc = document.createElement("td")
        var td_passwd = document.createElement("td")
        var td_delete = document.createElement("td")

        var s_description = item["description"]
        if(s_description.length > 30){
            s_description = s_description.substring(0,28)+'...'
        }

        var t_id = document.createTextNode(`${pos}`)
        var t_description = document.createTextNode(s_description)

        var t_passwd = document.createTextNode('Oculta'/*item["passwd"]*/)
        if(!hidePass){
            t_passwd = document.createTextNode(item["passwd"])
        }

        var el_checklist_delete = document.createElement("img")
        el_checklist_delete.setAttribute("type", "img")
        el_checklist_delete.setAttribute("src", "src/delete_icon.svg")
        el_checklist_delete.setAttribute('onclick', `deletePassWD(${pos})`)
        el_checklist_delete.setAttribute('class', 'button_very_small')

        td_id.appendChild(t_id)
        td_desc.appendChild(t_description)
        td_passwd.appendChild(t_passwd)
        td_delete.appendChild(el_checklist_delete)

        line.appendChild(td_id)
        line.appendChild(td_desc)
        line.appendChild(td_passwd)
        line.appendChild(td_delete) 

        line.setAttribute('onclick', `selectedPassWD(${pos})`)

        table_passwdlist_body.appendChild(line)

        item=undefined
    })
}

function selectedPassWD(position){
    var type = type_list[selected_position]
    var item = type.passwd_list[position]

    if (item == undefined) return
    selected_passwd_position = position

    passwdlist_description.value = item.description
    passwdlist_passwd.value = item.passwd
    
    id.innerText = position

    //alert(item.passwd)
}

function addPassWD() {
    if (passwdlist_description.value == ""){
        alert("Insira a descrição da senha")
        return
    }  
    
    if (selected_position == -1) {
        alert("Crie um tipo ou selecione um existente")
        return
    }

    var type = type_list[selected_position]
    if (type.passwd_list == null) {
        type.passwd_list = new Array()
    }

    json_array = {}
    json_array["description"] = passwdlist_description.value
    json_array["passwd"] = passwdlist_passwd.value

    type.passwd_list.push(json_array)

    showPassWD()
    LocalStorageSave(2, type_list)
}

function updatePassWD(){
    if (description.value == ""){
        alert("Insira a descrição da senha")
        return
    }  

    if (selected_passwd_position == -1) {
        return
    }

    if (!confirm('Deseja realmente alterar?')) {        
        return
    }

    var type = type_list[selected_position]
    if (type.passwd_list == null) {
        type.passwd_list = new Array()
    }

    json_array = {}
    json_array["description"] = passwdlist_description.value
    json_array["passwd"] = passwdlist_passwd.value

    type_list[selected_position].passwd_list[selected_passwd_position] = json_array

    showPassWD()
    LocalStorageSave(2, type_list)
}

// function deletePassWD() {
//     if (selected_position == -1 || selected_position > task_list.length-1) {
//         return
//     }

//     if (!confirm('Deseja realmente remover esta senha (ID: '+selected_position+')?')) {        
//         return
//     }

//     passwd_list.splice(selected_position, 1)
    
//     LocalStorageSave(2, passwd_list)
// }

function deletePassWD(inner_position) {
    var type = type_list[selected_position]
    if (inner_position == -1 || inner_position > type.passwd_list.length-1) {
        return
    }

    if (!confirm('Deseja realmente remover o item (ID: '+inner_position+')?')) {        
        return
    }

    type.passwd_list.splice(inner_position, 1)
    showPassWD()

    LocalStorageSave(2, type_list)
}

function buttonCopyInfo(){
    passwdlist_passwd.select()

    var text = ''
    var text_temp = passwdlist_description.value
    text = passwdlist_passwd.value
    passwdlist_description.value = text
    passwdlist_description.select()
    document.execCommand('copy')
    passwdlist_description.value = text_temp
}

function clearPassWD(){
    table_passwdlist_body.innerHTML = ''    
    selected_checklist_position = -1

    passwdlist_description.value = '' 
    passwdlist_passwd.value = '' 
}