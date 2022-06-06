/**
 * Originator는 시간이 지남에 따라 변경될 수 있는 중요한 상태를 유지합니다.
 * 또한 Memento 내부의 상태를 저장하는 메서드와 Memento로부터 상태를 복원하는 다른 메서드를 정의합니다.
 */
class Originator {
  /**
   * 단순함을 위해 Originator의 상태는 단일 변수에 저장합니다.
   */
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log(`Originator: My initial state is: ${state}`);
  }

  /**
   * Originator의 비즈니스 로직은 내부 상태에 영향을 미칠 수 있습니다.
   * 따라서 클라이언트는 save() 메서드를 통해 비즈니스 로직의 메서드를 실행하기 전에 상태를 백업해야 합니다.
   */
  public doSomething(): void {
    console.log("Originator: I'm doing something important.");
    this.state = this.generateRandomString(30);
    console.log(`Originator: and my state has changed to: ${this.state}`);
  }

  private generateRandomString(length = 10): string {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return Array({ length })
      .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join('');
  }

  /**
   * 현재 상태를 Memento에 저장합니다.
   */
  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  /**
   * Memento 객체에서 발신자의 상태를 복원합니다.
   */
  public restore(memento: Memento): void {
    this.state = memento.getState();
    console.log(`Originator: My state has changed to: ${this.state}`);
  }
}

/**
 * Memento 인터페이스는 생성 날짜 또는 이름이 같은 Memento의 메타데이터를 검색하는 메서드를 제공합니다.
 * 그러나 Originator의 상태는 노출되지 않습니다.
 */
interface Memento {
  getState(): string;

  getName(): string;

  getDate(): string;
}

/**
 * Memento를 구현한 ConcreteMemento에는 Originator의 상태를 저장하기 위한 내부 구조(infrastructure)가 포함되어 있습니다.
 */
class ConcreteMemento implements Memento {
  private state: string;

  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  /**
   * Originator는 상태를 복원할 때 이 메서드를 사용합니다.
   */
  public getState(): string {
    return this.state;
  }

  /**
   * 나머지 메서드는 Caretaker가 메타데이터를 표시하는 데 사용합니다.
   */
  public getName(): string {
    return `${this.date} / (${this.state.substr(0, 9)}...)`;
  }

  public getDate(): string {
    return this.date;
  }
}

/**
 * Caretaker는 ConcreteMemento 클래스에 의존하지 않습니다.
 * 따라서 Memento 내부에 저장된 Originator의 상태에 액세스할 수 없습니다.
 * 기본적인 Memento 인터페이스를 통해 모든 memento가 동작합니다.
 */
class Caretaker {
  private mementos: Memento[] = [];

  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log("\nCaretaker: Saving Originator's state...");
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop();
    if (memento === undefined) throw new Error();

    console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
    this.originator.restore(memento);
  }

  public showHistory(): void {
    console.log("Caretaker: Here's the list of mementos:");
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

/**
 * 클라이언트 측 코드
 */
const originator = new Originator('Super-duper-super-puper-super.');
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log('');
caretaker.showHistory();

console.log("\nClient: Now, let's rollback!\n");
caretaker.undo();

console.log('\nClient: Once more!\n');
caretaker.undo();
