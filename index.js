import "babel-polyfill";
import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { div, ul, li, span, makeDOMDriver } from '@cycle/dom';
import { makeKeyboardDriver } from 'cycle-keyboard';

function drawKey(key, state) {
  return div(`${state.shifted ? '.shifted' : ''}.${key.alt || key.name}.key`, [
    span([state.shifted ? key.shift || key.name : key.name])
  ]);
}

function main({ dom, keyboard }) {
  const shiftKeyDown$ = keyboard.down$.filter(e => e.displayKey == 'shift').map(x => true);
  const shiftKeyUp$ = keyboard.up$.filter(e => e.displayKey == 'shift').map(x => false);
  const shifted$ = xs.merge(shiftKeyDown$, shiftKeyUp$).startWith(false);
  const keyDown$ = keyboard.down$.map(e => `${e.displayKey} key is down`);
  const keyPress$ = keyboard.press$.map(e => `${e.displayChar} is typed`);
  const keyUp$ = keyboard.up$.map(e => `${e.displayKey} key is up`);
  const message$ = xs.merge(keyDown$, keyPress$, keyUp$).startWith(null);
  const messages$ = message$.fold((messages, message) => {
    if (!message)
      return messages || [];
    messages.push(message);
    return messages;
  }, []);
  const keys$ = xs.of([
    {
      name: 'esc',
    },
    {
      name: 'f1',
    },
    {
      name: 'f2',
    },
    {
      name: 'f3',
    },
    {
      name: 'f4',
    },
    {
      name: 'f5',
    },
    {
      name: 'f6',
    },
    {
      name: 'f7',
    },
    {
      name: 'f8',
    },
    {
      name: 'f9',
    },
    {
      name: 'f10',
    },
    {
      name: 'f11',
    },
    {
      name: 'f12',
    },
    {
      name: 'pscr',
    },
    {
      name: 'slock',
    },
    {
      name: 'pause',
    },
    {
      name: '`',
      shift: '~',
      alt: 'tilde'
    },
    {
      name: '1',
      shift: '!',
      alt: 'one'
    },
    {
      name: '2',
      shift: '@',
      alt: 'two'
    },
    {
      name: '3',
      shift: '#',
      alt: 'three'
    },
    {
      name: '4',
      shift: '$',
      alt: 'four'
    },
    {
      name: '5',
      shift: '%',
      alt: 'five'
    },
    {
      name: '6',
      shift: '^',
      alt: 'six'
    },
    {
      name: '7',
      shift: '&',
      alt: 'seven'
    },
    {
      name: '8',
      shift: '*',
      alt: 'eight'
    },
    {
      name: '9',
      shift: '(',
      alt: 'nine'
    },
    {
      name: '0',
      shift: ')',
      alt: 'zero'
    },
    {
      name: '-',
      shift: '_',
      alt: 'hyphen'
    },
    {
      name: '+',
      shift: '=',
      alt: 'plus'
    },
    {
      name: '<-',
      alt: 'backspace'
    },
    {
      name: 'pgup',
    },
    {
      name: 'home',
    },
    {
      name: 'ins',
    },
    {
      name: 'num lock',
    },
    {
      name: '/',
      alt: 'num.backslash'
    },
    {
      name: '*',
      alt: 'num.star'
    },
    {
      name: '-',
      alt: 'minus'
    },
    {
      name: 'tab',
    },
    {
      name: 'q',
      shift: 'Q',
    },
    {
      name: 'w',
      shift: 'W',
    },
    {
      name: 'e',
      shift: 'E',
    },
    {
      name: 'r',
      shift: 'R',
    },
    {
      name: 't',
      shift: 'T',
    },
    {
      name: 'y',
      shift: 'Y',
    },
    {
      name: 'u',
      shift: 'U',
    },
    {
      name: 'i',
      shift: 'I',
    },
    {
      name: 'o',
      shift: 'O',
    },
    {
      name: 'p',
      shift: 'P',
    },
    {
      name: '[',
      shift: '{',
      alt: 'square.braces.open'
    },
    {
      name: ']',
      shift: '}',
      alt: 'square.braces.close'
    },
    {
      name: '\\',
      shift: '|',
      alt: 'slash'
    },
    {
      name: 'pgdn',
    },
    {
      name: 'end',
    },
    {
      name: 'del',
    },
    {
      name: '7',
      alt: 'num.seven'
    },
    {
      name: '8',
      alt: 'num.eight'
    },
    {
      name: '9',
      alt: 'num.nine'
    },
    {
      name: 'caps',
    },
    {
      name: 'a',
      shift: 'A',
    },
    {
      name: 's',
      shift: 'S',
    },
    {
      name: 'd',
      shift: 'D',
    },
    {
      name: 'f',
      shift: 'F',
    },
    {
      name: 'g',
      shift: 'G',
    },
    {
      name: 'h',
      shift: 'H',
    },
    {
      name: 'j',
      shift: 'J',
    },
    {
      name: 'k',
      shift: 'K',
    },
    {
      name: 'l',
      shift: 'L',
    },
    {
      name: ';',
      shift: ':',
      alt: 'colon'
    },
    {
      name: '\'',
      shift: '"',
      alt: 'quotes'
    },
    {
      name: 'enter',
    },
    {
      name: '4',
      alt: 'num.four'
    },
    {
      name: '5',
      alt: 'num.five'
    },
    {
      name: '6',
      alt: 'num.six'
    },
    {
      name: '+',
      alt: 'num.plus'
    },
    {
      name: 'shift',
    },
    {
      name: 'z',
      shift: 'Z',
    },
    {
      name: 'x',
      shift: 'X',
    },
    {
      name: 'c',
      shift: 'C',
    },
    {
      name: 'v',
      shift: 'V',
    },
    {
      name: 'b',
      shift: 'B',
    },
    {
      name: 'n',
      shift: 'N',
    },
    {
      name: 'm',
      shift: 'M',
    },
    {
      name: ',',
      shift: '<',
      alt: 'comma'
    },
    {
      name: '.',
      shift: '>',
      alt: 'period'
    },
    {
      name: '/',
      shift: '?',
      alt: 'backslash'
    },
    {
      name: 'shift',
      alt: 'right.shift'
    },
    {
      name: '^',
      alt: 'up.arrow'
    },
    {
      name: '1',
      alt: 'num.one'
    },
    {
      name: '2',
      alt: 'num.two'
    },
    {
      name: '3',
      alt: 'num.two'
    },
    {
      name: 'ctrl',
    },
    {
      name: 'win',
    },
    {
      name: 'alt',
    },
    {
      name: 'space',
    },
    {
      name: 'ctrl',
      alt: 'right.ctrl'
    },
    {
      name: 'win',
    },
    {
      name: 'alt',
    },
    {
      name: '<',
      alt: 'left.arrow'
    },
    {
      name: 'dn',
      alt: 'down.arrow'
    },
    {
      name: '>',
      alt: 'right.arrow'
    },
    {
      name: '0',
      alt: 'num.zero'
    },
    {
      name: '.',
      alt: '.num.period'
    },
    {
      name: 'enter',
      alt: 'num.enter'
    }
  ]);
  const state$ = xs.combine(messages$, keys$, shifted$).map(a => {
    return { messages: a[0], keys: a[1], shifted: a[2] }
  });
  const vtree$ = state$.map(state =>
    div('#root', [
      div('.container', [
        div('.messages', [
          ul('.log', state.messages.map(message => li([message]))),
        ]),
        div('.keyboard', [
          div('.panel', state.keys.map(k => drawKey(k, state)))
        ])
      ])
    ])
  );
  const sinks = {
    dom: vtree$
  };
  return sinks;
}
const drivers = {
  dom: makeDOMDriver('#app'),
  keyboard: makeKeyboardDriver()
}
run(main, drivers);