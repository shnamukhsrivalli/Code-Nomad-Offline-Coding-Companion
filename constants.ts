import { DocItem, ErrorRule, InterviewTopic, QuizQuestion } from './types';

// 1. Offline Documentation Library
export const OFFLINE_DOCS: DocItem[] = [
  {
    id: 'py-list-comp',
    language: 'python',
    title: 'List Comprehension',
    category: 'Data Structures',
    keywords: ['list', 'comprehension', 'loop', 'python'],
    content: `
# List Comprehension in Python

List comprehension offers a shorter syntax when you want to create a new list based on the values of an existing list.

**Syntax:**
\`newlist = [expression for item in iterable if condition == True]\`

**Example:**
\`\`\`python
fruits = ["apple", "banana", "cherry", "kiwi", "mango"]
newlist = [x for x in fruits if "a" in x]
print(newlist)
# Output: ['apple', 'banana', 'mango']
\`\`\`
    `
  },
  {
    id: 'py-dict-methods',
    language: 'python',
    title: 'Dictionary Methods',
    category: 'Data Structures',
    keywords: ['dict', 'map', 'key', 'value', 'get', 'items'],
    content: `
# Python Dictionary Methods

- **get(key, default)**: Returns the value of the specified key. If the key does not exist: returns default value.
- **keys()**: Returns a list containing the dictionary's keys.
- **values()**: Returns a list of all the values in the dictionary.
- **items()**: Returns a list containing a tuple for each key value pair.

**Example:**
\`\`\`python
car = {"brand": "Ford", "model": "Mustang"}
x = car.get("model")
print(x) # Mustang
\`\`\`
    `
  },
  {
    id: 'js-array-map',
    language: 'javascript',
    title: 'Array.prototype.map()',
    category: 'Array Methods',
    keywords: ['array', 'map', 'loop', 'javascript', 'es6'],
    content: `
# Array.prototype.map()

The **map()** method creates a new array populated with the results of calling a provided function on every element in the calling array.

**Syntax:**
\`const newArray = array.map(callbackFn)\`

**Example:**
\`\`\`javascript
const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
console.log(map1);
// Expected output: Array [2, 8, 18, 32]
\`\`\`
    `
  },
  {
    id: 'js-async-await',
    language: 'javascript',
    title: 'Async / Await',
    category: 'Asynchronous',
    keywords: ['async', 'await', 'promise', 'fetch'],
    content: `
# Async / Await

**async** and **await** make promises easier to write.

- **async** makes a function return a Promise.
- **await** makes a function wait for a Promise.

**Example:**
\`\`\`javascript
async function myDisplay() {
  let myPromise = new Promise(function(resolve) {
    setTimeout(function() {resolve("I love You !!");}, 3000);
  });
  let result = await myPromise;
  console.log(result);
}

myDisplay();
\`\`\`
    `
  },
  {
    id: 'c-pointers',
    language: 'c',
    title: 'Pointers in C',
    category: 'Memory Management',
    keywords: ['pointer', 'memory', 'address', 'c'],
    content: `
# Pointers in C

A pointer is a variable that stores the memory address of another variable.

**Syntax:**
\`type *var-name;\`

**Example:**
\`\`\`c
int myAge = 43;     // An int variable
int* ptr = &myAge;  // A pointer variable, with the name ptr, that stores the address of myAge

printf("%d\\n", myAge);  // Outputs the value of myAge (43)
printf("%p\\n", ptr);    // Outputs the memory address of myAge
printf("%d\\n", *ptr);   // Outputs the value of myAge with the pointer (43)
\`\`\`
    `
  },
  {
    id: 'cpp-vectors',
    language: 'cpp',
    title: 'std::vector',
    category: 'STL',
    keywords: ['vector', 'array', 'stl', 'cpp'],
    content: `
# std::vector in C++

Vectors are sequence containers representing arrays that can change in size.

**Key Functions:**
- **push_back()**: Adds element to the end.
- **pop_back()**: Removes the last element.
- **size()**: Returns the number of elements.

**Example:**
\`\`\`cpp
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 2, 3};
  v.push_back(4);
  
  for(int i : v) {
    std::cout << i << " ";
  }
  return 0;
}
\`\`\`
    `
  },
  {
    id: 'java-arraylist',
    language: 'java',
    title: 'ArrayList',
    category: 'Collections',
    keywords: ['list', 'array', 'collection', 'java'],
    content: `
# Java ArrayList

The ArrayList class is a resizable array, which can be found in the \`java.util\` package.

**Example:**
\`\`\`java
import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> cars = new ArrayList<String>();
    cars.add("Volvo");
    cars.add("BMW");
    cars.add("Ford");
    System.out.println(cars);
  }
}
\`\`\`
    `
  }
];

