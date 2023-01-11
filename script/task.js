const table_body = document.getElementById('table_body')
var task_list = JSON.parse(window.localStorage.getItem('list_tarefas'))
var selected_position = -1

function showTasks() {

    table_body.innerHTML = ''
    if (task_list == null) {
        task_list = new Array()
        return
    }

    task_list.forEach(item => {
        const pos = task_list.indexOf(item)

        var line = document.createElement("tr")
        var td_id = document.createElement("td")
        var td_sm = document.createElement("td")
        var td_desc = document.createElement("td")
        var td_spid = document.createElement("td")
        var td_esim = document.createElement("td")
        var td_test_eh = document.createElement("td")
        var td_test_prd = document.createElement("td")
        var td_progress = document.createElement("td")
        var td_link = document.createElement("td")

        var s_description = item["description"]
        if(s_description.length > 30){
            s_description = s_description.substring(0,28)+'...'
        }

        var t_id = document.createTextNode(`${pos}`)
        var t_sm = document.createTextNode(item["sm"])
        var t_description = document.createTextNode(s_description)
        var t_spid = document.createTextNode(item["spid"])
        var t_esim = document.createTextNode(item["esim"])
        var t_test_eh = document.createTextNode(item["test_eh"])
        var t_test_prd = document.createTextNode(item["test_prd"])
        var t_progress = document.createTextNode(calculateTaskProgress(`${pos}`)+"%")

        var a = document.createElement('a');
        var linkText = document.createTextNode("LINK")
        a.appendChild(linkText)
        a.title = "LINK"
        a.href = "https://forge/"+item.sm
        var t_link = a

        td_id.appendChild(t_id)
        td_sm.appendChild(t_sm)
        td_desc.appendChild(t_description)
        td_spid.appendChild(t_spid)
        td_esim.appendChild(t_esim)
        td_test_eh.appendChild(t_test_eh)
        td_test_prd.appendChild(t_test_prd)
        td_progress.appendChild(t_progress)
        td_link.appendChild(t_link)

        line.appendChild(td_id)
        line.appendChild(td_sm)
        line.appendChild(td_desc)
        line.appendChild(td_spid)
        line.appendChild(td_esim)
        // line.appendChild(td_test_eh)
        // line.appendChild(td_test_prd)
        line.appendChild(td_progress)
        line.appendChild(td_link)

        line.setAttribute('onclick', `selectedTask(${pos})`)

        table_body.appendChild(line)
    })
}

function selectedTask(position){
    var item = task_list[position]

    selected_position = position

    sm.value = item.sm
    description.value = item.description
    spid.value = item.spid
    esim.value = item.esim
    test_eh.value = item.test_eh
    test_prd.value = item.test_prd
    
    temp_lib_list = item.lib_list
    temp_object_list = item.object_list

    LocalStorageSave(1)
    LocalStorageSave(2)

    id.innerText = position
    showLibs()
    showObjects()

    calculateProgress()
}

function addTask() {
    if (sm.value == "" || description.value == ""){
        alert("Insira o número e descrição da SM")
        return
    }    

    json_array = {}
    json_array["sm"] = sm.value
    json_array["description"] = description.value
    json_array["spid"] = spid.value
    json_array["esim"] = esim.value
    json_array["test_eh"] = test_eh.value
    json_array["test_prd"] = test_prd.value

    json_array["lib_list"] = temp_lib_list
    json_array["object_list"] = temp_object_list

    task_list.push(json_array)

    id.value = ""
    sm.value = ''
    description.value = ''
    spid.value = ''
    esim.value = ''
    test_eh.value = ''
    test_prd.value = ''
    lib.value = ''
    object_name.value = ''

    showTasks()
    LocalStorageSave()
}

function updateTask(){
    if (sm.value == "" || description.value == ""){
        alert("Insira o número e descrição da SM")
        return
    }  

    if (selected_position == -1) {
        return
    }

    json_array = {}
    json_array["sm"] = sm.value
    json_array["description"] = description.value
    json_array["spid"] = spid.value
    json_array["esim"] = esim.value
    json_array["test_eh"] = test_eh.value
    json_array["test_prd"] = test_prd.value

    json_array["lib_list"] = temp_lib_list
    json_array["object_list"] = temp_object_list

    task_list[selected_position] = json_array

    showTasks()
    LocalStorageSave()
    calculateProgress()
    
    alert('Tarefa alterada')
}

function deleteTask() {
    if (selected_position == -1 || selected_position > task_list.length-1) {
        return
    }

    task_list.splice(selected_position, 1)

    selected_position = -1
    selected_lib_position = -1
    selected_object_position = -1

    temp_lib_list = new Array()
    temp_object_list = new Array()

    id.innerText = ""
    sm.value = ''
    description.value = ''
    spid.value = ''
    esim.value = ''
    lib.value = ''
    lib.value = ''
    object_name.value = ''
    
    LocalStorageSave()
    showTasks()

    alert('Tarefa removida')
}