const table_checklist_body = document.getElementById('table_checklist_body')
var selected_checklist_position = -1

function showChecklist() {

    var task = task_list[selected_position]

    table_checklist_body.innerHTML = ''
    if (task.checklist_list == null) {
        task.checklist_list = new Array()
        return
    }

    task.checklist_list.forEach(item => {
        const pos = task.checklist_list.indexOf(item)

        var line = document.createElement("tr")
        var td_id = document.createElement("td")
        var td_description = document.createElement("td")
        var td_check = document.createElement("td")
        var td_delete = document.createElement("td")
        var td_up = document.createElement("td")
        var td_down = document.createElement("td")
        
        var s_description = item["description"]
        if(s_description.length > 60){
            s_description = s_description.substring(0,58)+'...'
        }

        var t_id = document.createTextNode(`${pos}`)
        var t_description = document.createTextNode(s_description)

        var check = item["check"]
        var el_checklist_check = document.createElement("INPUT")
        el_checklist_check.setAttribute("type", "checkbox")
        el_checklist_check.setAttribute('onclick', `checkChecklist(${pos})`)
        el_checklist_check.checked = check   

        var el_checklist_delete = document.createElement("img")
        el_checklist_delete.setAttribute("type", "img")
        el_checklist_delete.setAttribute("src", "src/delete_icon.svg")
        el_checklist_delete.setAttribute('onclick', `deleteChecklist(${pos})`)
        el_checklist_delete.setAttribute('class', 'button_very_small')

        var el_checklist_up = document.createElement("img")
        el_checklist_up.setAttribute("type", "img")
        el_checklist_up.setAttribute("src", "src/arrow-list-up.svg")
        el_checklist_up.setAttribute('onclick', `upChecklist(${pos})`)
        el_checklist_up.setAttribute('class', 'button_very_small')

        var el_checklist_down = document.createElement("img")
        el_checklist_down.setAttribute("type", "img")
        el_checklist_down.setAttribute("src", "src/arrow-list-down.svg")
        el_checklist_down.setAttribute('onclick', `downChecklist(${pos})`)
        el_checklist_down.setAttribute('class', 'button_very_small')

        td_id.appendChild(t_id)
        td_description.appendChild(t_description)
        td_check.appendChild(el_checklist_check)
        td_delete.appendChild(el_checklist_delete)
        td_up.appendChild(el_checklist_up)
        td_down.appendChild(el_checklist_down)

        //line.appendChild(td_id)
        line.appendChild(td_check)  
        line.appendChild(td_description)    
        line.appendChild(td_up) 
        line.appendChild(td_down) 
        line.appendChild(td_delete) 

        line.setAttribute('onclick', `selectedChecklist(${pos})`)

        table_checklist_body.appendChild(line)
    })
}

function selectedChecklist(position){
    var task = task_list[selected_position]
    var item = task.checklist_list[position]

    if (item == undefined) return
    selected_checklist_position = position
    checklist_description.value = item.description  
}

function addChecklist() {
    if (checklist_description.value == ""){
        alert("Insira a descrição do item")
        return
    }  

    var task = task_list[selected_position]
    if (task.checklist_list == null) {
        task.checklist_list = new Array()
    }
    
    json_array = {}
    json_array["description"] = checklist_description.value
    json_array["check"] = false

    task.checklist_list.push(json_array)

    checklist_description.value = ''

    showChecklist()
    calculateProgress()
    LocalStorageSave()
}

function updateChecklist() {
    if (checklist_description.value == ""){
        alert("Insira a descrição do item")
        return
    }     

    if (selected_checklist_position == -1) {
        return
    }

    if (!confirm('Deseja realmente alterar?')) {        
        return
    }

    var task = task_list[selected_position]
    if (task.checklist_list == null) {
        task.checklist_list = new Array()
    }
    
    json_array = {}
    json_array["description"] = checklist_description.value
    json_array["check"] = task_list[selected_position].checklist_list[selected_checklist_position].check

    task_list[selected_position].checklist_list[selected_checklist_position] = json_array

    checklist_description.value = ''

    showChecklist()
    calculateProgress()
    LocalStorageSave()
}

function deleteChecklist() {
    var task = task_list[selected_position]
    if (selected_checklist_position == -1 || selected_checklist_position > task.checklist_list.length-1) {
        return
    }

    if (!confirm('Deseja realmente remover o item (ID: '+selected_checklist_position+')?')) {        
        return
    }

    task.checklist_list.splice(selected_checklist_position, 1)
    showChecklist()

    selected_checklist_position = -1

    lib.value = ''
    calculateProgress()
    LocalStorageSave()
}

function deleteChecklist(inner_position) {
    var task = task_list[selected_position]
    if (inner_position == -1 || inner_position > task.checklist_list.length-1) {
        return
    }

    if (!confirm('Deseja realmente remover o item (ID: '+inner_position+')?')) {        
        return
    }

    task.checklist_list.splice(inner_position, 1)
    showChecklist()

    lib.value = ''
    calculateProgress()
    LocalStorageSave()
}

function checkChecklist(position){
    var task = task_list[selected_position]
    var item = task.checklist_list[position]

    var checked = item.check  
    if(checked){
        item.check = false
    }else{
        item.check = true
    }

    task.checklist_list[position] = item

    calculateProgress()
    LocalStorageSave()
}

function upChecklist(inner_position) {
    if (inner_position == 0) {
        return
    }
    
    json_array = {}
    json_array["description"] = task_list[selected_position].checklist_list[inner_position-1].description
    json_array["check"] = task_list[selected_position].checklist_list[inner_position-1].check

    task_list[selected_position].checklist_list[inner_position-1] = task_list[selected_position].checklist_list[inner_position]
    task_list[selected_position].checklist_list[inner_position] = json_array

    showChecklist()
    calculateProgress()
    LocalStorageSave()
}

function downChecklist(inner_position) {
    if (inner_position >= task_list[selected_position].checklist_list.length-1) {
        return
    }
    
    json_array = {}
    json_array["description"] = task_list[selected_position].checklist_list[inner_position+1].description
    json_array["check"] = task_list[selected_position].checklist_list[inner_position+1].check

    task_list[selected_position].checklist_list[inner_position+1] = task_list[selected_position].checklist_list[inner_position]
    task_list[selected_position].checklist_list[inner_position] = json_array

    showChecklist()
    calculateProgress()
    LocalStorageSave()
}

function clearChecklist(){
    table_checklist_body.innerHTML = ''    
    selected_checklist_position = -1
}
