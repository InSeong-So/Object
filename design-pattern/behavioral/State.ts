/**
 * 컨텍스트는 클라이언트에 대한 관심 인터페이스를 정의합니다.
 * 또한 컨텍스트의 현재 상태를 나타내는 상태 서브 클래스의 인스턴스에 대한 참조를 유지합니다.
 */
class Context {
  /**
   * @type {State} 컨텍스트의 현재 상태에 대한 참조입니다.
   */
  constructor(private state: State) {
    this.transitionTo(state);
  }

  /**
   * 컨텍스트를 사용하면 런타임에 상태 개체를 변경할 수 있습니다.
   */
  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  /**
   * 컨텍스트는 동작의 일부를 현재 상태 개체에 위임합니다.
   */
  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}

/**
 * 기본적인 상태 클래스는 모든 Concrete State가 구현해야 하는 메서드를 선언하고,
 * 상태 관련 컨텍스트 객체에 대한 역참조를 제공합니다.
 * 이 역참조는 상태들이 컨텍스트를 이용해 다른 상태로 전환하는 데 사용할 수 있습니다.
 */
abstract class State {
  protected context!: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle1(): void;

  public abstract handle2(): void;
}

/**
 * Concrete State들은 컨텍스트의 상태와 연관된 다양한 동작을 구현합니다.
 */
class ConcreteStateA extends State {
  public handle1(): void {
    console.log('ConcreteStateA handles request1.');
    console.log('ConcreteStateA wants to change the state of the context.');
    this.context.transitionTo(new ConcreteStateB());
  }

  public handle2(): void {
    console.log('ConcreteStateA handles request2.');
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log('ConcreteStateB handles request1.');
  }

  public handle2(): void {
    console.log('ConcreteStateB handles request2.');
    console.log('ConcreteStateB wants to change the state of the context.');
    this.context.transitionTo(new ConcreteStateA());
  }
}

/**
 * 클라이언트 측 코드
 */
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
