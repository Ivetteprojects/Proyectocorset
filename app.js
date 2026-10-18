/* =========================================================
   ÉLORA - app.js
   Uso explícito de JavaScript puro + jQuery
   ========================================================= */

/* ---------- 1. DATOS DE LOS PRODUCTOS ---------- */

const TALLAS = ['XS', 'S', 'M', 'L', 'XL'];

const ETIQUETAS = {
  corseteria: 'Corsetería',
  brasieres: 'Brasieres',
  bragas: 'Bragas',
  conjuntos: 'Conjuntos'
};

const productos = [
  {
    id: 1,
    nombre: 'Corsé Aurora',
    categoria: 'corseteria',
    precio: 1490,
    imagen: 'images/Corse-Aurora.png',
    alt: 'Corsé color vino con cordones al frente',
    descripcion: 'Corsé entallado con cordones frontales que define la cintura sin perder comodidad.',
    detalles: ['Satén elástico con forro de algodón', 'Varillas flexibles', 'Lavado a mano con agua fría']
  },
  {
    id: 2,
    nombre: 'Corsé Seda Rosa',
    categoria: 'corseteria',
    precio: 1890,
    imagen: 'images/Corse-seda-rosa.png',
    alt: 'Corsé color rosa empolvado con cordones al frente',
    descripcion: 'Versión en rosa empolvado con acabado de seda y cierre frontal de ganchos.',
    detalles: ['Mezcla de seda y poliamida', 'Cierre frontal de ganchos', 'Lavado en seco']
  },
  {
    id: 3,
    nombre: 'Bralette Encaje Rosa',
    categoria: 'brasieres',
    precio: 690,
    imagen: 'images/bralette-encaje.png',
    alt: 'Bralette de encaje rosa con tirantes finos',
    descripcion: 'Bralette ligero sin varillas, ideal para uso diario o para dormir.',
    detalles: ['Encaje elástico suave', 'Sin varillas ni relleno', 'Tirantes ajustables']
  },
  {
    id: 4,
    nombre: 'brasier Copa Vino',
    categoria: 'brasieres',
    precio: 790,
    imagen: 'images/brasier-copa.png',
    alt: 'Brasier color vino de copa completa con tirantes',
    descripcion: 'Brasier de copa completa con banda ancha para un soporte firme.',
    detalles: ['Copa moldeada sin relleno', 'Banda ancha con tres broches', 'Lavado a mano']
  },
  {
    id: 5,
    nombre: 'Braga Alta de Encaje',
    categoria: 'bragas',
    precio: 320,
    imagen: 'images/braga-alta.png',
    alt: 'Braga de tiro alto color vino con encaje en la cintura',
    descripcion: 'Braga de tiro alto con encaje en la cintura y entrepierna de algodón.',
    detalles: ['Algodón con encaje elástico', 'Tiro alto', 'Se puede lavar a máquina en ciclo delicado']
  },
  {
    id: 6,
    nombre: 'Conjunto Noche',
    categoria: 'conjuntos',
    precio: 1350,
    imagen: 'images/conjunto-noche.png',
    alt: 'Conjunto de brasier y braga en tonos vino oscuro y rosa',
    descripcion: 'Conjunto de brasier y braga a juego, con detalles en encaje rosa.',
    detalles: ['Incluye brasier y braga', 'Tul y encaje', 'Lavado a mano']
  }
];

/* ---------- 2. FUNCIONES DE APOYO Y UTILIDADES ---------- */

const formatoMoneda = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

const normalizar = (texto = '') => 
  texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const escapeHTML = (str = '') => 
  str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));

const buscarProducto = (id) => productos.find(p => p.id === id);

/* ---------- 3. CATÁLOGO (JavaScript Puro) ---------- */

const contenedorProductos = document.getElementById('productGrid');

const crearTarjeta = (p) => {
  const opcionesTalla = TALLAS.map(t => `<option value="${t}">${t}</option>`).join('');

  return `
    <div class="col producto" data-id="${p.id}" data-categoria="${escapeHTML(p.categoria)}">
      <article class="card product-card h-100 shadow-sm border-0">
        <img src="${escapeHTML(p.imagen)}" class="card-img-top" alt="${escapeHTML(p.alt)}" width="600" height="600" loading="lazy">
        <div class="card-body d-flex flex-column">
          <p class="product-cat text-muted small mb-1">${ETIQUETAS[p.categoria] || 'General'}</p>
          <h3 class="card-title h5">${escapeHTML(p.nombre)}</h3>
          <p class="product-price fw-bold text-dark fs-5 mb-3">${formatoMoneda.format(p.precio)}</p>

          <div class="mb-3">
            <label for="talla-${p.id}" class="form-label small">Talla:</label>
            <select id="talla-${p.id}" class="form-select form-select-sm talla-select">
              <option value="" selected>Elige tu talla</option>
              ${opcionesTalla}
            </select>
            <div class="invalid-feedback">Elige una talla antes de agregar.</div>
          </div>

          <div class="acciones mt-auto d-flex gap-2">
            <button type="button" class="btn btn-outline-secondary btn-sm flex-fill"
                    data-bs-toggle="modal" data-bs-target="#productModal" data-id="${p.id}">Detalles</button>
            <button type="button" class="btn btn-vino btn-sm flex-fill btn-agregar" data-id="${p.id}">Agregar</button>
          </div>
        </div>
      </article>
    </div>`;
};

