const listElement = document.querySelector('ul')
const inputElement = document.querySelector('input')

const table_body = document.getElementById('table_body')
var id = document.getElementById('id')
var sm = document.getElementById('sm')
var description = document.getElementById('description')
var spid = document.getElementById('spid')
var esim = document.getElementById('esim')
var liberations = document.getElementById('liberations')

var task_list = JSON.parse(window.localStorage.getItem('list_tarefas'))

var selected_position = -1

showTasks()

function showTasks() {

    table_body.innerHTML = ''

    for (item of task_list) {

        array_item = JSON.parse(item)

        const pos = task_list.indexOf(item)

        // const buttonRemove = document.createElement('button')
        // buttonRemove.setAttribute('class', 'material-icons')
        // const linkText = document.createTextNode('X')
        // buttonRemove.appendChild(linkText)
        // buttonRemove.setAttribute('onclick', `removeTask(${pos})`)

        var line = document.createElement("tr")
        var td_id = document.createElement("td")
        var td_sm = document.createElement("td")
        var td_desc = document.createElement("td")
        var td_spid = document.createElement("td")
        var td_esim = document.createElement("td")
        var td_liberations = document.createElement("td")
        // var td_buttonRemove = document.createElement("td")

        var t_id = document.createTextNode(`${pos}`)
        var t_sm = document.createTextNode(array_item["sm"])
        var t_description = document.createTextNode(array_item["description"])
        var t_spid = document.createTextNode(array_item["spid"])
        var t_esim = document.createTextNode(array_item["esim"])
        var t_liberations = document.createTextNode(array_item["liberations"])

        td_id.appendChild(t_id)
        td_sm.appendChild(t_sm)
        td_desc.appendChild(t_description)
        td_spid.appendChild(t_spid)
        td_esim.appendChild(t_esim)
        td_liberations.appendChild(t_liberations)
        // td_buttonRemove.appendChild(buttonRemove)

        line.appendChild(td_id)
        line.appendChild(td_sm)
        line.appendChild(td_desc)
        line.appendChild(td_spid)
        line.appendChild(td_esim)
        line.appendChild(td_liberations)

        // line.appendChild(td_buttonRemove)
        line.setAttribute('onclick', `selectedTask(${pos})`)

        table_body.appendChild(line)
    }
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
    json_array["liberations"] = liberations.value

    var json = JSON.stringify(json_array)

    task_list.push(json)

    //json = Object.assign({}, json_array)
    id.value = ""
    sm.value = ''
    description.value = ''
    spid.value = ''
    esim.value = ''
    liberations.value = ''

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
    json_array["liberations"] = liberations.value

    var json = JSON.stringify(json_array)

    task_list[selected_position] = json

    showTasks()
    LocalStorageSave()
}

function selectedTask(position){
    var item = JSON.parse(task_list[position])

    selected_position = position

    sm.value = item.sm
    description.value = item.description
    spid.value = item.spid
    esim.value = item.esim
    liberations.value = item.liberations

    id.innerText = position
}

function deleteTask() {
    if (selected_position == -1 || selected_position > task_list.length-1) {
        return
    }

    task_list.splice(selected_position, 1)
    LocalStorageSave()
    showTasks()

    selected_position = -1

    id.innerText = ""
    sm.value = ''
    description.value = ''
    spid.value = ''
    esim.value = ''
    liberations.value = ''
}

function LocalStorageSave() {
    window.localStorage.setItem('list_tarefas', JSON.stringify(task_list))
}

function downloadFile() {
    var json_string = JSON.stringify(task_list)
    
    var date = new Date()
    var day = date.getDate();              // 1-31
    //var day_week = date.getDay();        // 0-6 (zero=domingo)
    var month = date.getMonth();           // 0-11 (zero=janeiro)
    //var year_2 = date.getYear();         // 2 dígitos
    var year_4 = date.getFullYear();       // 4 dígitos
    var hour = date.getHours();            // 0-23
    var min = date.getMinutes();           // 0-59
    var sec = date.getSeconds();           // 0-59
    //var msec = date.getMilliseconds();   // 0-999
    //var tz = date.getTimezoneOffset();   // em minutos

    var str_date = year_4 + '-' + doubleDigit((month+1)) + '-' + doubleDigit(day);
    var str_time = doubleDigit(hour) + '-' + doubleDigit(min) + '-' + doubleDigit(sec);

    let file_name = "tasks_" + str_date + "_" + str_time;
    let blob = new Blob([json_string], { type: "text/plain;charset=utf-8" });
    saveAs(blob, file_name + ".txt");
}

document.getElementById('inputFile').addEventListener('change', function() {
    var file = new FileReader()
    file.onload = () => {    
        task_list = JSON.parse(file.result)
        LocalStorageSave()
        showTasks()
    }
    file.readAsText(this.files[0])
});

function onlynumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
       theEvent.returnValue = false;
       if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function doubleDigit(number){
    if (number < 9){
        return "0"+number
    }else{
        return number
    }
}
