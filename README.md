# ÉLORA — Tienda en línea de corsetería y lencería

**Proyecto integrador final · Desarrollo Web Front-End**
**Temática:** productos (catálogo de una tienda ficticia de corsetería y lencería).
**Paleta:** vino `#6B1D33`, rosa empolvado `#E5C5C3` y crema `#FBF5EC`.

Es una tienda de **demostración**: no tiene servidor, base de datos, inicio de sesión ni pagos reales. Todos los productos, precios y datos de contacto son ficticios.

## Cómo ejecutarlo

1. Guarda la carpeta `elora/` completa en tu computadora, respetando esta estructura:

   ```text
   elora/
   ├── index.html
   ├── README.md
   ├── css/
   │   └── styles.css
   ├── js/
   │   └── app.js
   └── images/
       ├── corse-aurora.svg
       ├── corse-seda-rosa.svg
       ├── bralette-encaje.svg
       ├── brasier-copa.svg
       ├── braga-alta.svg
       └── conjunto-noche.svg
   ```

2. Abre `index.html` con doble clic (o arrástralo a Chrome, Edge o Firefox).
3. Opcional, en Visual Studio Code: instala la extensión **Live Server**, haz clic derecho sobre `index.html` y elige *Open with Live Server*.

> **Necesitas conexión a internet** la primera vez, porque Bootstrap, jQuery y las tipografías se cargan desde CDN. Sin internet la página abre, pero sin esos estilos y sin el carrito.

## Tecnologías y versiones

| Tecnología | Versión / uso |
| --- | --- |
| HTML5 | Documento semántico, un solo archivo `index.html` |
| CSS3 | Hoja externa `css/styles.css` |
| JavaScript | Archivo externo `js/app.js`, cargado con `defer` |
| jQuery | **3.7.1** (CDN `code.jquery.com`) |
| Bootstrap | **5.3.3** (CDN `cdn.jsdelivr.net`), CSS y bundle JS |
| Tipografías | Cormorant Garamond y Jost (Google Fonts) |

## Dónde se aplicó cada requisito

### HTML5 (`index.html`)

| Requisito | Dónde está |
| --- | --- |
| `<!DOCTYPE html>`, `lang="es"`, UTF-8 y viewport | Primeras líneas del archivo |
| `title` descriptivo | `<title>ÉLORA \| Corsetería y lencería</title>` |
| `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` | `header` con la `nav`; `main` con 4 `section`; cada tarjeta es un `article` (creado en `app.js`); el carrito es un `aside`; al final un `footer` |
| Encabezados h1 a h6 | Un `h1` en el hero, `h2` por sección, `h3` en pasos, tarjetas y carrito, `h2` con apariencia pequeña (`h6`) en el pie |
| Párrafos, enlaces, imágenes con `alt`, listas | Enlaces de navegación; `<img alt="...">` en hero, tarjetas y modal; `ul` (menú, contacto, pie) y `ol` (sección «Cómo comprar») |
| `strong` y `em` | Hero («colección Otoño 2026», «no se realiza ningún pago») y casilla del formulario |
| Enlaces a secciones principales | Menú y pie: `#inicio`, `#coleccion`, `#como-comprar`, `#contacto`, `#carrito` |

### CSS3 (`css/styles.css`)

| Requisito | Dónde está |
| --- | --- |
| Hoja externa | `<link rel="stylesheet" href="css/styles.css">` (sin estilos en línea) |
| Selectores de etiqueta, clase e ID | `body`, `h1, h2, h3` · `.seccion`, `.product-card` · `#inicio`, `#cartTotal` |
| Selectores de atributo | `input[type="search"]`, `input[type="checkbox"]`, `a[href^="#"]`, `.product-card img[alt]` |
| Descendiente e hijo | `.pie ul li`, `#carrito h3` · `.product-card > .card-body` |
| Pseudoclases | `:hover` (tarjetas, menú), `:focus` (formulario, menú), `:first-child` y `:nth-child(even)` (carrito), `:nth-child(2)` y `:last-child` (pasos), `:focus-visible` |
| Pseudoelementos | `::before` (arco del hero y números de los pasos), `::after` (línea bajo los títulos y subrayado del menú) |
| Flexbox | `.filtros`, `.filtros-categorias`, `.cart-item-top`, `.carrito-total` |
| CSS Grid | `.tienda-layout` (catálogo + carrito) y `.pasos` (3 columnas) |
| Media queries | Sección 13 del archivo: `991.98px`, `767.98px`, `575.98px` y `prefers-reduced-motion` |

