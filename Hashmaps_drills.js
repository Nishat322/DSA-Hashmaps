const HashMap = require('./hashmaps')

function main(array){
    const lotr = new HashMap()
    lotr.MAX_LOAD_RATIO = 0.5
    lotr.SIZE_RATIO = 3

    let key = ''
    let value = ''
    lotr.set({"Hobbit": "Bilbo"})
    for(let i = 0; i < array.length; i++){
       key = Object.keys(array[i])
       value = Object.values(array[i])
       lotr.set(key[0], value[0])
    }
   console.log(lotr)

   console.log(lotr.get('Maiar')) // returns Sauron
   console.log(lotr.get('Hobbit')) // return Frodo
}

//There is a discrrepency in the values returned when accessing Maiar and Hobbit, because the key is used twice the second value replaces the first

//the capacity of the table is 8 after all the hashed items

const arr = [
    {"Hobbit": "Bilbo"}, 
    {"Hobbit": "Frodo"},
    {"Wizard": "Gandalf"}, 
    {"Human": "Aragorn"}, 
    {"Elf": "Legolas"}, 
    {"Maiar": "The Necromancer"},
    {"Maiar": "Sauron"}, 
    {"RingBearer": "Gollum"}, 
    {"LadyOfLight": "Galadriel"}, 
    {"HalfElven": "Arwen"},
    {"Ent": "Treebeard"}
]

//main(arr)

/************************************************ WHAT DOES THIS DO? *********************************************/

//PREDICTIONS
const WhatDoesThisDo = function(){
    let str1 = 'Hello World.'; // set str1 to Hello World.
    let str2 = 'Hello World.'; // set str2 to Hello World.
    let map1 = new HashMap(); //creates a hashmap called map1
    map1.set(str1,10); // adds key Hello World. with value 10
    map1.set(str2,20); // adds key Hello World. with value 20, replaces the value of the original
    let map2 = new HashMap(); // creates hashmap map2
    let str3 = str1;// sets str 3 to Hello World.
    let str4 = str2;// sets str4 to Hello World.
    map2.set(str3,20); // adds key Hello World. to value 20
    map2.set(str4,10); // adds key Hello World. to value 10, replaces the value of the original

    console.log(map1.get(str1)); // 20
    console.log(map2.get(str3)); //10
}

WhatDoesThisDo() // ==> Predictions were correct