const renderizarCatalogo = () => {
  if (!contenedorProductos) return;
  contenedorProductos.innerHTML = productos.map(crearTarjeta).join('');
};

/* ---------- 4. FILTROS Y BÚSQUEDA (JavaScript Puro) ---------- */

let categoriaActiva = 'todos';
let textoBusqueda = '';

const botonesFiltro = document.querySelectorAll('.btn-filtro');
const campoBusqueda = document.getElementById('searchInput');
const mensajeSinResultados = document.getElementById('noResults');
const contadorResultados = document.getElementById('resultCount');

const aplicarFiltros = () => {
  let visibles = 0;
  const busquedaLimpia = normalizar(textoBusqueda.trim());

  productos.forEach(p => {
    const columna = contenedorProductos?.querySelector(`.producto[data-id="${p.id}"]`);
    if (!columna) return;

    const coincideCategoria = categoriaActiva === 'todos' || p.categoria === categoriaActiva;
    const coincideNombre = normalizar(p.nombre).includes(busquedaLimpia);
    const mostrar = coincideCategoria && coincideNombre;

    columna.classList.toggle('d-none', !mostrar);
    if (mostrar) visibles++;
  });

  if (mensajeSinResultados) mensajeSinResultados.hidden = visibles !== 0;
  if (contadorResultados) contadorResultados.textContent = `Productos mostrados: ${visibles} de ${productos.length}`;
};

botonesFiltro.forEach(boton => {
  boton.addEventListener('click', () => {
    categoriaActiva = boton.dataset.categoria;

    botonesFiltro.forEach(otro => {
      const esActivo = otro === boton;
      otro.classList.toggle('active', esActivo);
      otro.setAttribute('aria-pressed', esActivo);
    });

    aplicarFiltros();
  });
});

campoBusqueda?.addEventListener('input', (e) => {
  textoBusqueda = e.target.value;
  aplicarFiltros();
});

/* ---------- 5. MODAL DE PRODUCTO (Bootstrap Native API + JS) ---------- */

const modalProducto = document.getElementById('productModal');

modalProducto?.addEventListener('show.bs.modal', (evento) => {
  const id = Number(evento.relatedTarget.dataset.id);
  const p = buscarProducto(id);
  if (!p) return;

  document.getElementById('productModalTitle').textContent = p.nombre;
  document.getElementById('modalCategory').textContent = ETIQUETAS[p.categoria] || '';
  document.getElementById('modalPrice').textContent = formatoMoneda.format(p.precio);
  document.getElementById('modalDescription').textContent = p.descripcion;
  document.getElementById('modalSizes').textContent = TALLAS.join(', ');

  const imagen = document.getElementById('modalImage');
  imagen.src = p.imagen;
  imagen.alt = p.alt;

  document.getElementById('modalDetails').innerHTML = p.detalles
    .map(detalle => `<li>${escapeHTML(detalle)}</li>`)
    .join('');
});

/* ---------- 6. CARRITO E INTERACCIONES DIVERSIFICADAS (jQuery) ---------- */

let carrito = JSON.parse(localStorage.getItem('elora_cart')) || [];

const guardarCarrito = () => {
  localStorage.setItem('elora_cart', JSON.stringify(carrito));
};

const agregarAlCarrito = (id, talla) => {
  const existente = carrito.find(item => item.id === id && item.talla === talla);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ id, talla, cantidad: 1 });
  }
  guardarCarrito();
};

