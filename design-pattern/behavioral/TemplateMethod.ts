/**
 * 추상 클래스는 추상적인 원시 연산에 대한 호출로 구성된 일부 알고리즘의 골격을 포함하는 템플릿 메서드를 정의합니다.
 * 구체적인 하위 클래스는 이러한 작업을 구현해야 하지만 템플릿 메서드 자체는 그대로 두어야 합니다.
 */
abstract class AbstractClass {
  /**
   * 템플릿 메서드는 알고리즘의 골격을 정의합니다.
   */
  public templateMethod(): void {
    this.baseOperation1();
    this.requiredOperations1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  /**
   * 이러한 메서드는 이미 구현되어 있습니다.
   */
  protected baseOperation1(): void {
    console.log('AbstractClass says: I am doing the bulk of the work');
  }

  protected baseOperation2(): void {
    console.log('AbstractClass says: But I let subclasses override some operations');
  }

  protected baseOperation3(): void {
    console.log('AbstractClass says: But I am doing the bulk of the work anyway');
  }

  /**
   * 아래 메서드는 하위 클래스에서 구현되어야 합니다.
   */
  protected abstract requiredOperations1(): void;

  protected abstract requiredOperation2(): void;

  /**
   * 이것들은 "hooks" 입니다.
   * 하위 클래스는 하위 클래스를 재정의할 수 있지만 훅에 이미 기본(비어있는) 구현체가 있기 때문에 필수 클래스는 아닙니다.
   * hooks는 알고리즘의 일부 중요한 위치에 추가적인 확장 지점을 제공합니다.
   */
  protected hook1(): void {}

  protected hook2(): void {}
}

/**
 * 구현하는 클래스는 기본 클래스의 모든 추상 메서드를 구현해야 합니다.
 * 또한 기본 구현체의 일부 메서드를 재정의할 수도 있습니다.
 */
class ConcreteClass1 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass1 says: Implemented Operation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass1 says: Implemented Operation2');
  }
}

/**
 * 일반적으로, 구현화된 클래스는 기본 클래스 연산의 일부만 재정의합니다.
 */
class ConcreteClass2 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass2 says: Implemented Operation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass2 says: Implemented Operation2');
  }

  protected hook1(): void {
    console.log('ConcreteClass2 says: Overridden Hook1');
  }
}

/**
 * 클라이언트 코드는 알고리즘을 실행하기 위해 템플릿 메서드를 호출합니다.
 * 클라이언트 코드는 기본 클래스의 인터페이스를 통해 객체와 함께 작동하는 경우 해당 객체의 구체적인 클래스를 알 필요가 없습니다.
 */
function clientCode(abstractClass: AbstractClass) {
  // ...
  abstractClass.templateMethod();
  // ...
}

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass1());
console.log('');

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass2());
