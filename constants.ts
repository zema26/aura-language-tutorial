
import type { TutorialSection, QuizQuestion } from './types';

export const AURA_DOCUMENTATION = `
# 📖 AuraBook

Welcome to the official user guide for the **Aura programming language**. This guide will walk you through Aura's unique syntax, program structure, and features, using complete examples from the enclosed files.

Aura is designed with a primary goal: to make code flow from left to right, much like natural writing. This is achieved through a few core syntactical changes that streamline the development process.

-----

## 1. The Basics: Syntax & Variables

First, let's cover the fundamental building blocks of the Aura language.

### Key Concepts

  * **Reversed Assignment Operator:** The most significant change is the assignment operator. Instead of \`variable = value\`, Aura uses \`value -> variable\`. This allows for a natural left-to-right flow. For example: \`a + b -> a\`.
  * **Tagged Keywords:** Control flow and structural keywords are enclosed in curly braces, much like a markup language. Examples include \`{while}\`...\`{/while}\` , \`{fun}\`...\`{/fun}\` , and \`{if}\`...\`{/if}\`This makes it easy to find mistakes and introduce new keywords.
  * **Comments:** Single-line comments begin with \`//\`.

### Data Types & Operators

Aura supports standard data types:

  *  \`int\`: integer  
  *  \`float\`: float decimal  
  *  \`char\`: character  
  *  \`string\`: array of "char"  
  *  \`bool\`: boolean "true" or "false"  

 It also supports standard arithmetic operators: \`+\`, \`-\`, \`*\`, \`/\`, and \`%\` (mod) .

### Variable Declaration

You can declare a variable with or without an initial value.

  *  **Declaration only:** \`int i\`  
  *  **Declaration with initialization:** \`int i(0)\` (i becomes 0)   , \`char c("a")\`   , \`bool l(true)\`   , \`string s("abcde")\` .

-----

## 2. Program Structure & Functions

Aura programs are organized into modules and functions.

### Modules

 A program is defined within a \`{module}\` block.

\`\`\`aura
{module} Euclidean 		// module itself
    ...
{/module}
\`\`\`

### Function Declaration

 Function declarations are also reversed to fit the left-to-right flow .

  *  **Syntax:** \`{fun} <input_parameters> -> <function_name> <return_type>\`  
  *  **Example:** \`{fun} int a, int b -> Euclid int\`   (This declares a function named \`Euclid\` that takes two \`int\` parameters and returns an \`int\` ).
  *  **Calling a function:** \`a, b -> f\`  

### The \`main\` Function

 The entry point for your program is the \`main\` function.

  *  **Declaration:** \`{fun} string args[] -> main int\` 

### Example 1: \`Euclidean\` Program

 This full example demonstrates a simple module, function declaration, and Aura's powerful I/O syntax.

\`\`\`aura
{module} Euclidean 		// module itself

     {fun} int a, int b -> Euclid int  // function with type int
							
	{while} b!= 0
		{if} a > b
			a - b -> a
		{else}
			b - a -> b
		{/else}
		{/if}
	{/while}

	{return} a {/return}

    {/fun}

  
  {fun}	string args[] -> main int	// main function

	int a, b

         in -> a, b -> Euclid -> out

        // combined input and output and function call
	// seamless input to output syntax

  {/fun}

{/module}
\`\`\`
 
Notice the line: \`in -> a, b -> Euclid -> out\`. This single line seamlessly:

1.  Takes input (\`in\`)
2.  Assigns it to variables \`a\` and \`b\`
3.  Passes \`a\` and \`b\` to the \`Euclid\` function
4.  Takes the return value from \`Euclid\`
5.  Sends that result to output (\`out\`) 

-----

## 3. Control Flow & Arrays

Aura provides standard control flow mechanisms and array support.

### Conditional: \`{if}\` / \`{else}\`

 The \`Euclidean\` example shows a simple \`{if}\`/\`{else}\` block.

\`\`\`aura
{if} a > b
    a - b -> a
{else}
    b - a -> b
{/else}
{/if}
\`\`\`

### Loop: \`{while}\`

 The \`Euclidean\` example also uses a \`{while}\` loop.

\`\`\`aura
{while} b!= 0
    ...
{/while}
\`\`\`

### Arrays

  *  **Declaration:** \`int a[n]\` (declares an integer array with \`n\` elements).
  *  **Initialization:** \`int a[4]([1, 2, 3, 4])\`.
  *  **Access:** \`a[i]\` (0-based indexing).

### Loop: \`{for}\`

 Aura has a specific syntax for \`{for}\` loops .

  *  **Syntax:** \`{for} i(0)++ <n\`  
  * **Explanation:**
      *  \`i(0)\`: The iterator \`i\` is initialized to 0 .
      *  \`++\`: The iteration step is by 1 .
      *  \`< n\`: The loop continues as long as \`i\` is less than \`n\` .

Here is an example of a \`{for}\` loop used to populate an array:

\`\`\`aura
{for} k(0)++ < n       // fill with true
    true -> primes[k] 
{/for}
\`\`\`

-----

## 4. Advanced Example: Sieve of Eratosthenes

The following program, \`primes\`, uses arrays and loops to implement the Sieve of Eratosthenes algorithm.

\`\`\`aura
{module} primes 

        {fun} int n -> Eratosthenes       // subroutine declaration
             
            bool primes [ n ]        // variable declaration
            int l(0), i(0), index_square(3)         

            int first, last, factor 

            {for} k(0)++ < n       // fill with true
                true -> primes[k] 
            {/for}   
                
            {while} index_square < n         
                {if} primes[i]             

                    0 + index_square -> first
                    0 + n  ->  last 
                    i + i + 3  ->  factor
                    false  ->  primes[first] 

                    {while} last - first > factor 
                        first + factor  ->  first
                        false  ->  primes[first]
                    {/while}
                    
                {/if}  
                i + 1  ->  i
                2 * i * (i + 3) + 3  ->  index_square
            {/while}          

            ' 2'  ->  out  // print out
            {for} i(0)++ < n         // print out
                {if} primes[i] 
                    {if} 2 * i + 3 > n 
                         break
                    {/if}

                    ' ' 2 * i + 3  ->  out
                    l + 1  ->  l
 
                    {if} l % 10 == 0 
                        '\\n'  ->  out
                    {/if}   
          
                {/if}        // if
            {/for}         // print out

            '\\n number : '  l  ->  out
        {/fun}            // erato fun
     
        {fun}  main  int		// main function
 
        1000 -> Eratosthenes       // subroutine call
        {/fun}
{/module}
\`\`\`

This example demonstrates array manipulation (e.g., \`false -> primes[first]\`), nested loops (\`{while}\` inside \`{while}\`), and sending formatted output to the console (e.g., \`'\\n' -> out\`).

-----

## 5. Object-Oriented Programming: Classes

Aura also supports classes, allowing for object-oriented design.

  *  **Declaration:** \`{class} ClassName ... {/class}\`.
  *  **Members:** You can define data members (e.g., \`int a, int b\`)   and member functions (e.g., \`{fun} ... -> Euclid\`)  inside a class.
  *  **Object Creation:** \`GCD N\` creates an instance (object) \`N\` of the class \`GCD\`.
  *  **Access:** Members are accessed using the dot operator (e.g., \`N.a\`, \`N.Euclid\`).

### Example 3: \`GCD\` Class

 Here is the \`Euclidean\` algorithm refactored into a class.

\`\`\`aura
{module} Euclidean

    {class} GCD    //class declaration

        int a, int b    //data members

        {fun} int a, int b -> Euclid int    //member function

            {while} b!=0
               {if} a > b
                   a - b -> a
                {else}
                   b - a -> b
                {/else}
                {/if}
            {/while}

            {return} a {/return}
        {/fun}
    {/class}


    {fun} string args[] -> main int    //main function

        GCD N    //object N of class GCD

        in -> N.a, N.b -> N.Euclid -> out    //input, output in one line

    {/fun}

{/module}
\`\`\`
 
Once again, the \`main\` function showcases Aura's natural flow.  The line \`in -> N.a, N.b -> N.Euclid -> out\` reads input directly into the object's data members (\`N.a\`, \`N.b\`), calls the object's member function (\`N.Euclid\`), and prints the returned result.
`;

