# Biblioteca de funciones de texto

## Cómo ejecutarlo

Desde la carpeta del ejercicio, en el Dev Container (o en cualquier equipo con Node.js 24):

```bash
npm install            # instala las dependencias (el contenedor ya lo hace al crearse)
npm start              # demostración de la biblioteca (src/main.js)
npm test               # tests con Vitest
npm run lint           # ESLint
npm run format         # Prettier: formatea el código
npm run format:check   # Prettier: solo comprueba el formato
```

## Salida

```text
1. Ñandú
2. El Señor De Los Anillos
3. 3 palabras
4. 5202 CEWD
5. true · false
6. Desarrollo web…
7. Desarrollo we...
8. No seas ***** que eso es ***
9. Ana · Ana y Luis · Ana, Luis y Eva
10. ❌ RangeError: Longitud máxima no válida: 0
```

## Tests

Salida de `npx vitest run --reporter=verbose` (es `npm test` con el nombre de cada test a la vista):

```text
 RUN  v5.0.5 /w

 ✓ tests/texto.test.js > capitalizar > pone en mayúscula la primera letra 1ms
 ✓ tests/texto.test.js > capitalizar > respeta las letras con tilde o eñe 0ms
 ✓ tests/texto.test.js > capitalizar > no cambia el resto del texto 0ms
 ✓ tests/texto.test.js > capitalizar > devuelve una cadena vacía si el texto está vacío 0ms
 ✓ tests/texto.test.js > capitalizarPalabras > pone en mayúscula la primera letra de cada palabra y en minúscula el resto 0ms
 ✓ tests/texto.test.js > capitalizarPalabras > devuelve la misma palabra capitalizada si solo hay una 0ms
 ✓ tests/texto.test.js > capitalizarPalabras > devuelve una cadena vacía si el texto está vacío 0ms
 ✓ tests/texto.test.js > capitalizarPalabras > no modifica el texto original 0ms
 ✓ tests/texto.test.js > contarPalabras > cuenta las palabras separadas por un espacio 0ms
 ✓ tests/texto.test.js > contarPalabras > ignora los espacios repetidos y los de los extremos 0ms
 ✓ tests/texto.test.js > contarPalabras > devuelve 0 si el texto está vacío 0ms
 ✓ tests/texto.test.js > contarPalabras > devuelve 0 si el texto solo tiene espacios 0ms
 ✓ tests/texto.test.js > invertir > invierte el orden de los caracteres 0ms
 ✓ tests/texto.test.js > invertir > devuelve una cadena vacía si el texto está vacío 0ms
 ✓ tests/texto.test.js > invertir > deja intacto un emoji al invertir 0ms
 ✓ tests/texto.test.js > esPalindromo > reconoce un palíndromo sin tener en cuenta espacios ni mayúsculas 0ms
 ✓ tests/texto.test.js > esPalindromo > devuelve false si el texto no es un palíndromo 0ms
 ✓ tests/texto.test.js > esPalindromo > devuelve false si el texto solo tiene espacios 0ms
 ✓ tests/texto.test.js > esPalindromo > devuelve true si el texto es una sola letra 0ms
 ✓ tests/texto.test.js > truncar > corta el texto y añade la marca por defecto 0ms
 ✓ tests/texto.test.js > truncar > usa la marca indicada en lugar de la de por defecto 0ms
 ✓ tests/texto.test.js > truncar > devuelve el texto igual si cabe justo en la longitud máxima 0ms
 ✓ tests/texto.test.js > truncar > devuelve un resultado de exactamente la longitud máxima si no hay espacios al cortar 1ms
 ✓ tests/texto.test.js > truncar > quita el espacio que queda antes de la marca 0ms
 ✓ tests/texto.test.js > truncar > lanza un RangeError si la longitud máxima no deja sitio a la marca 0ms
 ✓ tests/texto.test.js > truncar > lanza un RangeError si la longitud máxima no es un entero 0ms
 ✓ tests/texto.test.js > crearCensurador > sustituye cada palabra prohibida por asteriscos de su misma longitud 0ms
 ✓ tests/texto.test.js > crearCensurador > no distingue mayúsculas de minúsculas 0ms
 ✓ tests/texto.test.js > crearCensurador > no cambia nada si no hay ninguna palabra prohibida en el texto 0ms
 ✓ tests/texto.test.js > crearCensurador > no censura nada si no se le pasa ninguna palabra prohibida 0ms
 ✓ tests/texto.test.js > crearCensurador > dos censuradores con palabras distintas no se mezclan 0ms
 ✓ tests/texto.test.js > unirConY > devuelve una cadena vacía si no hay elementos 0ms
 ✓ tests/texto.test.js > unirConY > devuelve el mismo elemento si solo hay uno 0ms
 ✓ tests/texto.test.js > unirConY > une dos elementos solo con «y» 0ms
 ✓ tests/texto.test.js > unirConY > separa con comas y une los dos últimos con «y» si hay tres o más 0ms

 Test Files  1 passed (1)
      Tests  35 passed (35)
```

| `describe` | Caso límite que prueba |
|------------|------------------------|
| `capitalizar` | Texto vacío: devuelve `''` (y no falla al leer la primera letra) |
| `capitalizarPalabras` | Texto vacío: devuelve `''`; una sola palabra |
| `contarPalabras` | Texto vacío y texto con solo espacios: ambos devuelven `0` |
| `invertir` | Texto vacío y un emoji (`'ab😀'` → `'😀ba'`) que ocupa dos unidades UTF-16 y no debe partirse |
| `esPalindromo` | Texto con solo espacios (`false`) y una sola letra (`true`) |
| `truncar` | Longitud justa (`truncar('Hola', 4)` cabe y se devuelve igual), `maximo` que no deja sitio a la marca (`0`, `RangeError`) y `maximo` no entero (`2.5`) |
| `crearCensurador` | Sin palabras prohibidas, y dos censuradores con palabras distintas que no se mezclan (el closure funciona) |
| `unirConY` | Cero elementos (`''`), un solo elemento y dos elementos (sin coma) |

## ¿Detectan errores tus tests?

Hice cada cambio por separado en `src/texto.js`, ejecuté `npm test` y lo deshice después (al final, los 35 tests vuelven a pasar).

| Cambio | Test que falla |
|--------|----------------|
| `truncar` sin `trimEnd` | Fallan dos: `truncar > corta el texto y añade la marca por defecto` (recibe `'Desarrollo web …'` en lugar de `'Desarrollo web…'`) y `truncar > quita el espacio que queda antes de la marca` (recibe `'Hola …'`) |
| El censurador sin `.toLowerCase()` | Falla `crearCensurador > no distingue mayúsculas de minúsculas` (recibe `'No seas TONTO'` en lugar de `'No seas *****'`) |

## Herramientas

```text
> e02-funciones-texto@1.0.0 lint
> eslint .


> e02-funciones-texto@1.0.0 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!
```

`npm run lint` no muestra ningún error ni aviso.
