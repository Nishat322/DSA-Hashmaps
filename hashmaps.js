class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0 
        this._hashTable = [] //holds the data and considered the hash table
        this._capacity = initialCapacity //will grow in chunks as you resize to a larger table when the hash table is filled, cuts down the necessary memory allocation
        this._deleted = 0
    }

    static _hashString(string){ //takes a string and hashes it outputting a number using the djb2 algorithm
        let hash = 5381
        for(let i = 0; i < string.length; i++){
            hash = (hash << 5) + hash + string.charCodeAt(i) // bitwise left sift with 5 0s , similar to hash*31, (31 decent prime number) but shifting is faster and the tradeoff is understandability
            hash = hash & hash //converting to a 32 bit integer
        }
        return hash >>> 0
    }

    get(key) {
        const index = this._findSlot(key)
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error')
        }
        return this._hashTable[index].value
    }

    //O(n)
    set(key, value){ //method for locating the correct slot for an item and then adding it to the hash map (uses helper fxn _findSlot())
        const loadRatio = (this.length + this._deleted + 1) / this._capacity
        //use MAX_LOAD_RATIO to keep track of how full the hash map is, when full a certain % move to a bigger table (it is the highest ration btwn length and capacity)
        //SIZE_RATIO reduces the number of collisions
        //Having a maximum load ratio minimizes the chances that a value ends up a long way away from the hash position
        if(loadRatio > HashMap.MAX_LOAD_RATIO){
            this._resize(this._capacity * HashMap.SIZE_RATIO)
        }

        const index = this._findSlot(key) // find the slot where the index should be

        if(!this._hashTable[index]){
            this.length++
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }
    }

    //O(n)
    _findSlot(key){ 
        const hash = HashMap._hashString(key) //calculates the hash of the key
        const start = hash % this._capacity // uses the modulus(%, Remainder) to determine the slot for the key within the current capacity

        //loops through the array stopping when the slot matches they key or it is an empty slot
        for(let i = start; i < start + this._capacity; i++){ 
            const index = i % this._capacity
            const slot = this._hashTable[index]
            if(slot === undefined || (slot.key === key && !slot.DELETED)){
                return index
            }
        }
    }

    //O(n^2) in worst case
    // in order to resize, every instance requires rebuilding the hash map from scratch with a larger capacity
    _resize(size){
        const oldSlots = this._hashTable;
        this._capacity = size;
        this.length = 0 // reset the length, it will get rebuild as the old items are added back
        this._deleted = 0
        this._hashTable = []

        for(const slot of oldSlots){
            if(slot !== undefined){
                this.set(slot.key, slot.value)
            }
        }
    }

    //difficult to delete items with open addressing so a simple solution is used, they are flagged for deletion instead and then on a resize clear the deleted items
    //in an open array if you have  3 slots with the first two being filled, when you add a 3rd item that collides with the 1st one itll be placed into the 3rd spot. 
    //If you delete the second one, when retrieving the third one it will see the 1st slot is filled, check the second one find it empty and decide that there are no values that matches the key
    delete(key) {
        const index = this._findSlot(key)
        const slot = this._hashTable[index]
        if(slot === undefined){
            throw new Error('Key Error')
        }
        slot.DELETED = true
        this.length--
        this._deleted++
    }
}