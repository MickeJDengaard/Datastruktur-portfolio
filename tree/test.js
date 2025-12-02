import { Tree } from "./tree.js";
import nodeClass from "./nodeClass.js";

// Opret træ
const tree = new Tree("root");

// Tilføj børn
const a = tree.addValue("A");
const b = tree.addValue("B");
const c = tree.addValue("C");

// Tilføj børnebørn
a.appendChild(new nodeClass("A1"));
a.appendChild(new nodeClass("A2"));
b.appendChild(new nodeClass("B1"));

console.log("=== DUMP ===");
tree.printTree();

console.log("\n=== FIND ===");
console.log(tree.findValue("A2")?.value); // A2
console.log(tree.findValue("X")); // null

console.log("\n=== REMOVE ===");
tree.removeValue("B");
tree.printTree();

console.log("\n=== REPLACE ===");
const newNode = new nodeClass("NEW");
tree.root.replaceChild(newNode, a);
tree.printTree();
