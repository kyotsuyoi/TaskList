const table_body = document.getElementById('table_body')
var type_list = JSON.parse(window.localStorage.getItem('pass_type_list'))
var selected_position = -1

function showType() {
    table_body.innerHTML = ''
    if (type_list == null) {
        type_list = new Array()
        return
    }

    type_list.forEach(item => {
        
        const pos = type_list.indexOf(item)
        
        var line = document.createElement("tr")
        var td_id = document.createElement("td")
        var td_desc = document.createElement("td")
        var td_environment = document.createElement("td")

        var s_description = item["description"]
        if(s_description.length > 30){
            s_description = s_description.substring(0,28)+'...'
        }

        var t_id = document.createTextNode(`${pos}`)
        var t_description = document.createTextNode(s_description)
        var t_environment = document.createTextNode(item["environment"])

        td_id.appendChild(t_id)
        td_desc.appendChild(t_description)
        td_environment.appendChild(t_environment)

        line.appendChild(td_id)
        line.appendChild(td_desc)
        line.appendChild(td_environment)

        line.setAttribute('onclick', `selectedType(${pos})`)

        table_body.appendChild(line)

        item=undefined
    })
}

function selectedType(position){
    clear()
    var item = type_list[position]

    if (item == undefined) return
    selected_position = position

    description.value = item.description
    combobox_environment.value = item.environment
    
    id.innerText = position

    showPassWD();
}

function addType() {
    if (description.value == ""){
        alert("Insira a descrição")
        return
    }   

    json_array = {}
    json_array["description"] = description.value
    json_array["environment"] = combobox_environment.value

    type_list.push(json_array)

    clear()

    showType()
    LocalStorageSave(2, type_list)
}

function updateType(){
    if (description.value == ""){
        alert("Insira a descrição")
        return
    }  

    if (selected_position == -1) {
        return
    }

    if (!confirm('Deseja realmente alterar?')) {        
        return
    }

    json_array = {}
    json_array["description"] = description.value
    json_array["environment"] = combobox_environment.value

    if(type_list[selected_position].passwd_list == undefined){
        type_list[selected_position]['passwd_list'] = new Array()
    }
    json_array["passwd_list"] = type_list[selected_position].passwd_list

    type_list[selected_position] = json_array

    showType()
    LocalStorageSave(2, type_list)
}

function deleteType() {
    if (selected_position == -1 || selected_position > type_list.length-1) {
        return
    }

    if (!confirm('Deseja realmente remover esta senha (ID: '+selected_position+')?')) {        
        return
    }

    type_list.splice(selected_position, 1)

    clear()
    
    LocalStorageSave(2, type_list)
}
