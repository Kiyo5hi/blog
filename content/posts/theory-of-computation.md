---
title: Introduction to The Theory of Computation
description: How do you define a computation? How do you define a programming language? How can you tell if a programming language can implement all kinds of algorithms to solve problems?
category: Schoolwork
createdAt: 2023-01-26T00:00-08:00
updatedAt: 2023-01-31T00:00-08:00
---

## Introduction

The Theory of Computation is about how machines can process [formal languages](https://en.wikipedia.org/wiki/Formal_language); i.e. how we can describe patterns of strings such as `aaa`, `aabaa` so that a machine can read/recognize them.

There are three major problems that you should keep asking:

- What problems are computers capable of solving?
- What resources are needed to solve a problem?
- Are some problems hard than others?

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

$S^*$ is the set of all finite strings made up of concatenations of elements of $S$.

$$
S^*=\{w_1\circ w_2\circ\cdots\circ w_n\mid w_1,w_2,\dots,w_n\in S\land n\geq 0\}
$$

## Language

### Regular Language

A regular language is a language that can be described with a **[Regular Expression (RegEx)](#regular-expression-regex)** or recognized by a **[Deterministic Finite Automaton (DFA)](#deterministic-finite-automaton-dfa)** or a **[Nondeterministic Finite Automaton (DFA)](#nondeterministic-finite-automaton-nfa)**.

The above is the definition but in a reversed order. Since there are multiple kinds of languages that we can study, the formal definition goes:

A language is said to be regular if and only if:

- $\exists$ a regular expression that describes it, OR
- $\exists$ a deterministic finite automaton that recognizes it, OR
- $\exists$ a nondeterministic finite automaton that recognizes it

#### Properties

A regular language is closed under:

- Union
- Concatenation
- Kleene Star
- Complementation

#### Regular Expression (RegEx)

A regular expression is a string of symbols that **describes** a language.

$R$ is a regular expression over the alphabet $\Sigma$ if:

1. $R=a$, where $a\in \Sigma$
2. $R=\epsilon$
3. $R=\emptyset$
4. $R=(R_1\cup R_2)$, where $R_1$, $R_2$ are themselves regular expressions
5. $R=(R_1\circ R_2)$, where $R_1$, $R_2$ are themselves regular expressions
6. $R=(R^*_1)$, where $R_1$ is a regular expression

##### Notation

As mentioned above, a regular expression is a string of symbols that follow particular rules. Moreover, the **alphabet** of allowable symbols you can use for a regular expression is:

$$
\{(,),\cup,\circ,*,\epsilon,\emptyset\}\cup \Sigma
$$

Say we have a language $A$ that can be described as $a^*b^*$, then:

$$
A=L(a^*b^*)
$$

#### Deterministic Finite Automaton (DFA)

A deterministic finite automaton is a directed graph with the following properties:

- The vertices of the graph are called states
- The edges of the graph are called transitions
- The transitions are labeled with characters from an alphabet $\Sigma$
- Each vertex has one outgoing edge for each character in $\Sigma$
- Exactly one vertex is labeled as the "start state"
- Each vertex is either an accept state or not

![An Example DFA](https://raw.githubusercontent.com/Kiyo5hi/blog-resources/main/images/202301312329544.png)

##### Notation

Formally, we can define a DFA with a 5-tuple $(Q,\Sigma,\delta,q_0,F)$ where:

- $Q$ is a finite set called the states
- $\Sigma$ is a finite set called the alphabet
- $\delta:Q\times\Sigma\rightarrow Q$ is the transition function
- $q_0\in Q$ is the start state
- $F\subseteq Q$ is the set of accept states

Therefore, with the notation, we can describe the above DFA by $M=(\{q_0,q_1,q_2,q_3\},\{0,1\},\delta,q_0,\{q_3\})$ where the function $\delta$ is specified by:

|State|Input|Output|
|-----|-----|------
|$q_0$|$0$|$q_1$|
|$q_0$|$1$|$q_1$|
|$q_1$|$0$|$q_1$|
|$q_1$|$1$|$q_3$|
|$q_2$|$0$|$q_3$|
|$q_2$|$1$|$q_2$|
|$q_3$|$0$|$q_3$|
|$q_3$|$1$|$q_3$|

#### Nondeterministic Finite Automaton (NFA)

A nondeterministic finite automaton has the same properties as a DFA except for vertexes. Instead, an NFA's vertexes can:

- Have any number of edges
- Have epsilon (the empty string $\epsilon$) transitions

##### Notation:

Formally, we can define an NFA with a 5-tuple $(Q,\Sigma,\delta,q_0,F)$ where:

- $Q$ is a finite set called the states
- $\Sigma$ is a finite set called the alphabet
- $\delta:Q\times\Sigma_\epsilon\rightarrow \mathcal{P}(Q)$ is the transition function
- $q_0\in Q$ is the start state
- $F\subseteq Q$ is the set of accept states

#### DFA vs NFA vs RegEx

Every DFA is essentially an NFA since it meets all the properties that an NFA possesses. On the other hand, an NFA can always be converted to a DFA with the **[standard subset construction](https://en.wikipedia.org/wiki/Powerset_construction)**.

Similarly, regex can be converted to NFAs using **[structural induction](https://en.wikipedia.org/wiki/Structural_induction)**, and a DFA can be converted to a regex using **[generalized nondeterministic finite automata (GNFAs)](https://en.wikipedia.org/wiki/Generalized_nondeterministic_finite_automaton)**.

### Non-regular Language

TODO: unfinished...
