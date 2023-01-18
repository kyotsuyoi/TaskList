const table_lib_body = document.getElementById('table_lib_body')
var selected_lib_position = -1

function showLibs() {

    var task = task_list[selected_position]

    table_lib_body.innerHTML = ''
    if (task.lib_list == null) {
        task.lib_list = new Array()
        return
    }

    task.lib_list.forEach(item => {
        const pos = task.lib_list.indexOf(item)

        var line = document.createElement("tr")
        var td_id = document.createElement("td")
        var td_num = document.createElement("td")
        var td_ev_anex = document.createElement("td")
        var td_mont_ok = document.createElement("td")
        var td_link = document.createElement("td")
        var td_delete = document.createElement("td")

        var t_id = document.createTextNode(`${pos}`)
        var t_num = document.createTextNode(item["num"])
        
        var a = document.createElement('a');
        var linkText = document.createTextNode("LINK")
        a.appendChild(linkText)
        a.title = "LINK"
        a.href = "http://EsimWeb/LiberacaoDetalhe.asmx?sim_num="+esim.value+"&lib_num="+item["num"]
        var t_link = a

        var check_ev_anex = item["check_ev_anex"]
        var el_ev_anex_check = document.createElement("INPUT")
        el_ev_anex_check.setAttribute("type", "checkbox")
        el_ev_anex_check.setAttribute('onclick', `checkLibEvAnex(${pos})`)
        el_ev_anex_check.checked = check_ev_anex   
        
        var check_mont_ok = item["check_mont_ok"]
        var el_mont_ok_check = document.createElement("INPUT")
        el_mont_ok_check.setAttribute("type", "checkbox")
        el_mont_ok_check.setAttribute('onclick', `checkLibMontOK(${pos})`)
        el_mont_ok_check.checked = check_mont_ok 
        
        var el_checklist_delete = document.createElement("img")
        el_checklist_delete.setAttribute("type", "img")
        el_checklist_delete.setAttribute("src", "src/delete_icon.svg")
        el_checklist_delete.setAttribute('onclick', `deleteLib(${pos})`)
        el_checklist_delete.setAttribute('class', 'button_very_small')

        td_id.appendChild(t_id)
        td_num.appendChild(t_num)
        td_ev_anex.appendChild(el_ev_anex_check)
        td_mont_ok.appendChild(el_mont_ok_check)
        td_link.appendChild(t_link)
        td_delete.appendChild(el_checklist_delete)

        line.appendChild(td_id)
        line.appendChild(td_num)
        line.appendChild(td_ev_anex)
        line.appendChild(td_mont_ok)
        line.appendChild(td_link)
        line.appendChild(td_delete)

        line.setAttribute('onclick', `selectedLib(${pos})`)

        table_lib_body.appendChild(line)
    })
}

function selectedLib(position){
    var task = task_list[selected_position]
    var item = task.lib_list[position]

    if (item == undefined) return
    selected_lib_position = position
    lib.value = item.num  
}

function addLib() {
    if (lib.value == ""){
        alert("Insira o número da liberação")
        return
    } 
    
    var task = task_list[selected_position]
    if (task.lib_list == null) {
        task.lib_list = new Array()
    }
    
    json_array = {}
    json_array["num"] = lib.value
    json_array["check_ev_anex"] = false
    json_array["check_mont_ok"] = false

    task.lib_list.push(json_array)

    lib.value = ''

    showLibs()
    calculateProgress()
    LocalStorageSave()
}

function updateObject() {
    if (object_name.value == ""){
        alert("Insira o número da liberação")
        return
    }     

    if (selected_lib_position == -1) {
        return
    }

    if (!confirm('Deseja realmente alterar?')) {        
        return
    }

    var task = task_list[selected_position]
    if (task.lib_list == null) {
        task.lib_list = new Array()
    }
    
    json_array = {}
    json_array["num"] = lib.value
    json_array["check_ev_anex"] = task_list[selected_position].lib_list[selected_object_position].check_ev_anex
    json_array["check_mont_ok"] = task_list[selected_position].lib_list[selected_object_position].check_mont_ok

    task_list[selected_position].lib_list[selected_object_position] = json_array

    checklist_description.value = ''

    showObjects()
    calculateProgress()
    LocalStorageSave()
}

function deleteLib(inner_position) {
    var task = task_list[selected_position]

    if (inner_position == -1 || inner_position > task.lib_list.length-1) {
        return
    }

    if (!confirm('Deseja realmente remover a liberação (ID: '+inner_position+')?')) {        
        return
    }

    task.lib_list.splice(inner_position, 1)
    LocalStorageSave()
    showLibs()

    inner_position = -1

    lib.value = ''
    calculateProgress()
    LocalStorageSave()
}

function checkLibEvAnex(position){
    var task = task_list[selected_position]
    var item = task.lib_list[position]

    var checked = item.check_ev_anex  
    if(checked){
        item.check_ev_anex = false
    }else{
        item.check_ev_anex = true
    }

    task.lib_list[position] = item

    calculateProgress()
    LocalStorageSave()
}

function checkLibMontOK(position){
    var task = task_list[selected_position]
    var item = task.lib_list[position]

    var checked = item.check_mont_ok  
    if(checked){
        item.check_mont_ok = false
    }else{
        item.check_mont_ok = true
    }

    task.lib_list[position] = item

    calculateProgress()
    LocalStorageSave()
}

function libClear(){
    table_lib_body.innerHTML = ''
    selected_lib_position = -1
}