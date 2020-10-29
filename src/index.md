---
  title: Inicio
  subtitle: Desarrollo de una web estática
  date: 26/10/2020
  author: Jall Profesor
  lang: 'es-ES'
  toc-title: 'En esta página'
  css:
    - assets/katex.min.css
    - assets/github.min.css
    - assets/jall.min.css
---
# El proyecto: crear un generador de sitios estáticos.

Una página web *estática* (a veces llamada página plana) es una página web que se entrega al navegador del usuario exactamente como está almacenada en el servidor. Se opone a una página web *dinámica*. Se puede ampliar  esta información en [Wikipedia](https://es.wikipedia.org/wiki/P%C3%A1gina_web_est%C3%A1tica).

En la actualidad es tedioso desarrollar una web de contenido estático escribiendo en html cada una de las páginas que la conforman. Por lo general se usan **generadores de sitios estáticos** escritos en distintos lenguajes de programación que facilitan esa tarea.  En [este enlace (en inglés)](https://iwantmyname.com/blog/the-updated-big-list-of-static-website-generators-for-your-site-blog-or-wiki)
se puede consultar un amplio y actualizado listado de generadores de sitios clasificados por lenguajes de programación.

Aquí no se utilizará ninguno de esos generadores. Crearemos uno desde cero.


# Se usará markdown para escribir el contenido.

En vez de utilizar la farragosa sintaxis del *html* (extensión *.html*) podemos utilizar **markdown** (extensión *.md*) por su simplicidad y rapidez a la hora de escribir el contenido. Si quiere saber más sobre markdown debería consultar [Wikipedia](https://es.wikipedia.org/wiki/Markdown) o [markdown.es](https://markdown.es/). Existen muchos editores específicos para markdown y, además, los principales editores de texto tienen extensiones adaptadas al mismo.

**Markdown** cuenta con unas extensiones (opcionales) que nos permiten escribir casi cualquier tipo de contenido. A modo de ejemplo, algunas de estas extensiones nos permiten escribir texto plano y...

- resaltar de código de programación
  ```javascript
    const js = require('mardown');
  ```
- usar $\LaTeX$ para escribir todo tipo de fórmulas científicas
  $$e^{iπ} + 1 = 0$$
- facilitar la escritura de fórmulas químicas:
    - s:{SO4^2-} + s:{Ba^2+} $\rightarrow$ s:{BaSO4}
    - $C_p[$s:{H2O(l)}$] = 75.3 \frac{J}{mol \cdot K}$
- dibujar diagramas utilizando texto:
  ```mermaid
    graph LR;
    A-->B;
    A-->C;
    B-->|One|D;
    C-->D;
    style D fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5
  ```

# El núcleo del proyecto: compilación con 'pandoc'

Para convertir los documentos escritos en markdown en páginas web se utiliza la potente herramienta **pandoc**.

![Servidor de desarrollo en acción](assets/images/pandoc-servidor.png)

# Web alojada en GitHub Pages

In order to minimize conflicts there mustn't be spaces at the beginning and end of a formula, and the ending `$` character musn't be followed by a digit. $e^{iπ} + 1 = 0$ If you need to you can escape the `$` character with a backslash.
