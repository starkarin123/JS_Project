//랜덤번호 지정 ok
//유저가 번호를 입력 그리고 go라는 번호를 누름
// 정답이면 "정답을 맞췄습니다"
// 랜덤번호가 < 유저번호보다 작음 => Down
// 랜덤번호가 > 유저번호보다 큼 => UP
// Reset  버튼
//5번의 기회를 다 쓰면 게임이 끝남 (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위를 벗어나면 alert를 주고 기회를 깍지않음.
// 유저가 이미 입력한 숫자를 또 입력하면 alert주고 기회를 깍지않음

let computerNum = 0;
let playButton = document.getElementById("play-button"); // document = 웹사이트 자체 , getElementBy땡땡은 index.html에서 불러올것
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");;
let resetButton = document.getElementById("reset-button")
let chances = 3
let gameOver = false
let chanceArea =  document.getElementById("chance-area")
let history = [] //값이 여러개가 들어감으로 array 로 만들어줌

playButton.addEventListener("click",play); // playButton에 click이라는 이벤트를 넣어줌. play = 이벤트 실행시 어떤함수를 부를지 + ()넣으면안된. 넣으면 바로 실행되기때문에)
resetButton.addEventListener("click",reset)
userInput.addEventListener("focus",function(){
    userInput.value = ""
})

function pickRandomNum (){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답", computerNum);
}

function play(){ //위 play함수를 매개변수로 넘김
    let userValue = userInput.value;

    if (userValue < 1 || userValue >100){
        resultArea.textContent = "1에서 100사이 숫자만 입력하시오."
        return;
    }

    if (history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자 입니다. 다시 입력해주세요."
        return;
    }

    chances--;
    chanceArea.textContent= `남은기회:${chances}번` //백틱 ` ${동적값}`
    console.log("chance", chances)

    if(userValue < computerNum){
        resultArea.textContent = "UP"  //result area에 있는 text를 UP으로 바꺼줄꺼에여.
    }else if(userValue > computerNum){
        resultArea.textContent = "DOWN"
    }else{
    resultArea.textContent = "정답입니다!!!"
    gameOver = true
}

    history.push(userValue)
    console.log(history)

    if(chances < 1){
        gameOver=true
    }
    
    if (gameOver ==true){
        playButton.disabled = true
    }
}


function reset(){
    //user input창이 깨끗하게 정리
    userInput.value = ""
    //새로운 번호 생성
    pickRandomNum()
    playButton.disabled = false

    resultArea.textContent = "새로운 정답을 맞추시오"
}

pickRandomNum()





