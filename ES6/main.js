let name = 'happy'
let age = 18

console.log(`제이름은 ${name}입니다. 제 나이는 ${age}입니다.`)

let array = [1,2,3]
let [a,b,c] = array // 1,2,3
let [ a,...rest] = array //2,3

 console.log(rest)
console.log(a,b,c)


객체 
let person = {
    name: "happy"
    age:19
    cute:true
}

let {name,...restInfo}
console.log(name,restInfo) // happy(변수) {age:19, cute:true} (객체)


a,b,c 붙이기
 let a = [1,2]
 let b = [3,4]
 let c = [5,6]

 let result = [...a,...b,...c] //배열 내용 전체 가져오기
 console.log(result)

 //함수 선언 방식

 function foo() {
    console.log(hello)
 }

 //새로운 함수
 let foo = ()=>{          // '()=매개변수' '=>function' 문장이 하나면 {} 스킵가능 but 여러개면 {} 써야함
    console.log(hello)      
 }

 let age = 17

 let person = {
    name: "happy",
    age:20,
    getInfo:function(){
        console.log(this.age)  //this = {}안에있는 함수를 부르는 객체 <-- 화살표 함수 (새로운 함수)는 this를 못함 
    }
}

person.getInfo()