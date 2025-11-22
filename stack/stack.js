export class Stack {
    constructor() {
        this.head = null;    
        this._size = 0;      
    }

    _createNode(data, next = null) {
        return { data, next };
    }

    push(data) {
        const newNode = this._createNode(data, this.head);
        this.head = newNode;
        this._size++;
    }

    pop() {
        if (!this.head) return null;

        const node = this.head;
        this.head = this.head.next;
        this._size--;

        return node.data;
    }

    peek() {
        if (!this.head) return null;
        return this.head.data;
    }

    size() {
        return this._size;
    }

    get(index) {
        if (index < 0 || index >= this._size) return null;

        let current = this.head;
        let i = 0;

        while (current && i < index) {
            current = current.next;
            i++;
        }

        return current ? current.data : null;
    }
}
