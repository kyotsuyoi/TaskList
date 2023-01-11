const listElement = document.querySelector('ul')
const inputElement = document.querySelector('input')

var id = document.getElementById('id')
var sm = document.getElementById('sm')
var description = document.getElementById('description')
var spid = document.getElementById('spid')
var esim = document.getElementById('esim')
var test_eh = document.getElementById('test_eh')
var test_eh = document.getElementById('test_eh')
var lib = document.getElementById('lib')
var object_name = document.getElementById('object_name')

const div_liberations = document.getElementById('div_liberations')
const div_objects = document.getElementById('div_objects')

showTasks()

function buttonHideLib(){
    if (div_liberations.style.display === "none") {
        div_liberations.style.display = 'inline'
    }else{
        div_liberations.style.display = 'none'
    }
}

function buttonHideObjects(){
    if (div_objects.style.display === "none") {
        div_objects.style.display = 'inline'
    }else{
        div_objects.style.display = 'none'
    }
}

function LocalStorageSave(action) {
    switch (action){
        case 1:
            window.localStorage.setItem('temp_lib_list', JSON.stringify(temp_lib_list))
        break

        case 2:
            window.localStorage.setItem('temp_object_list', JSON.stringify(temp_object_list))
        break

        default: //save all
            window.localStorage.setItem('list_tarefas', JSON.stringify(task_list))
    }
    
}

function downloadFile() {
    json_array = {}
    json_array["task_list"] = task_list
    var json_string = JSON.stringify(json_array)
    
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
        var json_task_list = JSON.parse(file.result)
        task_list = json_task_list.task_list
        LocalStorageSave()
        showTasks()
        task_list.length
    }
    file.readAsText(this.files[0])
});

function onlyNumber(evt) {
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

function updateProgress(value) {    
    i = 1
    var elem = document.getElementById("myBar")
    var width = 0
    var id = setInterval(frame, 10)
    function frame() {
        if (width >= value) {
            clearInterval(id)
            i = 0
        } else {
            width++
            elem.style.width = width + "%"
            elem.innerHTML = width + "%"
        }
    }
}

function calculateProgress(){
    var item = task_list[selected_position]
    updateProgress(calc(item))    
}

function calculateTaskProgress(p_selected_position){
    var item = task_list[p_selected_position] 
    return Math.round(calc(item))
}

function calc(item){
    var score_sm = 0
    var score_description = 0
    var score_spid = 0
    var score_esim = 0
    var score_test_eh = 0
    var score_test_prd = 0
    
    var score_lib_ev_anex = 0
    var score_lib_mont_ok = 0
    
    var score_object_eqz = 0
    var score_object_test_act = 0
    var score_object_test_prd = 0

    if(item.sm != null && item.sm != undefined && item.sm != ''){
        score_sm = 1
    }

    if(item.description != null && item.description != undefined && item.description != ''){
        score_description = 1
    }

    if(item.spid != null && item.spid != undefined && item.spid != ''){
        score_spid = 2
    }

    if(item.esim != null && item.esim != undefined && item.esim != ''){
        score_esim = 1
    }

    if(item.test_eh != null && item.test_eh != undefined && item.test_eh != ''){
        score_test_eh = 1
    }

    if(item.test_prd != null && item.test_prd != undefined && item.test_prd != ''){
        score_test_prd = 1
    }

    if((item.lib_list != null && item.lib_list != undefined && item.lib_list != '') && item.lib_list.length > 0){
        item.lib_list.forEach(item => {
            if(item.check_ev_anex){
                score_lib_ev_anex++
            }
            if(item.check_mont_ok){
                score_lib_mont_ok++
            }
        })
        score_lib_ev_anex = (score_lib_ev_anex * 100 / item.lib_list.length)
        score_lib_ev_anex = score_lib_ev_anex*0.13

        score_lib_mont_ok = (score_lib_mont_ok * 100 / item.lib_list.length)
        score_lib_mont_ok = score_lib_mont_ok*0.1
    } 

    if((item.object_list != null && item.object_list != undefined && item.object_list != '') && item.object_list.length > 0){
        item.object_list.forEach(item => {
            if(item.check_eqz){
                score_object_eqz++
            }
            if(item.check_test_act){
                score_object_test_act++
            }
            if(item.check_test_prd){
                score_object_test_prd++
            }
        })
        score_object_eqz = (score_object_eqz * 100 / item.object_list.length)
        score_object_eqz = score_object_eqz*0.3

        score_object_test_act = (score_object_test_act * 100 / item.object_list.length)
        score_object_test_act = score_object_test_act*0.2

        score_object_test_prd = (score_object_test_prd * 100 / item.object_list.length)
        score_object_test_prd = score_object_test_prd*0.2
    } 

    var score_total = score_sm + score_description + score_spid + score_esim + score_test_eh + score_test_prd + 
    score_lib_ev_anex + score_lib_mont_ok +
    score_object_eqz + score_object_test_act + score_object_test_prd 

    return score_total
}
