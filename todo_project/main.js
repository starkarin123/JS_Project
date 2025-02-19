//유저가 값을 입력한다
//+ 버튼을 누르면 할일이 추가된다
// Delete버튼 할일이 사라집
//할일이 완료되며 밑줄이 만들어짐
//1. check 버튼 누르는 순간 isComplete에 False --> True로 바꿔줌
//2. True면 완료한걸로 간주하고 밑줄
//3. False면 안끝난걸로 간주하고 그대로
//진행중 tab을 누르면 언더바가 이동함
//끝남탭은, 끝난 아이템만, 진행중탭은, 진행중인 할일만
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList=[]
let filterList=[]
let mode = "all"
addBtn.addEventListener("click", addTask)



for(let i=1;i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}

console.log(tabs)

function addTask() {
    let taskContent = taskInput.value.trim(); 

    if (taskContent === "") { 
        alert("🚨 할 일을 안 적어 주셨어요 ㅠ_ㅠ 🚨"); 
        return; 
    }

    let task = {
        id: randomIDGenerate(),
        taskContent: taskContent, 
        isComplete: false
    };

    taskList.push(task);
    taskInput.value = ""; // 입력창 비우기

    updateFilteredList(); 
    console.log(taskList); 
}

taskInput.addEventListener("task-input", function(event) {
    if (event.inputType === "insertLineBreak") {
        event.preventDefault(); // 줄 바꿈 방지
        addTask();
    }
});


function render(){
    let list = []
    //1. 내가 선택한 탭에 따라 
    if (mode === 'all'){
        list = taskList
    // all tasklist
    }else if (mode === "ongoing" || mode === "done"){ 
        list = filterList
    // ongoing done filterList        
    }//2.list를 달리보여줘야함


    let resultHTML  = " ";
    for (let i = 0; i < list.length; i++){
        let taskClass = list[i].isComplete ? "task-done" : "";
        let checkEmoji = list[i].isComplete ? '<i class="fa-solid fa-check"></i>' 
                                                    : '<i class="fa-regular fa-circle"></i>';

        if (list[i].isComplete == true) {
    resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button class="comp-emoji" onclick="toggleComplete('${list[i].id}')">${checkEmoji}</button> 
            <button class="delete-emoji" onclick="deleteTask('${list[i].id}')">
            <i class="fa-solid fa-trash-can"></i></button>
        </div>
    </div>`;
} else {
    resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button class="comp-emoji" onclick="toggleComplete('${list[i].id}')">${checkEmoji}</button> 
            <button class="delete-emoji" onclick="deleteTask('${list[i].id}')">
            <i class="fa-solid fa-trash-can"></i></button>
        </div>
    </div>`;
}

}

    //직접적으로 onclick (함수)을 넣어서 직접적으로 클릭가능하게 할 수 있음

    document.getElementById("task-board").innerHTML = resultHTML;

};

function toggleComplete(id){
    for(let i=0; i<taskList.length;i++){
        if (taskList[i].id ==id){
            taskList[i].isComplete= !taskList[i].isComplete; //true/false (체크햇다/안했다) 하기위해서는 !taskList[i].isComplete 해야함
            break;
        }
    }
    render();
    console.log(taskList)
}


function deleteTask(id){
        for (i=0; i<taskList.length;i++){
            if(taskList[i].id == id){
                taskList.splice(i,1)
                break;
            }
        }

        //taskList = taskList.filter(task => task.id !== id);
        updateFilteredList();
        }

function filter(event){
    mode= event.target.id
    filterList = []


    let underline = document.getElementById("under-line")
    underline.style.left = event.target.offsetLeft + "px";
    underline.style.width = event.target.offsetWidth + "px";


    if (mode === "all"){
        render()
    }else if (mode === "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        console.log("진행중",filterList)
        //isComplete = false
    }else if(mode === "done"){
        //isComplete = true
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
    }
    render()
}

function updateFilteredList() {
    filterList = [];

    if (mode === "ongoing") {
        filterList = taskList.filter(task => !task.isComplete);
    } else if (mode === "done") {
        filterList = taskList.filter(task => task.isComplete);
    } else {
        filterList = taskList;
    }

    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}



// Enter누를 때 add
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        addTask(); // 
    }
});