// Renderizado del Carrito mediante jQuery
const dibujarCarrito = () => {
  const $lista =$('#cartItems').empty();
  let total = 0;
  let unidades = 0;

  carrito.forEach(item => {
    const p = buscarProducto(item.id);
    if (!p) return;

    const subtotal = p.precio * item.cantidad;
    total += subtotal;
    unidades += item.cantidad;

    $lista.append(`
      <li class="cart-item py-2 border-bottom">
        <div class="cart-item-top d-flex justify-content-between align-items-center">
          <span class="cart-item-name fw-bold">${escapeHTML(p.nombre)}</span>
          <button type="button" class="btn btn-link btn-sm text-danger p-0 btn-quitar" data-id="${item.id}" data-talla="${item.talla}">Quitar</button>
        </div>
        <p class="cart-item-meta text-muted small mb-1">Talla ${escapeHTML(item.talla)} | ${formatoMoneda.format(p.precio)} c/u</p>
        <div class="cart-item-bottom d-flex justify-content-between align-items-center">
          <div class="cart-qty-control btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary btn-menos" data-id="${item.id}" data-talla="${item.talla}" aria-label="Disminuir cantidad">−</button>
            <span class="btn btn-light disabled text-dark px-2">${item.cantidad}</span>
            <button type="button" class="btn btn-outline-secondary btn-mas" data-id="${item.id}" data-talla="${item.talla}" aria-label="Aumentar cantidad">+</button>
          </div>
          <strong class="text-dark">${formatoMoneda.format(subtotal)}</strong>
        </div>
      </li>`);
  });

  if (carrito.length === 0) {
    $lista.append('<li class="cart-vacio text-center text-muted py-3 small">Tu carrito está vacío. Elige una talla y agrega productos.</li>');
  }

  $('#cartTotal').text(formatoMoneda.format(total));
  $('#cartCount').text(unidades);
  $('#btnCheckout, #btnClear').prop('disabled', carrito.length === 0);
};

// Delegación de Eventos en jQuery
$('#productGrid').on('click', '.btn-agregar', function () {
  const id = Number($(this).data('id'));
  const $select =$(this).closest('.product-card').find('.talla-select');
  const talla = $select.val();
  const producto = buscarProducto(id);

  if (!talla) {
    $select.addClass('is-invalid').trigger('focus');
    mostrarAviso('warning', `Elige una talla para agregar «${producto.nombre}».`);
  } else {
    agregarAlCarrito(id, talla);
    dibujarCarrito();
    $select.removeClass('is-invalid');
    mostrarAviso('success', `«${producto.nombre}» (${talla}) agregado al carrito.`);
  }
});

$('#cartItems').on('click', '.btn-mas, .btn-menos, .btn-quitar', function () {
  const $btn =$(this);
  const id = Number($btn.data('id'));
  const talla = String($btn.data('talla'));
  const item = carrito.find(e => e.id === id && e.talla === talla);

  if (!item) return;

  if ($btn.hasClass('btn-mas')) item.cantidad += 1;
  else if ($btn.hasClass('btn-menos')) item.cantidad -= 1;
  else if ($btn.hasClass('btn-quitar')) item.cantidad = 0;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(e => e !== item);
  }

  guardarCarrito();
  dibujarCarrito();
});

$('#btnClear').on('click', () => {
  carrito = [];
  guardarCarrito();
  dibujarCarrito();
  mostrarAviso('info', 'Carrito vaciado.');
});

$('#btnCheckout').on('click', () => {
  const total = $('#cartTotal').text();
  carrito = [];
  guardarCarrito();
  dibujarCarrito();
  mostrarAviso('success', `Compra de prueba confirmada por ${total}. ¡Gracias por visitar ÉLORA!`);
});

/* ---------- 7. NOTIFICACIONES FLOTANTES CON JQUERY ---------- */

function mostrarAviso(tipo, mensaje) {
  $('#cartAlert')
    .stop(true, true)
    .removeClass('alert-success alert-warning alert-info alert-danger')
    .addClass(`alert-${tipo}`)
    .text(mensaje)
    .fadeIn(200)
    .delay(2600)
    .fadeOut(400);
}

/* ---------- 8. FORMULARIO DE CONTACTO (Validación JS + Respuesta jQuery) ---------- */

const formulario = document.getElementById('contactForm');

function mostrarAvisoFormulario(tipo, mensaje) {
  $('#formAlert')
    .removeClass('alert-success alert-danger')
    .addClass(`alert-${tipo}`)
    .text(mensaje)
    .hide()
    .slideDown(250);
}

formulario?.addEventListener('submit', (evento) => {
  evento.preventDefault();

  if (!formulario.checkValidity()) {
    formulario.classList.add('was-validated');
    mostrarAvisoFormulario('danger', 'Por favor, llena correctamente todos los campos marcados.');
    return;
  }

  const { nombre, motivo, preferencia } = formulario.elements;

  mostrarAvisoFormulario(
    'success',
    `Gracias, ${escapeHTML(nombre.value.trim())}. Recibimos tu consulta sobre ${motivo.value} y te contactaremos por ${preferencia.value}.`
  );

  formulario.reset();
  formulario.classList.remove('was-validated');
});

/* ---------- 9. INICIALIZACIÓN ---------- */

document.addEventListener('DOMContentLoaded', () => {
  renderizarCatalogo();
  aplicarFiltros();
  dibujarCarrito();
});