import Character from './Character'

/**
 * Класс Демон
 */
class Daemon extends Character {
  constructor(name, attack = 100) {
    super(name, attack)
  }
}

export default Daemon

