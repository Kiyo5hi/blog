---
title: Intro to The Theory of Computation
description: "Theory of Computation studies three major questions: what problems are computers capable of solving, what resources are needed to solve a problem and are some problems hard than others."
category: Schoolwork
createdAt: 2023-01-26T00:00-08:00
updatedAt: 2023-01-27T00:00-08:00
---

## A Problem

Before talking about the detail of computer theory, it is important to define what is a problem.

The Theory of Computation focuses on **decision problems** the most; i.e. making a decision or computing a value based on some input.

Additionally, the **difficulty** of a problem is positively correlated to the **number of resources the problem requires** to be solved.

## Vocabulary

- Character/Symbol: `a`, `b`, `c`, `0`, `1`, ...
- Alphabet: a non-empty **set** of symbols
- Word/String: a sequence of symbols: `000111000`, `AceY`, `Aron`, ...
- Language: a **set** of strings

## Language Operations

Let $r_1$ and $r_2$ be languages over the alphabet $\Sigma$.

### Union

$r_1\cup r_2$ is the language that includes any string that is either in $r_1$ or $r_2$.

$$
r_1\cup r_2=\{w\mid w\in r_1 \lor w\in r_2 \}
$$

### Concatenation

$r_1\circ r_2$ is the language that includes any string from $r_1$ concatenated with any string from $r_2$.

$$
r_1\circ r_2=\{w_1\circ w_2\mid w_1\in r_1\land w_2\in r_2\}
$$

### Kleene Star

$S^*$ is the set of all finite strings made up of concatenations of elements of $S$

$$
S^*=\{w_1\circ w_2\circ\cdots\circ w_n\mid w_1,w_2,\dots,w_n\in S\land n\geq 0\}
$$

## Regular Expression

A regular expression is a string of symbols that **describes** a language.

$R$ is a regular expression over the alphabet $\Sigma$ if:

1. $R=a$, where $a\in \Sigma$
2. $R=\epsilon$
3. $R=\emptyset$
4. $R=(R_1\cup R_2)$, where $R_1$, $R_2$ are themselves regular expressions
5. $R=(R_1\circ R_2)$, where $R_1$, $R_2$ are themselves regular expressions
6. $R=(R^*_1)$, where $R_1$ is a regular expression

### Notation

As mentioned above, a regular expression is a string of symbols that follow particular rules. Moreover, the **alphabet** of allowable symbols you can use for a regular expression is:

$$
\{(,),\cup,\circ,*,\epsilon,\emptyset\}\cup \Sigma
$$

Say we have a language $A$ that can be described as $a^*b^*$, then:

$$
A=L(a^*b^*)
$$

## Deterministic Finite Automaton

A deterministic finite automaton (DFA) is a directed graph with the following properties:

- The vertices of the graph are called states
- The edges of the graph are called transitions
- The transitions are labeled with characters from an alphabet $\Sigma$
- Each vertex has one outgoing edge for each character in $\Sigma$
- Exactly one vertex is labeled as the "start state"
- Each vertex is either an accept state or not

![An Example DFA](https://raw.githubusercontent.com/Kiyo5hi/blog-resources/main/images/202301312329544.png)
