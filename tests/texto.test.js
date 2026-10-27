import { describe, it, expect } from 'vitest';
import {
  capitalizar,
  capitalizarPalabras,
  contarPalabras,
  invertir,
  esPalindromo,
  truncar,
  crearCensurador,
  unirConY,
} from '../src/texto.js';

describe('capitalizar', () => {
  it('pone en mayúscula la primera letra', () => {
    expect(capitalizar('hola')).toBe('Hola');
  });

  it('respeta las letras con tilde o eñe', () => {
    expect(capitalizar('ñandú')).toBe('Ñandú');
  });

  it('no cambia el resto del texto', () => {
    expect(capitalizar('hOLA mUNDO')).toBe('HOLA mUNDO');
  });

  it('devuelve una cadena vacía si el texto está vacío', () => {
    expect(capitalizar('')).toBe('');
  });
});

describe('capitalizarPalabras', () => {
  it('pone en mayúscula la primera letra de cada palabra y en minúscula el resto', () => {
    expect(capitalizarPalabras('el SEÑOR de los anillos')).toBe('El Señor De Los Anillos');
  });

  it('devuelve la misma palabra capitalizada si solo hay una', () => {
    expect(capitalizarPalabras('dwec')).toBe('Dwec');
  });

  it('devuelve una cadena vacía si el texto está vacío', () => {
    expect(capitalizarPalabras('')).toBe('');
  });

  it('no modifica el texto original', () => {
    const original = 'hola mundo';
    capitalizarPalabras(original);
    expect(original).toBe('hola mundo');
  });
});

describe('contarPalabras', () => {
  it('cuenta las palabras separadas por un espacio', () => {
    expect(contarPalabras('hola mundo cruel')).toBe(3);
  });

  it('ignora los espacios repetidos y los de los extremos', () => {
    expect(contarPalabras('  hola   mundo  ')).toBe(2);
  });

  it('devuelve 0 si el texto está vacío', () => {
    expect(contarPalabras('')).toBe(0);
  });

  it('devuelve 0 si el texto solo tiene espacios', () => {
    expect(contarPalabras('     ')).toBe(0);
  });
});

describe('invertir', () => {
  it('invierte el orden de los caracteres', () => {
    expect(invertir('hola')).toBe('aloh');
  });

  it('devuelve una cadena vacía si el texto está vacío', () => {
    expect(invertir('')).toBe('');
  });

  it('deja intacto un emoji al invertir', () => {
    expect(invertir('ab😀')).toBe('😀ba');
  });
});

describe('esPalindromo', () => {
  it('reconoce un palíndromo sin tener en cuenta espacios ni mayúsculas', () => {
    expect(esPalindromo('Anita lava la tina')).toBe(true);
  });

  it('devuelve false si el texto no es un palíndromo', () => {
    expect(esPalindromo('Hola')).toBe(false);
  });

  it('devuelve false si el texto solo tiene espacios', () => {
    expect(esPalindromo('   ')).toBe(false);
  });

  it('devuelve true si el texto es una sola letra', () => {
    expect(esPalindromo('a')).toBe(true);
  });
});

describe('truncar', () => {
  it('corta el texto y añade la marca por defecto', () => {
    expect(truncar('Desarrollo web en entorno cliente', 16)).toBe('Desarrollo web…');
  });

  it('usa la marca indicada en lugar de la de por defecto', () => {
    expect(truncar('Desarrollo web en entorno cliente', 16, '...')).toBe('Desarrollo we...');
  });

  it('devuelve el texto igual si cabe justo en la longitud máxima', () => {
    expect(truncar('Hola', 4)).toBe('Hola');
  });

  it('devuelve un resultado de exactamente la longitud máxima si no hay espacios al cortar', () => {
    expect(truncar('abcdefghij', 5)).toHaveLength(5);
  });

  it('quita el espacio que queda antes de la marca', () => {
    expect(truncar('Hola mundo', 6)).toBe('Hola…');
  });

  it('lanza un RangeError si la longitud máxima no deja sitio a la marca', () => {
    expect(() => truncar('Hola', 0)).toThrow(RangeError);
  });

  it('lanza un RangeError si la longitud máxima no es un entero', () => {
    expect(() => truncar('Hola', 2.5)).toThrow('Longitud máxima no válida: 2.5');
  });
});

describe('crearCensurador', () => {
  it('sustituye cada palabra prohibida por asteriscos de su misma longitud', () => {
    const censurar = crearCensurador('tonto', 'feo');
    expect(censurar('No seas tonto que eso es feo')).toBe('No seas ***** que eso es ***');
  });

  it('no distingue mayúsculas de minúsculas', () => {
    const censurar = crearCensurador('tonto');
    expect(censurar('No seas TONTO')).toBe('No seas *****');
  });

  it('no cambia nada si no hay ninguna palabra prohibida en el texto', () => {
    const censurar = crearCensurador('feo');
    expect(censurar('Todo está bien')).toBe('Todo está bien');
  });

  it('no censura nada si no se le pasa ninguna palabra prohibida', () => {
    const censurar = crearCensurador();
    expect(censurar('Qué feo')).toBe('Qué feo');
  });

  it('dos censuradores con palabras distintas no se mezclan', () => {
    const censurarFeo = crearCensurador('feo');
    const censurarTonto = crearCensurador('tonto');
    expect(censurarFeo('feo y tonto')).toBe('*** y tonto');
    expect(censurarTonto('feo y tonto')).toBe('feo y *****');
  });
});

describe('unirConY', () => {
  it('devuelve una cadena vacía si no hay elementos', () => {
    expect(unirConY()).toBe('');
  });

  it('devuelve el mismo elemento si solo hay uno', () => {
    expect(unirConY('Ana')).toBe('Ana');
  });

  it('une dos elementos solo con «y»', () => {
    expect(unirConY('Ana', 'Luis')).toBe('Ana y Luis');
  });

  it('separa con comas y une los dos últimos con «y» si hay tres o más', () => {
    expect(unirConY('Ana', 'Luis', 'Eva')).toBe('Ana, Luis y Eva');
  });
});
