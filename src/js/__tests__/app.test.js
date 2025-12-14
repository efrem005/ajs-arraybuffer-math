import { Character, Daemon, Magician } from '../characters'

describe('Character', () => {
  describe('Базовая функциональность', () => {
    test('должен создавать персонажа с базовыми параметрами', () => {
      const character = new Character('Test', 100)
      expect(character.name).toBe('Test')
      expect(character._attack).toBe(100)
      expect(character._stoned).toBe(false)
      expect(character._distance).toBe(1)
    })

    test('должен создавать персонажа с параметром attack по умолчанию', () => {
      const character = new Character('Test')
      expect(character.name).toBe('Test')
      expect(character._attack).toBe(100)
      expect(character._stoned).toBe(false)
      expect(character._distance).toBe(1)
    })

    test('должен устанавливать и получать базовую атаку', () => {
      const character = new Character('Test', 100)
      character.attack = 150
      expect(character._attack).toBe(150)
      expect(character.attack).toBe(150)
    })

    test('должен устанавливать и получать эффект дурмана', () => {
      const character = new Character('Test', 100)
      expect(character.stoned).toBe(false)
      character.stoned = true
      expect(character.stoned).toBe(true)
      character.stoned = false
      expect(character.stoned).toBe(false)
    })

    test('должен устанавливать и получать расстояние', () => {
      const character = new Character('Test', 100)
      expect(character.distance).toBe(1)
      character.distance = 3
      expect(character.distance).toBe(3)
    })
  })

  describe('Расчет атаки по расстоянию (линейное уменьшение)', () => {
    const testCases = [
      { distance: 1, expected: 100, description: '1 клетка - 100%' },
      { distance: 2, expected: 90, description: '2 клетки - 90%' },
      { distance: 3, expected: 80, description: '3 клетки - 80%' },
      { distance: 4, expected: 70, description: '4 клетки - 70%' },
      { distance: 5, expected: 60, description: '5 клеток - 60%' },
    ]

    test.each(testCases)('$description', ({ distance, expected }) => {
      const character = new Character('Test', 100)
      character.distance = distance
      expect(character.attack).toBe(expected)
    })

    test('должен корректно обрабатывать расстояние больше 5 клеток', () => {
      const character = new Character('Test', 100)
      character.distance = 6
      // 6 клеток: 100% - (6-1)*10% = 100% - 50% = 50%
      expect(character.attack).toBe(50)
    })

    test('должен не давать отрицательную атаку при большом расстоянии', () => {
      const character = new Character('Test', 100)
      character.distance = 15
      expect(character.attack).toBeGreaterThanOrEqual(0)
      expect(character.attack).toBe(0)
    })

    test('должен возвращать 0 при отрицательной атаке после расчета', () => {
      const character = new Character('Test', 10)
      character.distance = 20
      expect(character.attack).toBe(0)
    })

    test('должен корректно работать с разными базовыми значениями атаки', () => {
      const character = new Character('Test', 200)
      character.distance = 2
      // 200 * 0.9 = 180
      expect(character.attack).toBe(180)
    })
  })

  describe('Эффект дурмана (Math.log2)', () => {
    test('должен применять дурман на расстоянии 1 клетка', () => {
      const character = new Character('Test', 100)
      character.distance = 1
      character.stoned = true
      // 100 * 1.0 - Math.log2(1) * 5 = 100 - 0 = 100
      expect(character.attack).toBe(100)
    })

    test('должен применять дурман на расстоянии 2 клетки (пример из задания)', () => {
      const character = new Character('Test', 100)
      character.distance = 2
      character.stoned = true
      // 100 * 0.9 - Math.log2(2) * 5 = 90 - 5 = 85
      expect(character.attack).toBe(85)
    })

    const stonedTestCases = [
      { distance: 1, baseAttack: 100, expected: 100, description: '1 клетка с дурманом' },
      { distance: 2, baseAttack: 100, expected: 85, description: '2 клетки с дурманом' },
      { distance: 3, baseAttack: 100, expected: 72, description: '3 клетки с дурманом' },
      { distance: 4, baseAttack: 100, expected: 60, description: '4 клетки с дурманом' },
      { distance: 5, baseAttack: 100, expected: 48, description: '5 клеток с дурманом' },
    ]

    test.each(stonedTestCases)('$description', ({ distance, baseAttack, expected }) => {
      const character = new Character('Test', baseAttack)
      character.distance = distance
      character.stoned = true
      expect(character.attack).toBe(expected)
    })

    test('должен не давать отрицательную атаку при дурмане на большом расстоянии', () => {
      const character = new Character('Test', 100)
      character.distance = 10
      character.stoned = true
      expect(character.attack).toBeGreaterThanOrEqual(0)
    })

    test('должен возвращать 0 при отрицательной атаке после применения дурмана', () => {
      const character = new Character('Test', 10)
      character.distance = 5
      character.stoned = true
      expect(character.attack).toBe(0)
    })

    test('должен корректно переключать дурман', () => {
      const character = new Character('Test', 100)
      character.distance = 2

      // Без дурмана
      expect(character.attack).toBe(90)

      // С дурманом
      character.stoned = true
      expect(character.attack).toBe(85)

      // Снова без дурмана
      character.stoned = false
      expect(character.attack).toBe(90)
    })
  })
})

