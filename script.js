function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    db.collection("todo-items").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}


function getItems(status){
    db.collection("todo-items").onSnapshot((snapshot)  => {

        let items = [];
        snapshot.docs.forEach((doc)=>{
            items.push({
                id: doc.id,
                ...doc.data()
            })
        })

        generateItems(items, status);
    })
}


function generateItems(items, status){
    
    let count = 0
    let itemsHTML = "";
    // console.log(status);
    items.forEach((item) => {
        if((status == "completed" && item.status == "completed") || (status == "active" && item.status == "active") || status == "All"){
            itemsHTML += `
                <div class="todo-item">
                    <div class="check">
                        <div data-id="${item.id }" class="check-mark ${item.status == "completed" ? "checked": ""}">
                            <img src="./assets/icon-check.svg">
                        </div>
                    </div>
                    <div class="todo-text ${item.status == "completed" ? "checked": ""}">
                        ${item.text}
                    </div>
                </div>
            `
        }
        if(item.status == "active"){
            count += 1
        }
    })


    document.querySelector(".items-left").innerText = `${count} items left`
    document.querySelector(".todo-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners(){
    let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
    // console.log(todoCheckMarks);
    todoCheckMarks.forEach((checkMark)=>{
        checkMark.addEventListener("click", function(){
            markCompleted(checkMark.dataset.id);
        })
    })
}

function markCompleted(id){
    
    let item = db.collection("todo-items").doc(id);

    item.get().then(function(doc){
        if(doc.exists){
            let status = doc.data().status;
            if(status == "active"){
                item.update({
                    status: "completed"
                })
            } else if(status == "completed"){
                item.update({
                    status: "active"
                })
            }
        }
    })
}

function showActive()
{
    getItems("active");
    document.getElementById("showAll-button").className = "inactive"
    document.getElementById("showActive-button").className = "active"
    document.getElementById("showCompleted-button").className = "inactive"
}

function showCompleted()
{
    getItems("completed");
    document.getElementById("showAll-button").className = "inactive"
    document.getElementById("showActive-button").className = "inactive"
    document.getElementById("showCompleted-button").className = "active"
}

function showAll(){
    getItems("All");
    document.getElementById("showAll-button").className = "active"
    document.getElementById("showActive-button").className = "inactive"
    document.getElementById("showCompleted-button").className = "inactive"
}

function clearCompleted()
{
    
}

getItems("All");

