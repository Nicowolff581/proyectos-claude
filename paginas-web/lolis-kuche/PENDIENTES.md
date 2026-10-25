# Loli's Küche: dónde quedamos (25 de octubre de 2026)

Nota para seguir en otro chat con Claude. Nico no sabe programar: explícale en español y sin términos técnicos.

## Lo que ya está hecho
- La página está en `paginas-web/lolis-kuche/` (repositorio `proyectos-claude`).
- La sección «Tienda» copia la idea de la tienda de La Parisienne (laparisienne.com.co/collections/salchichas): tarjetas con foto, ingredientes, presentación, precio y «Añadir al carrito»; filtros «Todas · Paquetes de 3 · Paquetes de 400 g»; «Ordenar por»; carrito arriba a la derecha. El pedido sale por WhatsApp con el total.
- Fotos de producto nuevas hechas con ChatGPT, sin empaque y en una escena bávara.

## Estado de las fotos (`fotos/`, cuadradas de 800 × 800, JPG)

| Producto | Archivo | Estado |
|---|---|---|
| Blanca | `blanca.jpg` | ✅ Foto nueva |
| Berna | `berna.jpg` | ✅ Foto nueva |
| Bockwurst | `bockwurst.jpg` | ✅ Foto nueva |
| La Macha (paquete de 4) | `la-macha.jpg` | ✅ Foto nueva |
| La Macha Ahumada (paquete de 5 rojas) | `la-macha-ahumada.jpg` | ✅ Foto nueva |
| Thüringer | `thuringer.jpg` | ⏳ Todavía es la foto del paquete con sticker |
| Española | `espanola.jpg` | ⏳ Todavía es la foto del paquete con sticker |
| Merguez | (no hay) | ⏳ Nico aún no tiene foto; la tarjeta muestra «Foto próximamente» |

## Pendiente
1. Hacer en ChatGPT las fotos de la **Thüringer** y la **Española**, y reemplazar `thuringer.jpg` y `espanola.jpg`. Pasarlas a 800 × 800 y cambiar su texto `alt` en `index.html` (ya no es «Paquete al vacío…»).
2. Foto de la **Merguez**, cuando Nico la tenga.
3. Confirmar con Nico cuántas unidades trae **La Macha Ahumada**: la página dice «4 unidades · 100 g c/u», pero el paquete de la foto tiene 5.

## La escena que usan todas las fotos (para que salgan iguales)
Vista desde arriba y formato cuadrado. Tabla de madera rústica sobre un mantel de rombos azules y blancos (el de Baviera). Un pocillo de mostaza arriba a la izquierda y perejil a la izquierda y abajo a la derecha. **Sin pretzel.** Las salchichas van sin empaque, sin etiqueta y sin escarcha, acostadas en horizontal, una debajo de otra, con su color y textura reales.

Lo que Nico pidió corregir en ChatGPT (para tenerlo en cuenta):
- La **Blanca** tiene que ser blanca y lisa, sin puntitos, para que no se parezca a la Bockwurst.
- En la **Berna**, la tocineta va cruda, enrollada en espiral y bien separada de la salchicha (no fundida con ella).
- **La Macha** es rosado rojiza, de grano fino, sin manchas blancas grandes, recta y de aspecto casero.

Mensaje para ChatGPT (en el mismo chat de las otras fotos, adjuntando la foto real del paquete):

```
Ahora haz lo mismo con esta foto. Misma escena exacta que las anteriores; solo cambia las salchichas.
Son: 3 salchichas Thüringer, de ternera y cerdo con finas hierbas.
```
(Para la Española: «Son: 3 salchichas Española, de ternera y cerdo, rojizas, con suave picante.»)
