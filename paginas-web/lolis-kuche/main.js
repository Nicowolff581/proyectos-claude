// Número de WhatsApp para pedidos (código de país + número)
const WHATSAPP_NUMBER = "573176645184";

const money = (n) => "$" + n.toLocaleString("es-CO");

// ---------- Imágenes que faltan (logo.png, abuelo.jpg) ----------
const onMissing = (img) => {
  const mode = img.dataset.fallback;
  img.hidden = true;
  if (mode === "wordmark") img.nextElementSibling.hidden = false;
  if (mode === "arch") img.nextElementSibling.hidden = false;
};
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  if (img.complete && img.naturalWidth === 0) onMissing(img);
  else img.addEventListener("error", () => onMissing(img));
});

// ---------- Menú móvil ----------
const topbar = document.getElementById("top");
const toggle = document.getElementById("navToggle");
const setMenu = (open) => {
  topbar.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
};
toggle.addEventListener("click", () => setMenu(!topbar.classList.contains("is-open")));
document.querySelectorAll("#navMenu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// ---------- Armar el pedido (carrito) ----------
const items = [...document.querySelectorAll(".item")];
const cart = new Map(items.map((el) => [el.dataset.name, 0]));
const lines = document.getElementById("orderLines");
const empty = document.getElementById("orderEmpty");
const totalRow = document.getElementById("orderTotalRow");
const totalEl = document.getElementById("orderTotal");
const sendBtn = document.getElementById("sendOrder");
const cartLink = document.getElementById("cartLink");
const cartCount = document.getElementById("cartCount");
const form = document.getElementById("orderForm");

const priceOf = (name) => Number(items.find((el) => el.dataset.name === name).dataset.price);

function buildMessage() {
  const data = new FormData(form);
  const picked = [...cart].filter(([, q]) => q > 0);
  let text = "¡Hola, Loli's Küche! Quiero hacer un pedido:\n\n";
  if (picked.length) {
    text += picked.map(([name, q]) => `• ${q} × ${name}`).join("\n");
    const total = picked.reduce((sum, [name, q]) => sum + q * priceOf(name), 0);
    text += `\n\nTotal productos: ${money(total)} (sin domicilio)`;
  } else {
    text += "• Cantidad × Salchicha:";
  }
  text += `\n\nNombre: ${data.get("name").trim()}`;
  text += `\nDirección de entrega: ${data.get("address").trim()}`;
  text += `\nPago: ${data.get("pay")}`;
  return text;
}

function render() {
  const picked = [...cart].filter(([, q]) => q > 0);
  lines.innerHTML = "";
  let total = 0;
  picked.forEach(([name, q]) => {
    const sub = q * priceOf(name);
    total += sub;
    const li = document.createElement("li");
    li.innerHTML = `<span>${q} × ${name}</span><span>${money(sub)}</span>`;
    lines.appendChild(li);
  });
  empty.hidden = picked.length > 0;
  totalRow.hidden = picked.length === 0;
  totalEl.textContent = money(total);

  items.forEach((el) => {
    const q = cart.get(el.dataset.name);
    el.querySelector(".qty__val").textContent = q;
    el.querySelector(".qty").hidden = q === 0;
    el.querySelector(".card__add").hidden = q > 0;
    el.classList.toggle("is-picked", q > 0);
  });

  // Carrito del menú superior
  const count = picked.reduce((sum, [, q]) => sum + q, 0);
  cartCount.textContent = count;
  cartLink.setAttribute("aria-label", `Tu carrito: ${count} ${count === 1 ? "artículo" : "artículos"}`);

  sendBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
}

const bumpCart = () => {
  cartLink.classList.remove("bump");
  void cartLink.offsetWidth; // reinicia la animación
  cartLink.classList.add("bump");
};

items.forEach((el) => {
  const name = el.dataset.name;
  el.querySelector(".card__add").addEventListener("click", () => {
    cart.set(name, 1);
    render();
    bumpCart();
    el.querySelector('.qty__btn[data-step="1"]').focus();
  });
  el.querySelectorAll(".qty__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const step = Number(btn.dataset.step);
      cart.set(name, Math.max(0, cart.get(name) + step));
      render();
      if (step > 0) bumpCart();
      if (cart.get(name) === 0) el.querySelector(".card__add").focus();
    });
  });
});

// ---------- Filtrar y ordenar la tienda ----------
const grid = document.getElementById("productGrid");
const countEl = document.getElementById("shopCount");
const sortBy = document.getElementById("sortBy");
const chips = [...document.querySelectorAll(".chip")];
let filter = "all";

function updateShop() {
  const sorters = {
    relevance: (a, b) => a.dataset.order - b.dataset.order,
    "price-asc": (a, b) => a.dataset.price - b.dataset.price || a.dataset.order - b.dataset.order,
    "price-desc": (a, b) => b.dataset.price - a.dataset.price || a.dataset.order - b.dataset.order,
    az: (a, b) => a.dataset.name.localeCompare(b.dataset.name, "es"),
    za: (a, b) => b.dataset.name.localeCompare(a.dataset.name, "es"),
  };
  [...items].sort(sorters[sortBy.value]).forEach((el) => grid.appendChild(el));
  let shown = 0;
  items.forEach((el) => {
    const show = filter === "all" || el.dataset.group === filter;
    el.hidden = !show;
    if (show) shown++;
  });
  countEl.textContent = `${shown} ${shown === 1 ? "producto" : "productos"}`;
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filter = chip.dataset.filter;
    chips.forEach((c) => {
      c.classList.toggle("is-active", c === chip);
      c.setAttribute("aria-pressed", String(c === chip));
    });
    updateShop();
  });
});
sortBy.addEventListener("change", updateShop);
form.addEventListener("input", render);
form.addEventListener("submit", (e) => e.preventDefault());
render();

// ---------- Copiar el mensaje de ejemplo ----------
const copyBtn = document.getElementById("copyTemplate");
const copyMsg = document.getElementById("copyMsg");
const tpl = document.getElementById("templateText");
copyBtn.addEventListener("click", () => {
  const selectText = () => {
    const range = document.createRange();
    range.selectNodeContents(tpl);
    const sel = getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    copyMsg.textContent = "Texto seleccionado: cópialo con Ctrl+C o mantén presionado.";
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(tpl.textContent)
      .then(() => { copyMsg.textContent = "Mensaje copiado."; })
      .catch(selectText);
  } else {
    selectText();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
