
//purpose
const
    foo = {name: "ahmet", age: 12,nervous: false},
    bar = {name: "ahmet", age: 12,nervous: false},
    baz = {name: "ahmet", age: 12,nervous: false},
    hay={isim:"ahmet",sehir: "bursa"}
;
//bad code
console.log(foo)
console.log(bar)
console.log(baz)
//good code
console.log('%c Friends','color: orange; font-weight: bold')
// bu bracket içinde nesneleri yazdığın zaman, yukarıdaki nesneler de direkt erişilebiliyor, kaldırınca pbject dönüyor
console.log({ foo,bar,baz })
console.table([foo,bar,baz,hay])

//purpose
//bencmarking performance
//good code
console.time('looper')
let i = 0
while(i<1000000){i++}
console.timeEnd('looper')

//purpose
const deleteMe = () => console.trace('byebye')
deleteMe()
deleteMe()

//purpose
turtle = {
    isim:"ahmet",
    age:15,
    height:105,
    weight:30
}
//bad code
function feed(animal){
    return `${animal.isim} ${animal.age} kilos ${animal.weight}`
}
//good code
function feed1({isim,age,height,weight}){
    console.log(isim, age, height, weight)
}
// OR
function feed2(animal){
    let ({isim, age, height,weight}) = animal;
    console.log(isim, age,height)
}

feed1(turtle);

//purpose
const horse = {
    a :"ahmet",
    b: 25,
    c: 35,
    skills:["kişne", "koş"]
}
//bad code
let bio = horse.a + ` is a ` + horse.b + ` years old and skilled in ` + horse.skills.join(' & ');
console.log(bio)
//good code
const {a,b,c,skills} = horse;
bio = `${a} is a ${b} years old and skilled in ${skills.join(' & ')}.`

//purpose
//soldaki stringler (str), sağdaki değişkenler(age)
function horseAge(str, ...age){
    const ageStr = age[0] >5 ? "old" : "young";
    return `${str[0]}${ageStr} at ${age[0]} years and ${str[1]}${age[1]}`
}
const bio2 = horseAge`this horse is ${horse.b}kilos of ${horse.c}`
console.log(bio2)

//purpose
const pikachu = {ad: "pikachu"}
const stats = {hp: 40, attack: 60, defense: 45}

//bad code

pikachu['hp'] = pikachu.hp
pikachu['attack'] = pikachu.attack
pikachu['defense'] = pikachu.defense

// OR 

const lvl10 = Object.assign(pikachu,stats);
const lvl11 = Object.assign(pikachu, { hp:45 })

//good code
const lv10 = {...pikachu, ...stats}
const lv11 = {...pikachu, hp:45}


//purpose
let pokemon = ['bulbasaur', 'charizard', 'meowtwo']

//bad code
pokemon.push('metapod')
pokemon.push('weedle')
pokemon.push('raichu')
//good code
pokemon=[...pokemon,'a', 'b', 'c']

//purpose
const order = [500,300,100,45,24]
//bad code
let total = 0;
const withTax = [];
const highValue = [];
for ( i = 0; i< order.length ; i++){
    //reduce
    total += order[i];

    //map
    withTax.push(order[i] * 1.1);

    //filter
    if(order[i] > 100){
        highValue.push(order[i])
    }
}
//good code
const total1 = order.reduce((acc,cur,i,arr) => {
    console.log("yes:",acc,cur,i,arr)
    return acc + cur
})
const withTax1 = order.map(v => v * 1.1)
const highValue1 = order.filter( v => v>100);
//purpose

const random = () => {
    return Promise.resolve(Math.random())
}

//bad code
const sumRandomAsyncNums = () => {
    let first,second,third;
    return random()
        .then(v=> {
            first= v
            return random()
        })
        .then(v=> {
            second= v
            return random()
        })
        .then(v=> {
            third= v
            return first + second + third;
        })
        .then(v=> {
            console.log(v)
        })
}
//good code
const same = async() => {
    const first = await random(),
    second = await random(),
    third = await random();

    console.log(first+second+third)
}

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code

//purpose
//bad code
//good code
