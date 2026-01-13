const table_body = document.getElementById('table_body')
var task_list = JSON.parse(window.localStorage.getItem('list_tarefas'))
var selected_position = -1

function showTasks() {
    if (selected_month == '') return

    table_body.innerHTML = ''
    if (task_list == null) {
        task_list = new Array()
        return
    }

    task_list.forEach(item => {
        
        const pos = task_list.indexOf(item)
        
        if(item['year'] == undefined){
            alert('Item '+ item.sm + ' sem ano definido, inserindo ao ano ' + selected_year)

            json_array = {}
            json_array["year"] = selected_year
            json_array["month"] = item['month']
            json_array["sm"] = item['sm']
            json_array["description"] = item['description']
            json_array["spid"] = item['spid']
            json_array["esim"] = item['esim']
            json_array["test_eh"] = item['test_eh']
            json_array["test_prd"] = item['test_prd'] 
            json_array["textarea_notes"] = item['textarea_notes']

            json_array["lib_list"] = item['lib_list']
            json_array["object_list"] = item['object_list']
            json_array["checklist_list"] = item['checklist_list']

            task_list[pos] = json_array
            LocalStorageSave(null, task_list)
        }

        if(item['month'] == undefined){
            alert('Item '+ item.sm + ' sem mês definido, inserindo ao mês ' + selected_month)
            task_list[pos]['month'] = selected_month    

            json_array = {}
            json_array["year"] = item['year']
            json_array["month"] = selected_month
            json_array["sm"] = item['sm']
            json_array["description"] = item['description']
            json_array["spid"] = item['spid']
            json_array["esim"] = item['esim']
            json_array["test_eh"] = item['test_eh']
            json_array["test_prd"] = item['test_prd'] 
            json_array["textarea_notes"] = item['textarea_notes']

            json_array["lib_list"] = item['lib_list']
            json_array["object_list"] = item['object_list']
            json_array["checklist_list"] = item['checklist_list']

            task_list[pos] = json_array
            LocalStorageSave(null, task_list)
        }

        if(item.month != selected_month || item.year != selected_year) return

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
        a.href = "https://hdi.atlassian.net/jira/servicedesk/projects/LBASBT/queues/issue/"+item.sm
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

        item=undefined
    })
}

function selectedTask(position){
    clear()
    var item = task_list[position]

    if (item == undefined) return
    selected_position = position

    sm.value = item.sm
    description.value = item.description
    spid.value = item.spid
    esim.value = item.esim
    test_eh.value = item.test_eh
    test_prd.value = item.test_prd
    textarea_notes.value = item.textarea_notes
    
    id.innerText = position
    showLibs()
    showObjects()
    showChecklist()

    calculateProgress()
}

function addTask() {
    if (sm.value == "" || description.value == ""){
        alert("Insira o número e descrição da SM/Chamado")
        return
    }   

    if(selected_year == ''){
        alert("Selecione o ano")
        return
    }

    if(selected_month == ''){
        alert("Selecione o mês")
        return
    }

    json_array = {}
    json_array["year"] = selected_year
    json_array["month"] = selected_month
    json_array["sm"] = sm.value
    json_array["description"] = description.value
    json_array["spid"] = spid.value
    json_array["esim"] = esim.value
    json_array["test_eh"] = test_eh.value
    json_array["test_prd"] = test_prd.value
    json_array["textarea_notes"] = textarea_notes.value

    json_array["lib_list"] = new Array()
    json_array["object_list"] = new Array()
    json_array["checklist_list"] = new Array()

    task_list.push(json_array)

    clear()

    showTasks()
    LocalStorageSave(null, task_list)
}

function updateTask(){
    if (sm.value == "" || description.value == ""){
        alert("Insira o número e descrição da SM/Chamado")
        return
    }  

    if(selected_year == ''){
        alert("Selecione o ano")
        return
    }

    if(selected_month == ''){
        alert("Selecione o mês")
        return
    }

    if (selected_position == -1) {
        return
    }

    if (!confirm('Deseja realmente alterar?')) {        
        return
    }

    json_array = {}
    json_array["year"] = selected_year
    json_array["month"] = selected_month
    json_array["sm"] = sm.value
    json_array["description"] = description.value
    json_array["spid"] = spid.value
    json_array["esim"] = esim.value
    json_array["test_eh"] = test_eh.value
    json_array["test_prd"] = test_prd.value    
    json_array["textarea_notes"] = textarea_notes.value

    if(task_list[selected_position].lib_list == undefined){
        task_list[selected_position]['lib_list'] = new Array()
    }
    if(task_list[selected_position].object_list == undefined){
        task_list[selected_position]['object_list'] = new Array()
    }
    if(task_list[selected_position].checklist_list == undefined){
        task_list[selected_position]['checklist_list'] = new Array()
    }
    json_array["lib_list"] = task_list[selected_position].lib_list
    json_array["object_list"] = task_list[selected_position].object_list
    json_array["checklist_list"] = task_list[selected_position].checklist_list

    task_list[selected_position] = json_array

    showTasks()
    LocalStorageSave(null, task_list)
    calculateProgress()
}

function deleteTask() {
    if (selected_position == -1 || selected_position > task_list.length-1) {
        return
    }

    if (!confirm('Deseja realmente remover a tarefa (ID: '+selected_position+')?')) {        
        return
    }

    task_list.splice(selected_position, 1)

    clear()
    
    LocalStorageSave(null, task_list)
    showTasks()
}

function upTask() {
    if (selected_position < 0 || selected_position == undefined) {
        return
    }

    var json_months = getNextAndPreviousMonth(selected_month)
    if(json_months.previous == undefined) return

    if(json_months.previous == "PVY"){
        var previous_year = Number(task_list[selected_position].year)-1
        if (!confirm('Deseja realmente mover a tarefa (ID: '+selected_position+') para o ano anterior ('+ previous_year +')?')) {        
            return
        }
        task_list[selected_position].year = previous_year
        task_list[selected_position].month = 'DEZ'
    }else{
        if (!confirm('Deseja realmente mover a tarefa (ID: '+selected_position+') para o mês anterior ('+ json_months.previous +')?')) {        
            return
        }
        task_list[selected_position].month = json_months.previous
    }

    clear()
    calculateProgress()
    LocalStorageSave(null, task_list)
    showTasks()
}

function downTask() {
    if (selected_position < 0 || selected_position == undefined) {
        return
    }

    var json_months = getNextAndPreviousMonth(selected_month)
    if(json_months.next == undefined) return

    if(json_months.next == "NXY"){
        var next_year = Number(task_list[selected_position].year)+1
        if (!confirm('Deseja realmente mover a tarefa (ID: '+selected_position+') para o próximo ano ('+ next_year +')?')) {        
            return
        }
        task_list[selected_position].year = next_year
        task_list[selected_position].month = 'JAN'
    }else{
        if (!confirm('Deseja realmente mover a tarefa (ID: '+selected_position+') para o próximo mês ('+ json_months.next +')?')) {        
            return
        }
        task_list[selected_position].month = json_months.next
    }
    clear()
    calculateProgress()
    LocalStorageSave(null, task_list)
    showTasks()
}

function taskClear(){
    selected_position = -1
}