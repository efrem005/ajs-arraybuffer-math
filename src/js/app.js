import { Character, Daemon, Magician } from './characters'

// Примеры использования классов

// 1. Создание персонажей
const magician = new Magician('Gandalf', 100)
const daemon = new Daemon('Lucifer', 100)

console.log('=== Создание персонажей ===')
console.log('Magician:', magician)
console.log('Daemon:', daemon)
console.log('')

// 2. Расчет атаки по расстоянию (линейное уменьшение)
console.log('=== Расчет атаки по расстоянию ===')
const character = new Character('Test', 100)

for (let distance = 1; distance <= 5; distance++) {
  character.distance = distance
  console.log(`Расстояние ${distance} клетки: атака = ${character.attack}`)
}
console.log('')

// 3. Пример из задания: базовая атака 100, расстояние 2, с дурманом
console.log('=== Пример из задания ===')
const exampleCharacter = new Character('Example', 100)
exampleCharacter.distance = 2
console.log(`Базовая атака: ${exampleCharacter._attack}`)
console.log(`Расстояние: ${exampleCharacter.distance} клетки`)
console.log(`Атака без дурмана: ${exampleCharacter.attack}`)

exampleCharacter.stoned = true
console.log(`Атака с дурманом: ${exampleCharacter.attack}`)
console.log('')

// 4. Демонстрация эффекта дурмана на разных расстояниях
console.log('=== Эффект дурмана на разных расстояниях ===')
const stonedChar = new Character('Stoned', 100)

for (let dist = 1; dist <= 5; dist++) {
  stonedChar.distance = dist
  stonedChar.stoned = false
  const attackWithoutStoned = stonedChar.attack

  stonedChar.stoned = true
  const attackWithStoned = stonedChar.attack

  console.log(`Расстояние ${dist}: без дурмана = ${attackWithoutStoned}, с дурманом = ${attackWithStoned}`)
}
console.log('')

// 5. Работа с Magician и Daemon
console.log('=== Работа с Magician и Daemon ===')
magician.distance = 3
daemon.distance = 3

console.log(`Magician (расстояние ${magician.distance}): атака = ${magician.attack}`)
console.log(`Daemon (расстояние ${daemon.distance}): атака = ${daemon.attack}`)

magician.stoned = true
daemon.stoned = true

console.log(`Magician с дурманом: атака = ${magician.attack}`)
console.log(`Daemon с дурманом: атака = ${daemon.attack}`)
console.log('')

// 6. Изменение базовой атаки
console.log('=== Изменение базовой атаки ===')
const customChar = new Character('Custom', 200)
customChar.distance = 2
console.log(`Базовая атака: ${customChar._attack}, расстояние: ${customChar.distance}, итоговая атака: ${customChar.attack}`)

customChar.attack = 150
console.log(`Новая базовая атака: ${customChar._attack}, итоговая атака: ${customChar.attack}`)

export { Character, Daemon, Magician }