export const TUTORIAL_SECTIONS: TutorialSection[] = [
  {
    id: 'introduction',
    title: 'Welcome to Aura',
    content: [
      { type: 'paragraph', text: "Welcome to the official user guide for the Aura programming language. This guide will walk you through Aura's unique syntax, program structure, and features." },
      { type: 'paragraph', text: "Aura is designed with a primary goal: to make code flow from left to right, much like natural writing. This is achieved through a few core syntactical changes that streamline the development process." },
    ]
  },
  {
    id: 'basics',
    title: '1. The Basics',
    content: [
      { type: 'heading', level: 2, text: "Syntax & Variables" },
      { type: 'paragraph', text: "First, let's cover the fundamental building blocks of the Aura language." },
      { type: 'heading', level: 3, text: "Key Concepts" },
      { type: 'list', items: [
        "**Reversed Assignment Operator:** The most significant change is the assignment operator. Instead of `variable = value`, Aura uses `value -> variable`. This allows for a natural left-to-right flow. For example: `a + b -> a`.",
        "**Tagged Keywords:** Control flow and structural keywords are enclosed in curly braces, much like a markup language. Examples include `{while}`...`{/while}`, `{fun}`...`{/fun}`, and `{if}`...`{/if}`. This makes it easy to find mistakes and introduce new keywords.",
        "**Comments:** Single-line comments begin with `//`."
      ]},
      { type: 'heading', level: 3, text: "Data Types & Operators" },
      { type: 'paragraph', text: "Aura supports standard data types and arithmetic operators (+, -, *, /, %)." },
      { type: 'list', items: [
        "`int`: integer",
        "`float`: float decimal",
        "`char`: character",
        "`string`: array of \"char\"",
        "`bool`: boolean \"true\" or \"false\"",
      ]},
      { type: 'heading', level: 3, text: "Variable Declaration" },
      { type: 'paragraph', text: "You can declare a variable with or without an initial value." },
       { type: 'list', items: [
        '**Declaration only:** `int i`',
        '**Declaration with initialization:** `int i(0)`, `char c("a")`, `bool l(true)`, `string s("abcde")`'
      ]},
    ]
  },
  {
    id: 'structure',
    title: '2. Program Structure',
    content: [
      { type: 'heading', level: 2, text: "Structure & Functions" },
      { type: 'paragraph', text: "Aura programs are organized into modules and functions." },
      { type: 'heading', level: 3, text: "Modules" },
      { type: 'paragraph', text: "A program is defined within a `{module}` block." },
      { type: 'code', code: `{module} Euclidean 		// module itself\n    ...\n{/module}` },
      { type: 'heading', level: 3, text: "Function Declaration" },
      { type: 'paragraph', text: "Function declarations are also reversed to fit the left-to-right flow. Syntax: `{fun} <input_parameters> -> <function_name> <return_type>`" },
      { type: 'code', code: `{fun} int a, int b -> Euclid int` },
      { type: 'heading', level: 3, text: "Example: Euclidean Program" },
      { type: 'paragraph', text: "This full example demonstrates a simple module, function declaration, and Aura's powerful I/O syntax." },
      { type: 'code', code: `{module} Euclidean 		// module itself

     {fun} int a, int b -> Euclid int  // function with type int
							
	{while} b!= 0
		{if} a > b
			a - b -> a
		{else}
			b - a -> b
		{/else}
		{/if}
	{/while}

	{return} a {/return}

    {/fun}

  
  {fun}	string args[] -> main int	// main function

	int a, b

         in -> a, b -> Euclid -> out

        // combined input and output and function call
	// seamless input to output syntax

  {/fun}

{/module}` },
      { type: 'paragraph', text: "Notice the line: `in -> a, b -> Euclid -> out`. This single line seamlessly takes input, assigns it to variables, passes them to the function, and sends the result to output." }
    ]
  },
  {
    id: 'control-flow',
    title: '3. Control Flow & Arrays',
    content: [
        { type: 'heading', level: 2, text: 'Control Flow & Arrays' },
        { type: 'paragraph', text: 'Aura provides standard control flow mechanisms and array support.' },
        { type: 'heading', level: 3, text: 'Conditional: {if} / {else}' },
        { type: 'code', code: `{if} a > b\n    a - b -> a\n{else}\n    b - a -> b\n{/else}\n{/if}` },
        { type: 'heading', level: 3, text: 'Loop: {for}' },
        { type: 'paragraph', text: 'Aura has a specific syntax for {for} loops: `{for} i(0)++ < n`.' },
        { type: 'list', items: [
            "`i(0)`: The iterator `i` is initialized to 0.",
            "`++`: The iteration step is by 1.",
            "`< n`: The loop continues as long as `i` is less than `n`."
        ]},
        { type: 'heading', level: 3, text: 'Arrays' },
        { type: 'list', items: [
            '**Declaration:** `int a[n]`',
            '**Initialization:** `int a[4]([1, 2, 3, 4])`',
            '**Access:** `a[i]` (0-based indexing)',
        ]},
    ]
  },
  {
    id: 'advanced-example',
    title: '4. Advanced Example',
    content: [
        { type: 'heading', level: 2, text: 'Sieve of Eratosthenes' },
        { type: 'paragraph', text: 'The following program, `primes`, uses arrays and loops to implement the Sieve of Eratosthenes algorithm.' },
        { type: 'code', code: `{module} primes 

    {fun} int n -> Eratosthenes       // subroutine declaration
         
        bool primes [ n ]        // variable declaration
        int l(0), i(0), index_square(3)         

        {for} k(0)++ < n       // fill with true
            true -> primes[k] 
        {/for}   
            
        {while} index_square < n         
            {if} primes[i]             
                // ... logic ...
            {/if}  
            i + 1  ->  i
            2 * i * (i + 3) + 3  ->  index_square
        {/while}          

        ' 2'  ->  out  // print out
        {for} i(0)++ < n         // print out
            {if} primes[i] 
                ' ' 2 * i + 3  ->  out
            {/if}
        {/for}
    {/fun}
 
    {fun}  main  int		// main function
        1000 -> Eratosthenes       // subroutine call
    {/fun}
{/module}` },
        { type: 'paragraph', text: "This example demonstrates array manipulation (e.g., `false -> primes[first]`), nested loops, and sending formatted output to the console." }
    ]
  },
  {
    id: 'classes',
    title: '5. OOP: Classes',
    content: [
        { type: 'heading', level: 2, text: 'Object-Oriented Programming' },
        { type: 'paragraph', text: 'Aura also supports classes, allowing for object-oriented design.' },
        { type: 'list', items: [
            '**Declaration:** `{class} ClassName ... {/class}`',
            '**Object Creation:** `GCD N` creates an instance `N` of class `GCD`.',
            '**Access:** Members are accessed using the dot operator (e.g., `N.a`, `N.Euclid`).'
        ]},
        { type: 'heading', level: 3, text: 'Example: GCD Class' },
        { type: 'paragraph', text: 'Here is the `Euclidean` algorithm refactored into a class.' },
        { type: 'code', code: `{module} Euclidean

    {class} GCD    //class declaration

        int a, int b    //data members

        {fun} int a, int b -> Euclid int    //member function
            {while} b!=0
               {if} a > b
                   a - b -> a
                {else}
                   b - a -> b
                {/else}
                {/if}
            {/while}
            {return} a {/return}
        {/fun}
    {/class}

    {fun} string args[] -> main int    //main function
        GCD N    //object N of class GCD
        in -> N.a, N.b -> N.Euclid -> out
    {/fun}
{/module}`},
        { type: 'paragraph', text: "Once again, the main function showcases Aura's natural flow. The line `in -> N.a, N.b -> N.Euclid -> out` reads input directly into the object's data members, calls the member function, and prints the result." }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        question: "How do you assign the value 10 to a variable named `x` in Aura?",
        options: ["x = 10", "10 -> x", "x <- 10", "assign(x, 10)"],
        correctAnswer: "10 -> x",
        explanation: "Aura uses a reversed assignment operator `->` to maintain a left-to-right code flow."
    },
    {
        question: "Which syntax is used to define a function in Aura?",
        options: [
            "function myFunction(int a) -> int",
            "def myFunction(int a): int",
            "{fun} int a -> myFunction int",
            "int myFunction(int a)"
        ],
        correctAnswer: "{fun} int a -> myFunction int",
        explanation: "Aura uses `{fun}` and `{/fun}` tags and a reversed declaration order: `{fun} <params> -> <name> <return_type>`."
    },
    {
        question: "How is a single-line comment written in Aura?",
        options: ["# This is a comment", "/* This is a comment */", "-- This is a comment", "// This is a comment"],
        correctAnswer: "// This is a comment",
        explanation: "Aura uses C-style double slashes `//` for single-line comments."
    },
    {
        question: "What is the correct way to start a `while` loop in Aura?",
        options: ["while (x > 0)", "loop while x > 0", "{while} x > 0", "do {while x > 0}"],
        correctAnswer: "{while} x > 0",
        explanation: "Control flow keywords in Aura, like `while`, are enclosed in curly braces, e.g., `{while}`...`{/while}`."
    },
    {
        question: "In the line `in -> a, b -> Euclid -> out`, what does `in` represent?",
        options: ["A function named 'in'", "A keyword for including libraries", "A built-in mechanism for standard input", "A variable that must be pre-defined"],
        correctAnswer: "A built-in mechanism for standard input",
        explanation: "`in` and `out` are special keywords in Aura for seamless standard I/O operations."
    }
];
