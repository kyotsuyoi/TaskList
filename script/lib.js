const table_lib_body = document.getElementById('table_lib_body')
var temp_lib_list = new Array()
var selected_lib_position = -1

function showLibs() {

    table_lib_body.innerHTML = ''
    if (temp_lib_list == null) {
        temp_lib_list = new Array()
        return
    }

    temp_lib_list.forEach(item => {
        const pos = temp_lib_list.indexOf(item)

        var line = document.createElement("tr")
        var td_id = document.createElement("td")
        var td_num = document.createElement("td")
        var td_ev_anex = document.createElement("td")
        var td_mont_ok = document.createElement("td")
        var td_link = document.createElement("td")

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
        
        //checkLibMontOK check_mont_ok

        td_id.appendChild(t_id)
        td_num.appendChild(t_num)
        td_ev_anex.appendChild(el_ev_anex_check)
        td_mont_ok.appendChild(el_mont_ok_check)
        td_link.appendChild(t_link)

        line.appendChild(td_id)
        line.appendChild(td_num)
        line.appendChild(td_ev_anex)
        line.appendChild(td_mont_ok)
        line.appendChild(td_link)

        line.setAttribute('onclick', `selectedLib(${pos})`)

        table_lib_body.appendChild(line)
    })
}

function selectedLib(position){
    var item = temp_lib_list[position]

    selected_lib_position = position

    lib.value = item.num  
}

function addLib() {
    if (lib.value == ""){
        alert("Insira o número da liberação")
        return
    }  

    if (temp_lib_list == null) {
        temp_lib_list = new Array()
    }
    
    json_array = {}
    json_array["num"] = lib.value
    json_array["check_ev_anex"] = false
    json_array["check_mont_ok"] = false

    temp_lib_list.push(json_array)

    lib.value = ''

    showLibs()
    LocalStorageSave(1)
    calculateProgress()
}

function deleteLib() {
    // temp_lib_list = null
    // LocalStorageSave(1)
    // return

    if (selected_lib_position == -1 || selected_lib_position > temp_lib_list.length-1) {
        return
    }

    temp_lib_list.splice(selected_lib_position, 1)
    LocalStorageSave(1)
    showLibs()

    selected_lib_position = -1

    lib.value = ''
    calculateProgress()
}

function checkLibEvAnex(position){
    var item = temp_lib_list[position]

    var checked = item.check_ev_anex  
    if(checked){
        item.check_ev_anex = false
    }else{
        item.check_ev_anex = true
    }

    temp_lib_list[position] = item
    LocalStorageSave(1)

    calculateProgress()
}

function checkLibMontOK(position){
    var item = temp_lib_list[position]

    var checked = item.check_mont_ok  
    if(checked){
        item.check_mont_ok = false
    }else{
        item.check_mont_ok = true
    }

    temp_lib_list[position] = item
    LocalStorageSave(1)

    calculateProgress()
}