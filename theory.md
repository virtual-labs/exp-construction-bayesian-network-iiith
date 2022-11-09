### Theory

## Introduction
Most real world application involve many random variables, which makes computation of probability hard. For answering any query in a domain we need to have joint probabilities of the random variables. Notice that defining joint probabilities for all the random variables is a tedious task(especially when there are large number of random variables). Bayesian Network is a way of expressing these complicated probabilities using compact structure, which requires us to define less number of probabilities.

Bayesian Network compactness is based on the application of conditional independence probabilities. We form a graph which satisfies few properties and we store some information on each node (we will see the exact details). 

Bayesian Network:
Nodes in the graph represent random vaiables in the domain.
Each edge from random vaiable X to Y, reprepsents the fact X has a direct influence on Y.
We store P(X/Parent(X)) for each node in the graph.

Using the conditional probabilities we defined on each node we can calculate the join probabilities on these random variables.

## Algorithm
Order the nodes (nodes in the graph are random variables) X1, X2, X3, …
For each Xi, add and edge from Xj to Xi if there is a direct influence of Xj on Xi. 
This will make sure that the condition:
P(Xi/Parent(Xi)) = Parent(Xi/Xi-1, Xi-2, … 1)
Which is important for the proof to hold. For full proof please read Chapter 14 in Artificial Intelligence: A Modern Approach [Third Edition]. 
Now for each node define P(Xi/Parent(Xi))

## Disadvantages
You need to have domain knowledge to know the relation between random variables. 
The order in which you choose random variables will effect the compactness of the Network. In worst case we might define huge number of probabilities. So there is no single correct answer for Bayesian Network. Depending on the order we choose the optimality and compactness of the graph changes.

## Advantages
We need to define less number of probabilities.
Because of compact nature of Bayesian Network the inference comes handy.
