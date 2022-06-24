/**
 * Component 인터페이스는 기본 방문자 인터페이스를 인수로 사용해야 하는 'accept' 메서드를 선언합니다.
 */
interface Component {
  accept(visitor: Visitor): void;
}

/**
 * 각 Concrete Component 클래스는 방문자의 메서드를 호출하는 방식으로 'accept' 메서드를 구현해야 합니다.
 */
class ConcreteComponentA implements Component {
  /**
   * 현재 클래스 이름과 일치하는 visit Concrete Component A를 호출합니다.
   * 이러한 방법으로 방문자에게 해당 컴포넌트의 클래스가 동작하는 것을 알릴 수 있습니다.
   */
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentA(this);
  }

  /**
   * Concrete Component는 기본 클래스 또는 인터페이스에 존재하지 않는 특수한 메소드를 가질 수 있습니다.
   * 방문자는 컴포넌트의 구체적인 클래스를 알고 있기 때문에 이런 메서드를 사용할 수 있습니다.
   */
  public exclusiveMethodOfConcreteComponentA(): string {
    return 'A';
  }
}

class ConcreteComponentB implements Component {
  /**
   * 여기도 마찬가지에요: visitConcreteComponentB => ConcreteComponentB
   */
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentB(this);
  }

  public specialMethodOfConcreteComponentB(): string {
    return 'B';
  }
}

/**
 * The Visitor Interface declares a set of visiting methods that correspond to
 * component classes. The signature of a visiting method allows the visitor to
 * identify the exact class of the component that it's dealing with.
 */
interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): void;

  visitConcreteComponentB(element: ConcreteComponentB): void;
}

/**
 * Concrete Visitor는 동일한 알고리즘의 여러 버전을 구현하며, 모든 구현화된 컴포넌트 클래스에서 작동할 수 있습니다.
 *
 * 방문자 패턴은 복합 트리와 같은 복잡한 객체 구조와 함께 사용할 때 가장 큰 이점을 경험할 수 있습니다.
 * 이 경우, 구조의 다양한 객체에 대해 방문자의 메서드를 실행하는 동안 알고리즘의 중간 상태를 저장하는 것이 도움이 될 수 있습니다.
 */
class ConcreteVisitor1 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`);
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
  }
}

class ConcreteVisitor2 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`);
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
  }
}

/**
 * 클라이언트 코드는 특정 클래스를 파악하지 않고 모든 elements 집합에 대해 방문자 메서드를 실행할 수 있습니다.
 * 'accept' 연산은 방문자 객체의 적절한 동작으로 호출을 지시합니다.
 */
function clientCode(components: Component[], visitor: Visitor) {
  // ...
  for (const component of components) {
    component.accept(visitor);
  }
  // ...
}

const components = [new ConcreteComponentA(), new ConcreteComponentB()];

console.log('The client code works with all visitors via the base Visitor interface:');
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log('');

console.log('It allows the same client code to work with different types of visitors:');
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);
