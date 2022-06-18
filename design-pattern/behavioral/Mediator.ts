/**
 * 중재자(Mediator) 인터페이스는 컴포넌트가 다양한 이벤트를 중재자에게 알리기 위한 방법을 정의합니다.
 * 중재자는 다른 컴포넌트에 이벤트를 전달하여 실행하게 할 수 있습니다.
 */
interface Mediator {
  notify(sender: object, event: string): void;
}

/**
 * 추상화된 중재자는 여러 컴포넌트를 조정하여 협력적인 행동을 구현하게 합니다.
 */
class ConcreteMediator implements Mediator {
  private component1: Component1;

  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }

  public notify(sender: object, event: string): void {
    if (event === 'A') {
      console.log('Mediator reacts on A and triggers following operations:');
      this.component2.doC();
    }

    if (event === 'D') {
      console.log('Mediator reacts on D and triggers following operations:');
      this.component1.doB();
      this.component2.doC();
    }
  }
}

/**
 * 기본 컴포넌트는 컴포넌트 객체 내에 중재자의 인스턴스를 저장하는 기본 기능을 제공합니다.
 */
class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
    this.mediator = mediator!;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

/**
 * 구체화된 컴포넌트는 다양한 기능을 구현합니다.
 * 다른 컴포넌트에 의존하지 않습니다.
 * 또한 어떤 구체적인 중재자 객체들에도 의존하지 않습니다.
 */
class Component1 extends BaseComponent {
  public doA(): void {
    console.log('Component 1 does A.');
    this.mediator.notify(this, 'A');
  }

  public doB(): void {
    console.log('Component 1 does B.');
    this.mediator.notify(this, 'B');
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
    console.log('Component 2 does C.');
    this.mediator.notify(this, 'C');
  }

  public doD(): void {
    console.log('Component 2 does D.');
    this.mediator.notify(this, 'D');
  }
}

/**
 * 클라이언트 측 코드
 */
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

console.log('Client triggers operation A.');
c1.doA();

console.log('');
console.log('Client triggers operation D.');
c2.doD();
