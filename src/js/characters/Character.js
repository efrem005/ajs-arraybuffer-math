/**
 * Базовый класс для персонажей с расчетом атаки по расстоянию
 */
class Character {
  constructor(name, attack = 100) {
    this.name = name
    this._attack = attack
    this._stoned = false
    this._distance = 1
  }

  /**
   * get для атаки с учетом расстояния и эффекта дурмана
   */
  get attack() {
    let calculatedAttack = this._attack

    // Линейное уменьшение атаки по расстоянию
    // 1 клетка - 100%, 2 - 90%, 3 - 80%, 4 - 70%, 5 - 60%
    const distanceMultiplier = 1 - (this._distance - 1) * 0.1
    calculatedAttack = Math.max(0, calculatedAttack * distanceMultiplier)

    // Применяем эффект дурмана
    if (this._stoned) {
      const stonedPenalty = Math.log2(this._distance) * 5
      calculatedAttack = Math.max(0, calculatedAttack - stonedPenalty)
    }

    return Math.round(calculatedAttack)
  }

  /**
   * set для атаки
   */
  set attack(value) {
    this._attack = value
  }

  /**
   * get для эффекта дурмана
   */
  get stoned() {
    return this._stoned
  }

  /**
   * set для эффекта дурмана
   */
  set stoned(value) {
    this._stoned = value
  }

  /**
   * Установка расстояния до цели
   */
  set distance(value) {
    this._distance = value
  }

  /**
   * Получение расстояния до цели
   */
  get distance() {
    return this._distance
  }
}

export default Character

