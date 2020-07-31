export class Queue<T> {
    dataStore:Array<T> = [];
    constructor() {
        this.dataStore = [];
    }
    get length() {
        return this.dataStore.length;
    }

    enqueue(element:T):void {
        this.dataStore.push(element);
    }

    dequeue():T {
        return this.dataStore.shift()!;
    }

    front():T {
        return this.dataStore[0];
    }

    back():T {
        return this.dataStore[this.dataStore.length - 1];
    }

    isEmpty():boolean {
        if (this.dataStore.length === 0) {
            return true;
        } else {
            return false;
        }
    }
}