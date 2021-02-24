const div = dom.find('#test>.red')[0]

dom.style(div, 'color', 'blue')

const divList = dom.find('.red')
console.log(divList)
dom.each(divList, (n) => console.log(n))