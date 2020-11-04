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

## Instalación de Pandoc y Gulp.

Es preciso tener instalado **Pandoc** en nuestro ordenador de desarrollo. En [esta dirección](https://pandoc.org/installing.html) encontrará instaladores para Windows, macOS, Linux, etc.

Las extensiones de pandoc que se utilizan en el proyecto son:

- [pandoc-static-katex](https://pypi.org/project/pandoc_static_katex/): Este filtro que usa $\KaTeX$ para representar ecuaciones matemáticas en el momento de la construcción (*build time*). Hace posible mostrar ecuaciones matemáticas escritas en $\LaTeX$ sin ninguna ejecución de JavaScript en el navegador. El archivo **katex.min.css** se encuentra en */dist/assets/katex.min.css* y las fuentes utilizadas por $\KaTeX$ en */dist/assets/fonts*.
- [mermaid-filter](https://github.com/raghur/mermaid-filter): Este filtro permite realizar diagramas de secuencia y otros gráficos en archivos markdown.
- [pandoc-chem-struct](https://github.com/scotthartley/pandoc-chem-struct): es un filtro que convierte estructuras químicas simples en el formato adecuado siendo más fáciles de leer y de escribir.

Otro requisito imprescindible es tener instalado **nodejs** para poder utilizar el automatizador de tareas **Gulp**. Se puede revisar el archivo *package.json* para ver los paquetes utilizados en el proyecto. No olvide ejecutar en el terminal si ha clonado el repositorio:

```bash
$ npm install
```

# Elementos de contenido.

## Plantilla Pandoc.

Una vez cubierto el paso anterior, necesitaremos una **plantilla html5 pandoc**  que permita la traducción a html. Hemos elegido la plantilla **Github** que encontrará en la carpeta */templates/Github.html* y que ha sido convenientemente adaptada. Asimismo, se necesita el correspondiente archivo de estilos que puede encontrar en */src/assets/github.css*. Es altamente recomendable leer con detalle y tratar de entender esta plantilla para hacerse una idea de cómo funciona **Pandoc**. Finalmente, un archivo con los estilos personales */src/assets/jall.css*. Puede encontrar muchas más plantillas [aquí](https://github.com/topics/pandoc-template)


## html.yaml

Necesitamos un archivo **html.yaml** que nos permita configurar la compilación de Pandoc y así evitar una enorme línea de comando de conversión. Lo puede encontrar en */html.yaml*:
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

Se encuentan en la carpeta */src*. Cada archivo *\*.md* será convertido en su correspondiente archivo *\*.html*. Por otro lado, se pueden crear tantas subcarpetas como sean necesarias (este markdown se encuentra, por ejemplo, en */src/detalles/index.md*). La carpeta assets será copiada a */dist* después de un minimizado de los archivos *css*.

Un elemento importante de los achivos markdown son las cabeceras escritas en yaml que aportan **metadatos** específicos de cada archivo a la hora de la conversión en páginas web. Por ejemplo, la cabecera del archivo correspondiente a esta página web es:

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

Casi todos los metadatos son opcionales salvo el título de la página y los archivos *css* usados en la página.
Un detalle importante: estos datos deben tener una regla que los trate en la plantilla *GitHub.html*. Por ejemplo, a los metadatos:
```yaml
css:
    - ../assets/katex.min.css
    - ../assets/github.min.css
    - ../assets/jall.min.css
```
le corresponde el siguiente fragmento en la plantilla:
```html
$for(css)$
  <link rel="stylesheet" href="$css$">
$endfor$
```

Otros campos de metadatos predefinidos y opcionales e incluso cómo definir variables propias se pueden encontrar en el apartado correspondiente de la [documentación](https://pandoc.org/MANUAL.html) de Pandoc.

# Gulp.

El proyecto utiliza **Gulp** para dos tareas principales:

| Tareas | gulpfile.js|
|----|----|
|automatizar la conversión de markdown a html|*gulp.task("**convert-md**")*|
|pequeño servidor de desarrollo local|*gulp.task("**server**")*|

*gulp.task("convert-md")* (líneas 12 a 39 del *gulpfile.js*) ejecuta **Pandoc** sobre los archivos *.md* la carpeta */src* y mueve los *.html* resultantes a la carpeta */dist*. Esto se realiza con la extensión [**gulp-exec**](https://github.com/robrich/gulp-exec).

Para lanzar el servidor de desarrollo ejecute:

```bash
npm start
```
Su salida debería verse similar a esta:

```
> gulp default --options false

[09:10:30] Using gulpfile ~/Proyectos/Pandoc/pandoc-static-site/gulpfile.js
[09:10:30] Starting 'default'...
[09:10:30] Starting 'server'...
[09:10:30] Starting 'convert-md'...
[09:10:33] Finished 'convert-md' after 3.63 s
[09:10:33] Starting 'minify-css'...
[09:10:33] Finished 'minify-css' after 121 ms
[09:10:33] Starting 'cp-images'...
[09:10:33] Finished 'cp-images' after 29 ms
[09:10:33] Starting '<anonymous>'...
[Browsersync] Access URLs:
 -----------------------------------
       Local: http://localhost:3000
    External: http://172.19.0.1:3000
 -----------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 -----------------------------------
[Browsersync] Serving files from: ./dist
```
Puede trabajar en elaborar su contenido mientras que el servidor estará observando y esperando cambios; se encargará de actualizar la salida en el navegador cuando detecte cambios en *.md*, *.css* y la carpeta de *images*

# Git.