// 2. Offline Error Rules (Regex based)
export const OFFLINE_ERROR_RULES: ErrorRule[] = [
  {
    pattern: /IndexError: list index out of range/i,
    title: "IndexError: List index out of range",
    explanation: "You are trying to access an element in a list at an index that doesn't exist. For example, trying to access index 5 in a list with only 3 items (indices 0, 1, 2).",
    fix: "Check the length of your list using `len(list)`. Ensure your loop range or manual index is strictly less than the length of the list."
  },
  {
    pattern: /IndentationError: expected an indented block/i,
    title: "IndentationError",
    explanation: "Python relies on indentation (whitespace) to define scope. You likely missed a tab or space after a statement ending in a colon (`:`) like `if`, `for`, or `def`.",
    fix: "Add 4 spaces or 1 tab to the line immediately following the colon."
  },
  {
    pattern: /TypeError: .* is not a function/i,
    title: "TypeError: is not a function",
    explanation: "In JavaScript, you are trying to call something as a function that is actually undefined, null, or a different data type (like a string or object).",
    fix: "Console log the variable before the call to check its type. Ensure you didn't mistype the method name (e.g., `getElementByID` instead of `getElementById`)."
  },
  {
    pattern: /ReferenceError: .* is not defined/i,
    title: "ReferenceError",
    explanation: "You are trying to use a variable that hasn't been declared yet, or is out of scope.",
    fix: "Check for typos in the variable name. Ensure the variable is declared with `var`, `let`, or `const` before use."
  },
  {
    pattern: /Segmentation fault/i,
    title: "Segmentation Fault (C/C++)",
    explanation: "The program tried to access a memory location that it is not allowed to access. Common causes include dereferencing null pointers, accessing arrays out of bounds, or using freed memory.",
    fix: "Check all pointer dereferences to ensure they aren't NULL. Verify array indices are within bounds (0 to size-1)."
  },
  {
    pattern: /java\.lang\.NullPointerException/i,
    title: "NullPointerException (Java)",
    explanation: "You are trying to use an object reference that has not been initialized (it is null). This often happens when calling a method on a null object.",
    fix: "Check if your object is null before using it: `if (obj != null) { obj.method(); }`. Initialize your variables properly."
  },
  {
    pattern: /error: expected ';' before/i,
    title: "Syntax Error: Missing Semicolon",
    explanation: "C, C++, and Java require statements to end with a semicolon (;). The compiler found a statement that didn't end with one.",
    fix: "Look at the line number in the error message and the line *before* it. Add the missing semicolon."
  }
];

// 3. Practice Questions
export const PRACTICE_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    language: 'python',
    question: "What is the output of `print(2 ** 3)` in Python?",
    options: ["6", "8", "9", "Error"],
    correctIndex: 1,
    explanation: "** is the exponentiation operator in Python. 2 raised to the power of 3 is 8."
  },
  {
    id: 'q2',
    language: 'javascript',
    question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
    options: ["var", "let", "block", "int"],
    correctIndex: 1,
    explanation: "`let` and `const` are block-scoped. `var` is function-scoped."
  },
  {
    id: 'q3',
    language: 'python',
    question: "Which data type is mutable in Python?",
    options: ["Tuple", "String", "List", "Integer"],
    correctIndex: 2,
    explanation: "Lists are mutable (can be changed). Tuples, Strings, and Integers are immutable."
  },
  {
    id: 'q4',
    language: 'c',
    question: "What is the correct format specifier for printing an integer in C?",
    options: ["%f", "%s", "%d", "%c"],
    correctIndex: 2,
    explanation: "`%d` or `%i` is used for signed integers. `%f` is for floats, `%s` for strings, `%c` for characters."
  },
  {
    id: 'q5',
    language: 'cpp',
    question: "Which operator is used to access members of a class through a pointer in C++?",
    options: [".", "->", "::", ":"],
    correctIndex: 1,
    explanation: "The arrow operator `->` is used with pointers to objects. The dot operator `.` is used with objects directly."
  },
  {
    id: 'q6',
    language: 'java',
    question: "Which of these is NOT a primitive type in Java?",
    options: ["int", "boolean", "String", "double"],
    correctIndex: 2,
    explanation: "`String` is a class (Reference Type) in Java, not a primitive type like `int` or `double`."
  }
];

// 4. Interview Prep
export const INTERVIEW_TOPICS: InterviewTopic[] = [
  {
    id: 'dsa-big-o',
    title: "Big O Notation",
    category: "DSA",
    content: "Big O notation describes the performance or complexity of an algorithm. \n\n- O(1): Constant time\n- O(log n): Logarithmic time (Binary Search)\n- O(n): Linear time (Simple Loop)\n- O(n^2): Quadratic time (Nested Loops)"
  },
  {
    id: 'beh-weakness',
    title: "What is your greatest weakness?",
    category: "Behavioral",
    content: "Do not say 'I work too hard'. Instead, mention a real skill you are improving. \n\n**Example:** 'I sometimes struggle with public speaking, so I have started volunteering to lead daily stand-ups to practice.'"
  },
  {
    id: 'sys-load-balancer',
    title: "What is a Load Balancer?",
    category: "System Design",
    content: "A load balancer distributes incoming network traffic across multiple servers. This ensures no single server bears too much demand. Examples: Nginx, HAProxy, AWS ELB."
  },
  {
    id: 'java-jdk-jre-jvm',
    title: "JDK vs JRE vs JVM",
    category: "DSA",
    content: "**JVM** (Java Virtual Machine): Executes Java bytecode.\n**JRE** (Java Runtime Environment): Includes JVM + Libraries to run apps.\n**JDK** (Java Development Kit): Includes JRE + Compilers/Debuggers to write apps."
  },
  {
    id: 'cpp-virtual',
    title: "Virtual Functions in C++",
    category: "DSA",
    content: "A virtual function is a member function in a base class that you redefine in a derived class. It ensures that the correct function is called for an object, regardless of the type of pointer (polymorphism)."
  }
];
