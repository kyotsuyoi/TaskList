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
const div_checklist = document.getElementById('div_checklist')

const combobox_month = document.getElementById('combobox_month')

var selected_month = JSON.parse(window.localStorage.getItem('selected_month'))

//showTasks()
setComboMonthOptions()

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

function buttonHideChecklist(){
    if (div_checklist.style.display === "none") {
        div_checklist.style.display = 'inline'
    }else{
        div_checklist.style.display = 'none'
    }
}

function LocalStorageSave(action) {
    switch (action){
        case 1:
            window.localStorage.setItem('selected_month', JSON.stringify(selected_month))
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
    var v_id = setInterval(frame, 10)
    function frame() {
        if (width >= value) {
            clearInterval(v_id)
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
    if(item == undefined) return 0
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
    
    var score_checklist_check = 0

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
        score_lib_ev_anex = score_lib_ev_anex*0.10

        score_lib_mont_ok = (score_lib_mont_ok * 100 / item.lib_list.length)
        score_lib_mont_ok = score_lib_mont_ok*0.10
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
        score_object_test_act = score_object_test_act*0.17

        score_object_test_prd = (score_object_test_prd * 100 / item.object_list.length)
        score_object_test_prd = score_object_test_prd*0.17
    } 

    if((item.checklist_list != null && item.checklist_list != undefined && item.checklist_list != '') && item.checklist_list.length > 0){
        item.checklist_list.forEach(item => {
            if(item.check){
                score_checklist_check++
            }
        })
        score_checklist_check = (score_checklist_check * 100 / item.checklist_list.length)
        score_checklist_check = score_checklist_check*0.09
    }else{
        score_checklist_check = 9
    }

    var score_total = score_sm + score_description + score_spid + score_esim + score_test_eh + score_test_prd + 
    score_lib_ev_anex + score_lib_mont_ok +
    score_object_eqz + score_object_test_act + score_object_test_prd + score_checklist_check

    return score_total
}

function buttonCopyInfo(){
    var text = ''
    var text_temp = sm.value
    text = sm.value + ' - ' + description.value
    sm.value = text
    sm.select()
    document.execCommand('copy')
    sm.value = text_temp
}

function setComboMonthOptions(){
    var JAN = document.createElement('option')
    JAN.text = 'JAN'
    JAN.value = 'JAN'
    combobox_month.add(JAN)

    var FEV = document.createElement('option')
    FEV.text = 'FEV'
    FEV.value = 'FEV'
    combobox_month.add(FEV)

    var MAR = document.createElement('option')
    MAR.text = 'MAR'
    MAR.value = 'MAR'
    combobox_month.add(MAR)

    var ABR = document.createElement('option')
    ABR.text = 'ABR'
    ABR.value = 'ABR'
    combobox_month.add(ABR)

    var MAI = document.createElement('option')
    MAI.text = 'MAI'
    MAI.value = 'MAI'
    combobox_month.add(MAI)

    var JUN = document.createElement('option')
    JUN.text = 'JUN'
    JUN.value = 'JUN'
    combobox_month.add(JUN)

    var JUL = document.createElement('option')
    JUL.text = 'JUL'
    JUL.value = 'JUL'
    combobox_month.add(JUL)

    var AGO = document.createElement('option')
    AGO.text = 'AGO'
    AGO.value = 'AGO'
    combobox_month.add(AGO)

    var SET = document.createElement('option')
    SET.text = 'SET'
    SET.value = 'SET'
    combobox_month.add(SET)

    var OUT = document.createElement('option')
    OUT.text = 'OUT'
    OUT.value = 'OUT'
    combobox_month.add(OUT)

    var NOV = document.createElement('option')
    NOV.text = 'NOV'
    NOV.value = 'NOV'
    combobox_month.add(NOV)

    var DEZ = document.createElement('option')
    DEZ.text = 'DEZ'
    DEZ.value = 'DEZ'
    combobox_month.add(DEZ)

    if(selected_month){        
        combobox_month.value = selected_month
        showTasks()
    }
}

function monthSelectedChange(){
    selected_month = combobox_month.options[combobox_month.selectedIndex].text
    clear()
    showTasks()
    
    LocalStorageSave(1)
}

function getNextAndPreviousMonth(month){
    var json_months = {}
    switch (month){
        case 'JAN':
            json_months['previous'] = undefined
            json_months['next'] = 'FEV'
        break

        case 'FEV':
            json_months['previous'] = 'JAN'
            json_months['next'] = 'MAR'
        break

        case 'MAR':
            json_months['previous'] = 'FEV'
            json_months['next'] = 'ABR'
        break

        case 'ABR':
            json_months['previous'] = 'MAR'
            json_months['next'] = 'MAI'
        break

        case 'MAI':
            json_months['previous'] = 'ABR'
            json_months['next'] = 'JUN'
        break

        case 'JUN':
            json_months['previous'] = 'MAI'
            json_months['next'] = 'JUL'
        break

        case 'JUL':
            json_months['previous'] = 'JUN'
            json_months['next'] = 'AGO'
        break

        case 'AGO':
            json_months['previous'] = 'JUL'
            json_months['next'] = 'SET'
        break

        case 'SET':
            json_months['previous'] = 'AGO'
            json_months['next'] = 'OUT'
        break

        case 'OUT':
            json_months['previous'] = 'SET'
            json_months['next'] = 'NOV'
        break

        case 'NOV':
            json_months['previous'] = 'OUT'
            json_months['next'] = 'DEZ'
        break

        case 'DEZ':
            json_months['previous'] = 'NOV'
            json_months['next'] = undefined
        break

        default: 
            json_months['previous'] = undefined
            json_months['next'] = undefined
    }

    return json_months
}

function clear(){
    id.innerText = ''
    sm.value = ''
    description.value = ''
    spid.value = ''
    esim.value = ''
    test_eh.value = ''
    test_prd.value = ''
    lib.value = ''
    object_name.value = ''
    checklist_description.value = ''
    textarea_notes.value = ''

    taskClear()
    libClear()
    objectClear()
    clearChecklist()

    var elem = document.getElementById("myBar")
    var width = 0
    elem.style.width = width + "%"
    elem.innerHTML = width + "%"  
}