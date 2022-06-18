/**
 * Subject 인터페이스는 구독자를 관리하기 위한 메서드 집합을 선언합니다.
 */
interface Subject {
  // subject에 관찰자들을 붙입니다.
  attach(observer: Observer): void;

  // subject에서 관찰자들을 분리합니다.
  detach(observer: Observer): void;

  // 모든 관찰자들에게 이벤트에 대해 알립니다.
  notify(): void;
}

/**
 * Subject는 일부 중요한 상태를 소유하며 상태가 변경될 때 관찰자에게 알립니다.
 */
class ConcreteSubject implements Subject {
  /**
   * @type {number} 단순함을 위해서, 모든 구독자에게 필요한
   * Subject의 상태가 이 변수에 저장됩니다.
   */
  constructor(public state = 0) {}

  /**
   * @type {Observer[]} 구독자 목록입니다.
   * 현실 세계에서는 구독자 목록을 포괄적으로 저장할 수 있습니다(이벤트 유형별 구분 등).
   */
  private observers: Observer[] = [];

  /**
   * 구독 관리 방법입니다.
   */
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }

    console.log('Subject: Attached an observer.');
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Detached an observer.');
  }

  /**
   * 각 구독자에서 업데이트를 트리거합니다.
   */
  public notify(): void {
    console.log('Subject: Notifying observers...');
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  /**
   * 대개 구독에 대한 로직은 Subject가 실제로 수행할 수 있는 작업의 일부에 불과합니다.
   * Subject들은 보통 중요한 일이 발생하려고 할 때마다(또는 발생 후에)
   * 알림 방법을 트리거하는 몇 개의 중요한 비즈니스 로직을 가지고 있습니다.
   */
  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}

/**
 * Observer 인터페이스는 Subject에서 사용하는 업데이트 방법을 선언합니다.
 */
interface Observer {
  // Receive update from subject.
  update(subject: Subject): void;
}

/**
 * Concrete Observer들은 그들이 첨부한 주제에 의해 발행된 업데이트에 반응합니다.
 */
class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log('ConcreteObserverA: Reacted to the event.');
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
      console.log('ConcreteObserverB: Reacted to the event.');
    }
  }
}

/**
 * 클라이언트 측 코드
 */
const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(observer2);

subject.someBusinessLogic();
