// NEW THING LEARNT 
// 1.  THE WHILE LOOP IS MORE FASTER TO CLEAR ALL ELEMENT


const form = document.querySelector('form');
const list = document.querySelector('.list');
const taskInput = document.querySelector('#add-task-input');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-task-btn');


// FUNCTIONS TO LOAD ALL EVENT LISTNERS
loadAllEventListeners()


// LOAD ALL EVENT LISTNERS
function loadAllEventListeners(){
    // WHEN THE DOCUMENT LOAD EVENT 
    document.addEventListener('DOMContentLoaded', getTaskFromLocalStorage)  // this is will load the event before the bowser loading the images and the pages

    // Add task event
    form.addEventListener('submit', addTask);

    // delete item class
    list.addEventListener('click', removeTask)

    // filter through tasks
    filter.addEventListener('keyup', filterTask)

    // clear all tasks
    clearBtn.addEventListener('click', cleartask)
    
}


// ADD TASKS
function addTask(e){
    if(taskInput.value === ''){
        alert('Task cannot be empty')
    } else {
        // create li elements
        const li = document.createElement('li');
        const pcontent = document.createElement('p')
        // add class
        li.className = 'list-item'
        
        pcontent.textContent = taskInput.value
        
        // CREATE TEXT NODE AND APPEND TO LI 
        // li.append(document.createTextNode(taskInput.value));  // i just learnt this one 

        // append the p to the li
        li.append(pcontent)

        // create new p element for delete
        const del = document.createElement('p');
        // add class name 
        del.className = 'list-item-delete'
        pcontent.className = 'list-item-content'
        // add the delete content
        del.textContent = 'del'
        // append the pdel to the li
        li.append(del)
        // append it to ul
        list.append(li)
        // add to local storage

        addTaskToLocalStorage(taskInput.value)
        
        taskInput.value = '';
    }

    


    e.preventDefault()
}

// REMOVE TASKS
function removeTask(e){
    if(e.target.classList.contains('list-item-delete')){
        if(confirm('Are you sure') === true){
            e.target.parentElement.remove()
            // console.log(e.target.previousSibling)
            console.log(e.target.parentElement.children[0].textContent)

            deleteTaskFromLocalStorage(e.target.parentElement.children[0].textContent)
        }
    }
}

// FILTER THROUGH TASKS
function filterTask(e){
    //  THIS IS TRAVESY METHOD
    // allList = document.querySelectorAll('.list-item')
    // allList.forEach(function(li){
    //     
    //     if(li.children[0].textContent.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1){
    //         li.style.display = 'flex'
    //         console.log(li.children[0].textContent)
    //     } else{
    //         li.style.display = 'none'
    //         console.log('h2dhk')
    //     }
    // })

    // BUT THIS IS MY METHOD 

    let allList = document.querySelectorAll('.list-item')
    allList.forEach(function(li){
        if(li.children[0].textContent.toLowerCase().includes(filter.value.toLowerCase())){
            li.style.display = 'flex'
        } else{
            li.style.display = 'none'
        }
    }) // MY METHID IS BETTER
} 

// CLEAR ALL TASKS
function cleartask(e){
    if(confirm('This will clear all your tasks')){

        // YOU CAN LOOP THROUGH THE FOR LOOP 
        // allList = document.querySelectorAll('.list-item')
        // allList.forEach(function (item){
        // item.remove()

        // OR YOU CAN USE THE WHILE LOOP
        while(list.firstChild){
            list.firstChild.remove()
        }  // but the while loop is more faster 

        clearTaskFromLocalStorage()
    
    }
}


// LOCAL STORAGE DOINGS
function allTheLocalStorageFunctions(){
     
    
}

// ADD TO LOCAL STORAGE
function addTaskToLocalStorage(item){
    // let task;
    // if(localStorage.getItem('tasks') === null){
    //     task = []
    //     task.push(item)
    //     localStorage.setItem('tasks', JSON.stringify(task))
    // } else {
    //     JSON.parse(localStorage.getItem('tasks'))
    //     task = JSON.parse(localStorage.getItem('tasks'))
    //     task.push(item)
    //     localStorage.setItem('tasks', JSON.stringify(task))
    // }


    // BUT TRAVESY WAY IS SIMPLER THIS IS THE TRAVESY WAY
    let task;
    if(localStorage.getItem('tasks') === null){
        task = []            
    } else {
        task = JSON.parse(localStorage.getItem('tasks'))
    }

    task.push(item)
    localStorage.setItem('tasks', JSON.stringify(task))

}

// DELETE TASKS FROM LOCAL STORAGE
function deleteTaskFromLocalStorage(item){
    let task = []
    let pcont = document.querySelectorAll('.list-item-content')
    let arr = [];
    if(localStorage.getItem('tasks')=== null){
        task = []
    } else {
        task = JSON.parse(localStorage.getItem('tasks'))

        pcont.forEach(function(item, index){
            arr.push(item.textContent)
        })
        task = arr
        localStorage.setItem('tasks', JSON.stringify(task))
    }

}
// CLEAR TASKS FROM LOCAL STORAGE
function clearTaskFromLocalStorage(){
    localStorage.clear()
}
    

// GET TASK FROM LOCAL STORAGE 

// I LEAARNT THIS FROM TRAVESY MEDIA AND IT IS THE SIMPLEST FORM
function getTaskFromLocalStorage(){
    let task;
    if(localStorage.getItem('tasks') === null) {
        task = []
    }
    else{
        task = JSON.parse(localStorage.getItem('tasks'))
    }

    task.forEach(function(word){
        // create li elements
        const li = document.createElement('li');
        const pcontent = document.createElement('p')
        // add class
        li.className = 'list-item'
        
        pcontent.textContent = word
        
        // CREATE TEXT NODE AND APPEND TO LI 
        // li.append(document.createTextNode(taskInput.value));  // i just learnt this one 

        // append the p to the li
        

        // create new p element for delete
        const del = document.createElement('p');
        // add class name 
        del.className = 'list-item-delete'
        pcontent.className = 'list-item-content'
        // add the delete content
        del.textContent = 'del'
        // append the pdel to the li
        li.append(pcontent)
        li.append(del)
        // append it to ul
        list.append(li)
    })
}

// localStorage.clear('tasks')
