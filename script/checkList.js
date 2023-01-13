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

        td_id.appendChild(t_id)
        td_description.appendChild(t_description)
        td_check.appendChild(el_checklist_check)

        //line.appendChild(td_id)
        line.appendChild(td_check)  
        line.appendChild(td_description)    

        line.setAttribute('onclick', `selectedChecklist(${pos})`)

        table_checklist_body.appendChild(line)
    })
}

function selectedChecklist(position){
    var task = task_list[selected_position]
    var item = task.checklist_list[position]

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
}

function deleteChecklist() {
    var task = task_list[selected_position]
    if (selected_checklist_position == -1 || selected_checklist_position > task.checklist_list.length-1) {
        return
    }

    task.checklist_list.splice(selected_checklist_position, 1)
    showChecklist()

    selected_checklist_position = -1

    lib.value = ''
    calculateProgress()
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
}

function clearChecklist(){
    table_checklist_body.innerHTML = ''    
    selected_checklist_position = -1
}
