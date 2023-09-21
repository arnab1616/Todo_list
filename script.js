document.querySelector(".addBtn").addEventListener("click",()=>{
    if(document.querySelector(".js-todo").value!=='' && document.querySelector(".js-todo-date").value !=='')
    addTodo();
    else{
        alert("Please Fill work & date");
    }
});
document.querySelector(".undoBtn").addEventListener("click",()=>{
    undoItem();
    undo_redo();
})
let list = [{name: 'Coding', dueDate: '21-09-2023', index: 0},{name: 'LeetCode', dueDate: '22-09-2023', index : 1},{name: 'Devlopment', dueDate: '20-09-2025',index:2}];
let delelteList = [];
// localStorage.setItem(list);
// localStorage.setItem(delelteList)
showList();
function showList(){
    let todoListItem = '';
    let l=localStorage.getItem('js-todo-list');
    for(let i =0; i<list.length; i++){
        const items = list[i];
        
        const html = 
        `<div>${items.name}</div> 
        <div>${items.dueDate}</div>  
        <button onclick="
            deleteListItems(${i})
            showList();
        " class="deleteBtn">Delete</button>`;
        todoListItem += html;
    }
    console.log(todoListItem);
    document.querySelector('.js-todo-list').innerHTML=todoListItem;
}
function addTodo(){
    let listName = document.querySelector(".js-todo");
    let listDate = document.querySelector(".js-todo-date");
    let indexValue = list.length;
    let todoListName = {name :listName.value,dueDate: listDate.value, index:indexValue};
    list.push(todoListName);
    localStorage.setItem('js-todo-list',list);
    // localStorage.setItem(list);
    console.log("the list is "+ list);
    listName.value  = '';
    showList();
}

function undoItem(){
    const idx = delelteList.pop();
    const name = idx[0].name;
    const dueDate = idx[0].dueDate;
    const index = idx[0].index;
    const newItem = {
        name , dueDate, index
    };
    list.splice(index,0,newItem);
    showList();
    console.log(newItem);
}
function deleteListItems(e){
    const deletedItems = list.splice(e,1);
    delelteList.push(deletedItems);
    console.log(deletedItems);
    undo_redo();
}
undo_redo();
function undo_redo(){
    let undBtn = document.querySelector(".js-unre button");
    if(delelteList.length === 0){
        undBtn.classList.remove("undoBtn");
        undBtn.classList.add("disableMode");
    }
    else{
        undBtn.classList.remove("disableMode");
        undBtn.classList.add("undoBtn");
    }
}
