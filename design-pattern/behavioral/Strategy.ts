/**
 * 컨텍스트는 클라이언트에 대한 관심 인터페이스를 정의합니다.
 */
class Context {
  /**
   * @type {Strategy} 컨텍스트는 전략 개체 중 하나에 대한 참조를 유지합니다.
   * 컨텍스트에서는 Strategy의 구체적인 클래스를 알지 못합니다.
   * Strategy 인터페이스를 통해 모든 Strategy이 동작할 수 있어야 합니다.
   */
  private strategy: Strategy;

  /**
   * 보통 컨텍스트는 생성자를 통해 Strategy를 할당하고, 런타임에 변경할 수 있는 설정자도 제공합니다.
   */
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  /**
   * 일반적으로 컨텍스트는 런타임에 Strategy 객체를 대체할 수 있습니다.
   */
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  /**
   * 컨텍스트는 알고리즘의 여러 버전을 자체적으로 구현하는 대신 일부 작업을 Strategy 개체에 위임합니다.
   */
  public doSomeBusinessLogic(): void {
    // ...

    console.log("Context: Sorting data using the strategy (not sure how it'll do it)");
    const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
    console.log(result.join(','));

    // ...
  }
}

/**
 * Strategy 인터페이스는 일부 알고리즘의 지원되는 모든 버전에 공통된 작업을 선언합니다.
 *
 * 컨텍스트는 이 인터페이스를 사용하여 구체화된 Strategy에 정의된 알고리즘을 호출합니다.
 */
interface Strategy {
  doAlgorithm(data: string[]): string[];
}

/**
 * 구체화된 Strategy는 기본 Strategy 인터페이스를 따르면서 알고리즘을 구현합니다.
 * 인터페이스는 이들을 컨텍스트에서 상호 호환하도록 만듭니다.
 */
class ConcreteStrategyA implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

/**
 * 클라이언트 측 코드는 구현한 Strategy를 선택하여 컨텍스트에 전달합니다.
 * 클라이언트는 올바른 선택을 하기 위해 Strategy 간의 차이를 인지해야 합니다.
 */
const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

console.log('');

console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
