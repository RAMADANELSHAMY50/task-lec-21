let tasks;
if(localStorage.task !=null){
        tasks= JSON.parse(localStorage.task);
    }else{
        tasks=[];
    }


let tbody= document.querySelector("#tbody");
let title= document.querySelector("#title");
let desc= document.querySelector("#desc");
let create=document.querySelector("#AddTask");
let deleteAll=document.querySelector("#deleteAll");
let btns = document.querySelectorAll(".btn-dis");
// let displayAll=document.querySelector("#displayAll");
let mood='create';
let temp;


function display(){
    tbody.innerHTML=""

    tasks.forEach((task,index)=>{

        tbody.innerHTML+=`
            <tr class="border-1 border-top-0">
                <td class="text-primary">${index+1}</td>
                <td>${task.task_name}</td>
                <td>${task.describation}</td>
                <td onclick="toggleStatus(${index})" id="status"><span class="${task.status ? 'text-success' : 'text-warning'}">
                    ${task.status ? "completed" : "waiting"}
                </span></td>
                <td>${task.date}</td>
                <td>
                    <button id="edit" onclick="update(${index})"><i
                            class="bi bi-pencil"></i></button>
                    <button id="delete" onclick="deleteIndex(${index})"><i
                            class="bi bi-trash3"></i></button>
                </td>
            </tr>
        `
    })
}

document.querySelector('#All').addEventListener('click', ()=>{
    display();
})

// add task
create.addEventListener('click',()=>{


let addTask= {
    task_name:title.value,
    describation:desc.value,
    status:false,
    date: new Date().toLocaleDateString()
}

if(mood === 'create'){
tasks.push(addTask);
}else{
    tasks[temp]=addTask;
    mood='create';
    create.innerHTML="create";
    
}
localStorage.setItem("task",JSON.stringify(tasks));

display();
title.value="";
desc.value="";


})

// toggleStatus
function toggleStatus(index) {
    tasks[index].status = !tasks[index].status;
    localStorage.setItem("task", JSON.stringify(tasks));
    display();
}

// delete all
deleteAll.addEventListener('click', ()=>{
    tasks=[];
    localStorage.setItem("task",JSON.stringify(tasks));
    display()
})

// deleteIndex
function deleteIndex(index){
    tasks.splice(index,1);
    localStorage.setItem("task",JSON.stringify(tasks));
    display()
}

// update
function update(index) {
    title.value=tasks[index].task_name;
    desc.value=tasks[index].describation;
    create.innerHTML="update";
    mood='update';
    temp=index;

    scroll({
        top:0,
        behavior:"smooth",
    })

    
}


// toggle
function hh(el) {
    let btns = document.querySelectorAll(".btn-dis");

    btns.forEach(btn => btn.classList.remove("active"));

    el.classList.add("active");
}

function tasksfilter(status) {
    tbody.innerHTML='';

    if(status == "completed"){
        let complete=tasks.filter((tas,index)=>{
        return tas.status === true;
    });
    complete.forEach((task,index)=>{

        tbody.innerHTML+=`
            <tr class="border-1 border-top-0">
                <td class="text-primary">${index+1}</td>
                <td>${task.task_name}</td>
                <td>${task.describation}</td>
                <td onclick="toggleStatus(${index})" id="status"><span class="${task.status ? 'text-success' : 'text-warning'}">
                    ${task.status ? "completed" : "waiting"}
                </span></td>
                <td>${task.date}</td>
                <td>
                    <button id="edit" onclick="update(${index})"><i
                            class="bi bi-pencil"></i></button>
                    <button id="delete" onclick="deleteIndex(${index})"><i
                            class="bi bi-trash3"></i></button>
                </td>
            </tr>
        `
    });
    }else{
         let waiting=tasks.filter((tas,index)=>{
        return tas.status === false;
    });
    waiting.forEach((task,index)=>{

        tbody.innerHTML+=`
            <tr class="border-1 border-top-0">
                <td class="text-primary">${index+1}</td>
                <td>${task.task_name}</td>
                <td>${task.describation}</td>
                <td onclick="toggleStatus(${index})" id="status"><span class="${task.status ? 'text-success' : 'text-warning'}">
                    ${task.status ? "completed" : "waiting"}
                </span></td>
                <td>${task.date}</td>
                <td>
                    <button id="edit" onclick="update(${index})"><i
                            class="bi bi-pencil"></i></button>
                    <button id="delete" onclick="deleteIndex(${index})"><i
                            class="bi bi-trash3"></i></button>
                </td>
            </tr>
        `
    });
    }
}

document.querySelector('#Completed').addEventListener('click',()=>{
    tasksfilter("completed")
});

document.querySelector('#Waiting').addEventListener('click',()=>{
    tasksfilter("waiting")
});




display()

