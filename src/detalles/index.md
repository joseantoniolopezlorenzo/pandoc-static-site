---
  title: Detalles
  title-prefix: Generador de sitio estático con Pandoc
  subtitle: Las herramientas utilizadas en detalle
  description: Explicación detallada de las herramientas y el flujo de trabajo de este generador de contenido estático
  keywords: static generator, web estática, pandoc,markdown, gulp, github pages, katex, mermaid
  lang: 'es-ES'
  toc-title: En esta página
  date: 26/10/2020
  author: Jall Profesor
  css:
    - ../assets/katex.min.css
    - ../assets/github.min.css
    - ../assets/jall.min.css
---

# Requisitos.

## Instalación de Pandoc y filtros.

Es preciso tener instalado **Pandoc** en nuestro ordenador de desarrollo. En [esta dirección](https://pandoc.org/installing.html) encontrará instaladores para Windows, macOS, Linux, etc.

Las extensiones de pandoc que se utilizan en el proyecto son:

- [pandoc-static-katex](https://pypi.org/project/pandoc_static_katex/): Este filtro que usa $\KaTeX$ para representar ecuaciones matemáticas en el momento de la construcción (*build time*). Hace posible mostrar ecuaciones matemáticas escritas en $\LaTeX$ sin ninguna ejecución de JavaScript en el navegador. El archivo **katex.min.css** se encuentra en */dist/assets/katex.min.css* y las fuentes utilizadas por $\KaTeX$ en */dist/assets/fonts*.
- [mermaid-filter](https://github.com/raghur/mermaid-filter): Este filtro permite realizar diagramas de secuencia y otros gráficos en archivos markdown.
- [pandoc-chem-struct](https://github.com/scotthartley/pandoc-chem-struct): es un filtro que convierte estructuras químicas simples en el formato adecuado siendo más fáciles de leer y de escribir.

# Elementos

## Plantilla Pandoc.

Una vez cubierto el paso anterior, necesitaremos una **plantilla html5 pandoc**  que permita la traducción a html. Hemos elegido la plantilla **Github** que encontrará en la carpeta */templates/Github.html* y que ha sido convenientemente adaptada. Asimismo, se necesita el correspondiente archivo de estilos que puede encontrar en */src/assets/github.css*. Finalmente, un archivo con los estilos personales */src/assets/jall.css*. Puede encontrar muchas más plantillas [aquí](https://github.com/topics/pandoc-template)

## html.yaml

Necesitamos un archivo **html.yaml** que nos permita configurar la compilación de Pandoc. Lo puede encontrar en */html.yaml* y que consta del siguiente contenido:
```yaml
from: markdown
to: html5
fail-if-warnings: false
standalone: true
section-divs: true
eol: lf
filters:
  - pandoc-static-katex
  - mermaid-filter
  - pandoc-chem-struct
template: ./templates/GitHub.html
include-in-header:
  - templates/header.txt
toc: true
toc-depth: 3

```

## Archivos markdown y assets.

Se encuentan en la carpeta */src*. Cada archivo *\*.md* será convertido en su correspondiente archivo *\*.html*. Por otro lado, se pueden crear tantas subcarpetas como sean necesarias (este markdown se encuentra, por ejemplo, en */src/detalles/index.md*).

Un elemento importante de los achivos markdown son las cabeceras escritas en markdown que aportan **metainformación** necesaria. Por ejemplo, esta es la cabecera de este archivo:

```yaml

---
  title: Detalles
  title-prefix: Generador de sitio estático con Pandoc
  subtitle: Las herramientas utilizadas en detalle
  description: Explicación detallada de las herramientas y el flujo de trabajo de este generador de contenido estático
  keywords: static generator, web estática, pandoc,markdown, gulp, github pages, katex, mermaid
  lang: 'es-ES'
  toc-title: En esta página
  date: 26/10/2020
  author: Jall Profesor
  css:
    - ../assets/katex.min.css
    - ../assets/github.min.css
    - ../assets/jall.min.css
---
```

Otros campos de metainformación e incluso definir variables se pueden encontrar en el apartado correspondiente de la [documentación](https://pandoc.org/MANUAL.html) de Pandoc.

# Gulp.


# Git.