### JavaScript y jQuery (`js/app.js`)

| Requisito | Dónde está |
| --- | --- |
| Archivo externo con `defer` | `<script src="js/app.js" defer>` |
| `let` y `const` | `const productos`, `const TALLAS`; `let categoriaActiva`, `let textoBusqueda`, `let carrito` |
| Tipos de datos y operadores | Números (precios), cadenas, booleanos, arreglos y objetos; `+`, `*`, `+=`, `===`, `&&`, `!` |
| Condicionales | `if / else if / else` al sumar o restar cantidades; `if / else` al validar la talla; `||` y `&&` en `aplicarFiltros()` |
| Eventos | `click` (filtros, agregar, cantidades), `input` (buscador), `change` (talla), `submit` (formulario), `show.bs.modal` (modal) |
| Manipulación del DOM | `innerHTML`, `textContent`, `classList.toggle`, `setAttribute`, `hidden` |
| **jQuery explícito** | Sección 6 (carrito), 7 (avisos y menú móvil) y `mostrarAvisoFormulario()`: `$()`, `.on()`, `.append()`, `.text()`, `.addClass()`, `.fadeIn()`, `.slideDown()`, `.prop()` |
| Interacción útil | Filtro por categoría, búsqueda local por nombre, selección de talla y carrito con total |
| `console.log` | No se dejó ninguno: se usaron durante el desarrollo y se retiraron |

### Formulario y Bootstrap

| Requisito | Dónde está |
| --- | --- |
| Varios tipos de campo | `text`, `email`, `tel`, `select`, `radio`, `textarea` y `checkbox` |
| `label` con `for`/`id`, `fieldset` y `legend` | Formulario de la sección `#contacto` (3 `fieldset`) |
| Validación nativa | `required`, `type="email"`, `pattern`, `minlength`, `maxlength` |
| Clases Bootstrap de formulario | `form-label`, `form-control`, `form-select`, `form-check`, `mb-3`, `btn`, `invalid-feedback` |
| Respuesta al enviar | Mensaje verde de éxito o rojo de error (jQuery `slideDown`), sin afirmar que se envió a un servidor |
| Rejilla Bootstrap | `container`, `row`, `col-lg-*`, `col-md-*`, `row-cols-md-2` |
| Utilidades | `d-flex`, `gap-2`, `mt-4`, `mb-3`, `d-grid`, `align-items-center`, `visually-hidden` |
| Navbar responsiva colapsable | `navbar navbar-expand-lg` con `navbar-toggler` y `collapse navbar-collapse` |
| Tarjetas | `card`, `card-img-top`, `card-body`, `card-title` |
| Componente interactivo | **Modal** de producto (`#productModal`); también funciona el menú colapsable |
| Botones y alertas | `btn`, `btn-lg`, `btn-sm`; `alert-success`, `alert-warning`, `alert-info`, `alert-danger` |

## Funciones de la tienda

1. Catálogo de 6 productos con imagen, nombre y precio (datos en el arreglo `productos`).
2. Filtro por categoría y búsqueda por nombre (ignora mayúsculas y acentos).
3. Selección de talla (XS a XL); sin talla no se puede agregar.
4. Carrito con cantidades (+, −, Quitar), total, vaciar y «Finalizar compra (demo)».
5. Modal con la información del producto.
6. Formulario de contacto validado con mensaje de confirmación.
7. Diseño adaptable a computadora, tableta y celular.

## Pruebas realizadas

- Abre sin errores en la consola (Chromium).
- Sin desbordamiento horizontal a 1280 px y a 390 px de ancho.
- Navbar: se abre en móvil y se cierra al elegir un enlace.
- Filtros, búsqueda, tallas, carrito, modal y formulario (caso inválido y caso válido).

## Recursos externos y fuentes

- Bootstrap 5.3.3 (MIT): <https://getbootstrap.com>
- jQuery 3.7.1 (MIT): <https://jquery.com>
- Google Fonts, Cormorant Garamond y Jost (licencia OFL): <https://fonts.google.com>
- Imágenes: ilustraciones vectoriales (SVG) propias, hechas para este proyecto. Se pueden reemplazar por fotografías propias cambiando la ruta `imagen` de cada producto en `js/app.js`.
