---
  title: Inicio
  subtitle: Matemáticas
  lang: 'es-ES'
  toc-title: Índice
  css:
    - static/katex.min.css
    - static/github.min.css
    - static/jall.min.css
---
# Notes

## Syntax

This also means that your notes aren't locked into any proprietary format.

Notes can have some metadata: if they are favorited or not, which tags they have, which attachments they have, etc. These metadata are written as Markdown front matter. This is taken care of for you. Ver [mermaid]


## Syntax Plugins {.ejemplo}

Some syntax plugins for providing you [otra página](analisis/importing.html), [página 2](index2.html) and [mermaid](https://github.com/knsv/mermaid) support are built-in, check out this note's source.

## KaTeX

Los productos notables, también llamados igualdades notables, son identidades que nos permiten hacer los cálculos más sencillos.

<center>
|    *Productos notables*    |        *Fórmula*        |
|:-------------------------- |:-----------------------:|
|    cuadrado de una suma    | $(a+b)^2= a^2+2ab+b^2$  |
| cuadrado de una diferencia | $(a-b)^2= a^2-2ab+b^2$  |
|  diferencia de cuadrados   | $a^2 - b^2= (a+b)(a-b)$ |
</center>


Wrap a formula in `$$` to display it as a block:

$$f(x)=\int_{-\infty}^{\infty} \hat{f}(\xi), e^{2 \pi i \xi x} d \xi$$

Wrap it in `$` to display it inline: $e^{iπ} + 1 = 0$.

| The [mhchem](https://docs.moodle.org/36/en/Chemistry_notation_using_mhchem) syntax for writing chemical expressions is supported too:
s:{CO2} + C $\rightarrow$ 2s:{CO}

s:{SO4^2-} + s:{Ba^2+} $\rightarrow$ s:{BaSO4}

$C_p[$s:{H2O(l)}$] = 75.3 J / mol K$

s:{CH3CH2OH} $\rightarrow$ s:{NH4+}

## recompilando


## Ejercio:

In order to minimize conflicts there mustn't be spaces at the beginning and end of a formula, and the ending `$` character musn't be followed by a digit. $e^{iπ} + 1 = 0$ If you need to you can escape the `$` character with a backslash.

## mermaid

```mermaid
  graph LR;
  A-->B;
  A-->C;
  B-->|One|D;
  C-->D;
  style D fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5
```

```mermaid
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?
```

## Attachments

Notes can have attachments, because sooner or later you'll want to save a file in a note, be it a boarding pass for your next trip or something else.

Attachments can be added by clicking the attachment into in the mainbar's toolbar. Attachments are simply copied into your data directory, under the `attachments` sub-directory.

You can open/remove them at any time.