describe('Magician', () => {
  test('должен быть экземпляром Character', () => {
    const magician = new Magician('Gandalf', 100)
    expect(magician instanceof Character).toBe(true)
  })

  test('должен создаваться с базовыми параметрами', () => {
    const magician = new Magician('Gandalf', 120)
    expect(magician.name).toBe('Gandalf')
    expect(magician._attack).toBe(120)
    expect(magician._stoned).toBe(false)
  })

  test('должен создаваться с параметром attack по умолчанию', () => {
    const magician = new Magician('Gandalf')
    expect(magician.name).toBe('Gandalf')
    expect(magician._attack).toBe(100)
    expect(magician._stoned).toBe(false)
  })

  test('должен корректно рассчитывать атаку по расстоянию', () => {
    const magician = new Magician('Gandalf', 100)
    magician.distance = 3
    expect(magician.attack).toBe(80)
  })

  test('должен корректно применять дурман', () => {
    const magician = new Magician('Gandalf', 100)
    magician.distance = 2
    magician.stoned = true
    expect(magician.attack).toBe(85)
  })

  test('должен поддерживать get/set для stoned', () => {
    const magician = new Magician('Gandalf', 100)
    expect(magician.stoned).toBe(false)
    magician.stoned = true
    expect(magician.stoned).toBe(true)
  })

  test('должен поддерживать get/set для attack', () => {
    const magician = new Magician('Gandalf', 100)
    magician.attack = 150
    expect(magician._attack).toBe(150)
    expect(magician.attack).toBe(150)
  })
})

describe('Daemon', () => {
  test('должен быть экземпляром Character', () => {
    const daemon = new Daemon('Lucifer', 100)
    expect(daemon instanceof Character).toBe(true)
  })

  test('должен создаваться с базовыми параметрами', () => {
    const daemon = new Daemon('Lucifer', 150)
    expect(daemon.name).toBe('Lucifer')
    expect(daemon._attack).toBe(150)
    expect(daemon._stoned).toBe(false)
  })

  test('должен создаваться с параметром attack по умолчанию', () => {
    const daemon = new Daemon('Lucifer')
    expect(daemon.name).toBe('Lucifer')
    expect(daemon._attack).toBe(100)
    expect(daemon._stoned).toBe(false)
  })

  test('должен корректно рассчитывать атаку по расстоянию', () => {
    const daemon = new Daemon('Lucifer', 100)
    daemon.distance = 4
    expect(daemon.attack).toBe(70)
  })

  test('должен корректно применять дурман', () => {
    const daemon = new Daemon('Lucifer', 100)
    daemon.distance = 2
    daemon.stoned = true
    expect(daemon.attack).toBe(85)
  })

  test('должен поддерживать get/set для stoned', () => {
    const daemon = new Daemon('Lucifer', 100)
    expect(daemon.stoned).toBe(false)
    daemon.stoned = true
    expect(daemon.stoned).toBe(true)
  })

  test('должен поддерживать get/set для attack', () => {
    const daemon = new Daemon('Lucifer', 100)
    daemon.attack = 200
    expect(daemon._attack).toBe(200)
    expect(daemon.attack).toBe(200)
  })
})

describe('Интеграционные тесты', () => {
  test('должен корректно работать с изменением всех параметров', () => {
    const magician = new Magician('Gandalf', 100)

    // Начальное состояние
    expect(magician.attack).toBe(100)

    // Увеличиваем расстояние
    magician.distance = 3
    expect(magician.attack).toBe(80)

    // Применяем дурман
    magician.stoned = true
    expect(magician.attack).toBe(72)

    // Меняем базовую атаку
    magician.attack = 200
    expect(magician.attack).toBe(152) // 200 * 0.8 - Math.log2(3) * 5 = 160 - 7.925 ≈ 152

    // Убираем дурман
    magician.stoned = false
    expect(magician.attack).toBe(160) // 200 * 0.8 = 160
  })

  test('должен корректно работать с разными классами одновременно', () => {
    const magician = new Magician('Gandalf', 100)
    const daemon = new Daemon('Lucifer', 100)

    magician.distance = 2
    daemon.distance = 2

    expect(magician.attack).toBe(90)
    expect(daemon.attack).toBe(90)

    magician.stoned = true
    daemon.stoned = true

    expect(magician.attack).toBe(85)
    expect(daemon.attack).toBe(85)
  })
});

