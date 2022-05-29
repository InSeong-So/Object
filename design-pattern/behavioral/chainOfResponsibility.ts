/**
 * 핸들러 인터페이스는 핸들러 체인을 구축하는 방법을 선언합니다.
 * 또한 요청을 실행하기 위한 메서드를 선언합니다.
 */
interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: string): string;
}

/**
 * 기본 체인 동작은 기본 핸들러 클래스 내에서 구현될 수 있습니다.
 */
abstract class AbstractHandler implements Handler {
  private nextHandler?: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    // 여기서 핸들러를 반환하면 핸들러를 다음과 같이 연결할 수 있습니다.
    // 아래와 같이 편하게 사용하세요:
    // monkey.setNext(squirrel).setNext(dog);
    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return 'abstract';
  }
}

/**
 * 상속된 모든 핸들러는 체인에서 요청을 처리하거나 다음 핸들러로 전달합니다.
 */
class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Banana') {
      return `Monkey: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Nut') {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'MeatBall') {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

/**
 * 클라이언트 코드는 일반적으로 단일 핸들러에 적합합니다.
 * 대부분의 경우 핸들러가 체인의 일부라는 사실조차 인식하지 못합니다.
 */
function clientCode(handler: Handler) {
  const foods = ['Nut', 'Banana', 'Cup of coffee'];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = handler.handle(food);
    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  ${food} was left untouched.`);
    }
  }
}

/**
 * 클라이언트 코드의 다른 부분은 실제 체인을 구성합니다.
 */
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

/**
 * 클라이언트는 체인 내의 첫 번째 핸들러가 아닌 모든 핸들러에게 요청을 보낼 수 있어야 합니다.
 */
console.log('Chain: Monkey > Squirrel > Dog\n');
clientCode(monkey);
console.log('');

console.log('Subchain: Squirrel > Dog\n');
clientCode(squirrel);
