/**
 * Iterator는 복잡한 데이터 구조를 내부의 세부적인 정보를 노출하지 않고 순차적으로 통과할 수 있는 동작 설계 패턴입니다.
 * 컬렉션의 형태(list, stack, tree, etc.)를 노출하지 않고 Element를 순회할 수 있습니다.
 */

interface CustomIterator<T> {
  // 현재 element를 반환합니다.
  current(): T;

  // 현재 Element를 반환하고 다음 Element로 이동합니다.
  next(): T;

  // 현재 Element의 키를 반환합니다.
  key(): number;

  // 현재 위치가 유효한지 확인합니다.
  valid(): boolean;

  // Iterator를 첫 번째 Element로 되감습니다.
  rewind(): void;
}

interface Aggregator {
  // 외부의 Iterator를 검색합니다.
  getIterator(): CustomIterator<string>;
}

/**
 * 추상화된 Iterator는 다양한 순회 알고리듬을 구현합니다.
 * 이러한 클래스는 현재 순회 위치를 항상 저장하고 있습니다.
 */

class AlphabeticalOrderIterator implements CustomIterator<string> {
  private collection: WordsCollection;

  /**
   * 현재 순회 위치를 저장합니다.
   * 특히, Iterator는 특정 종류의 컬렉션과 작동할 때 반복 상태를 저장하기 위한 많은 다른 필드를 가질 수 있습니다.
   */
  private position = 0;

  /**
   * 이 변수는 순회 방향을 나타냅니다.
   */
  private reverse = false;

  constructor(collection: WordsCollection, reverse = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  public current(): string {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }
}

/**
 * 추상화된 컬렉션은 컬렉션 클래스와 호환되는 새 Iterator 인스턴스를 검색할 수 있는 여러 방법을 제공합니다.
 */
class WordsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getIterator(): CustomIterator<string> {
    return new AlphabeticalOrderIterator(this);
  }

  public getReverseIterator(): CustomIterator<string> {
    return new AlphabeticalOrderIterator(this, true);
  }
}

/**
 * 프로그램에서 유지하려는 방향 수준에 따라 클라이언트 코드가 추상화 된 사용자 정의 Iterator 또는 컬렉션 클래스를 모를 수도 있습니다.
 */
const collection = new WordsCollection();
collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');

const iterator = collection.getIterator();

console.log('Straight traversal:');
while (iterator.valid()) {
  console.log(iterator.next());
}

console.log('');
console.log('Reverse traversal:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
  console.log(reverseIterator.next());
}
