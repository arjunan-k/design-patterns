// @ts-nocheck

import Link from "next/link";
import Image from "next/image";
import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `let arr = new Array(1000).fill(0);
let newArray = arr;
`;

const EXAMPLE2 = `arr = null;
newArray = null;
`;

const EXAMPLE3 = `const obj = {
  name: "learnersbucket"
};

delete obj;
`;

const EXAMPLE4 = `const normalArray = (n) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
};
`;

const EXAMPLE5 = `const arrayWithPreAllocation = (n) => {
  const arr = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
};
`;

const EXAMPLE6 = `class ResourcePool {
  poolArray = null;
  constructor(constructorFunction, initialSize = 1000) {
    this.poolArray = new Array(initialSize).fill(0).map(constructorFunction);
  }
}
`;

const EXAMPLE7 = `class ResourcePoolMember {
  constructor(data) {
    this.data = data;
    this.available = true;
  }
}
`;

const EXAMPLE8 = `class ResourcePool {
  poolArray = null;

  // this two will be provided externally
  // this is default delcaration:
  creatorFunc = () => {};
  resetFunction = () => {};

  constructor(creatorFunc, resetFunction = (any) => any, size = 1000) {
    this.resetFunction = resetFunction;
    this.creatorFunc = creatorFunc;
    this.poolArray = new Array(size).fill(0).map(() => this.createElement());
  }

  // this will create a fresh instance
  // reset for safer side
  createElement() {
    const data = this.resetFunction(this.creatorFunc());
    return new ResourcePoolMember(data);
  }

  // returns the free resource from the pool
  getElement() {
    for (let i = 0; i < this.poolArray.length; i++) {
      if (this.poolArray[i].available) {
        this.poolArray[i].available = false;
        return this.poolArray[i];
      }
    }
  }

  // releases an element
  releaseElement(element) {
    element.available = true;
    this.resetFunction(element.data);
  }
}
`;

const EXAMPLE9 = `const creatorFunc = () => {
  return { counter: 0 };
};

const resetFunc = (coolThing) => {
  coolThing.counter = 0;
  delete coolThing.name;
  return coolThing;
};

const myPool = new ResourcePool(creatorFunc, resetFunc, 1);
const objectThatIsReadyToUse = myPool.getElement();

console.log(objectThatIsReadyToUse);
// {
//   "free": false,
//   "data": {
//     "counter": 0
//   }
// }

// ... doing stuff with objectThatIsReadyToUse.data
objectThatIsReadyToUse.data.counter++;
objectThatIsReadyToUse.data.name = "Prashant";
console.log(objectThatIsReadyToUse);
// {
//   "free": false,
//   "data": {
//     "counter": 1,
//     "name": "Prashant"
//   }
// }

myPool.releaseElement(objectThatIsReadyToUse);
console.log(objectThatIsReadyToUse);
// {
//   "free": true,
//   "data": {
//     "counter": 0
//   }
// }
`;

const EXAMPLE10 = `class ResourcePoolMember {
  constructor(data) {
    this.data = data;
    this.time = 0;
  }
}

const DURATION = 3000;

class ResourcePool {
  poolArray = null;
  resetFunction = () => {};
  creatorFunc = () => {};

  constructor(creatorFunc, resetFunction = (any) => any, size = 1000) {
    this.resetFunction = resetFunction;
    this.creatorFunc = creatorFunc;
    this.poolArray = new Array(size).fill(0).map(() => this.createElement());
  }

  createElement() {
    const data = this.resetFunction(this.creatorFunc());
    return new ResourcePoolMember(data);
  }

  getElement() {
    for (let i = 0; i < this.poolArray.length; i++) {
      // check if the resource allocation duration has expired
      if (Date.now() - this.poolArray[i].time > DURATION) {
        // release the element
        this.releaseElement(this.poolArray[i]);
        // assign the current time
        this.poolArray[i].time = Date.now();
        // return it
        return this.poolArray[i];
      }
    }
  }

  releaseElement(element) {
    element.time = 0;
    this.resetFunction(element.data);
  }
}
`;

const EXAMPLE11 = `const creatorFunc = () => {
  return { counter: 0 };
};

const resetFunc = (coolThing) => {
  coolThing.counter = 0;
  return coolThing;
};

const myPool = new ResourcePool(creatorFunc, resetFunc, 10);
const objectThatIsReadyToUse = myPool.getElement();

objectThatIsReadyToUse.data.counter++;
console.log(objectThatIsReadyToUse);
// {
//   "data": {
//     "counter": 1
//   },
//   "time": 1710445681593
// }

setTimeout(() => {
  const objectThatIsReadyToUse2 = myPool.getElement();

  console.log(objectThatIsReadyToUse === objectThatIsReadyToUse2);
  // true
  // same object is returned

  console.log(objectThatIsReadyToUse2);
  // {
  //   "data": {
  //     "counter": 0
  //   },
  //   "time": 1710445685157
  // }
}, 3500);
`;

const EXAMPLE12 = `const THRESHOLD_PERCENT = 10;
const INCREASE_PERCENT = 50;

class ResourcePool {
  poolArray = [];
  freeElements = 0;
  freeIndex = 0;
  resetFunction = () => {};
  creatorFunc = () => {};

  constructor(creatorFunc, resetFunction = (any) => any, size = 1000) {
    this.resetFunction = resetFunction;
    this.creatorFunc = creatorFunc;
    for (let i = 0; i < size; i++) {
      this.createElement();
    }
  }

  createElement() {
    this.freeElements++;
    this.poolArray.push(this.resetFunction(this.creatorFunc()));
    return this.poolArray[this.poolArray.length - 1];
  }

  increasePoolSize() {
    const increaseSize = Math.round(
      (INCREASE_PERCENT * this.poolArray.length) / 100
    );

    for (let i = 0; i < increaseSize; i++) {
      this.createElement();
    }

    this.freeElements += increaseSize;
  }

  getElement() {
    if (this.freeElements / this.poolArray.length <= THRESHOLD_PERCENT / 100) {
      this.increasePoolSize();
    }
    this.freeElements--;
    const freeElement = this.poolArray[this.freeIndex];
    this.poolArray[this.freeIndex++] = null;
    return freeElement;
  }

  releaseElement(element) {
    this.poolArray[--this.freeIndex] = element;
    this.resetFunction(element);
  }

  get size() {
    return this.poolArray.length;
  }
}
`;

const EXAMPLE13 = `const INCREASE_PERCENT = 50;
const THRESHOLD_PERCENT = 10;

class ResourcePoolMember {
  previousElement = null;
  nextElement = null;
  free = true;
  constructor(data) {
    this.data = data;
  }
}

class ResourcePool {
  poolArray = [];
  freeElements = 0;
  nextFree = null;
  lastFree = null;
  resetFunction = () => {};
  creatorFunc = () => {};
  constructor(creatorFunc, resetFunction = (any) => any, size = 1000) {
    this.resetFunction = resetFunction;
    this.creatorFunc = creatorFunc;
    for (let i = 0; i < size; i++) {
      this.createElement();
    }
    this.nextFree = this.poolArray[0];
  }

  createElement() {
    this.freeElements++;
    const data = this.resetFunction(this.creatorFunc());
    const newResourcePoolMember = new ResourcePoolMember(data);
    this.poolArray.push(newResourcePoolMember);
    if (!this.lastFree) {
      this.lastFree = newResourcePoolMember;
    } else {
      this.linkElement(newResourcePoolMember);
    }
    return newResourcePoolMember;
  }

  linkElement(element) {
    element.previousElement = this.lastFree;
    this.lastFree.nextElement = element;
    this.lastFree = element;
  }

  unlinkFirstElement(element) {
    this.nextFree = element.nextElement;
    this.nextFree.previousElement = null;
    element.nextElement = this.previousElement = null;
  }

  catchElement(element) {
    element.free = false;
    this.freeElements--;
    if (this.freeElements / this.poolArray.length < THRESHOLD_PERCENT / 100) {
      const increaseSize = Math.round(
        (INCREASE_PERCENT * this.poolArray.length) / 100
      );
      for (let i = 0; i < increaseSize; i++) {
        this.createElement();
      }
      this.freeElement += increaseSize;
    }
  }

  getElement() {
    const availableElement = this.nextFree;
    this.unlinkFirstElement(availableElement);
    this.catchElement(availableElement);
    return availableElement;
  }

  setElementAsFree(element) {
    element.free = true;
    this.linkElement(element);
    this.freeElements++;
  }

  releaseElement(element) {
    this.setElementAsFree(element);
    this.resetFunction(element.data);
  }
}
`;

const Page = () => {
  return (
    <main>
      <h1>What is Object Pool / Resource Pool?</h1>
      <p>
        When an object is requested, it is returned from the pool of available
        objects, if the object is not available, it will be created.
      </p>
      <p>
        Objects whose work is done can be released back to the pool so that they
        can be returned.
      </p>
      <h1>Why a resource pool?</h1>
      <p>
        Programming languages uses resource (memory) to function, and every
        object or variable defined consumes memory. To make performant apps, we
        need to manage the memory properly.
      </p>
      <p>
        Initializing a class instance is expensive. Out of the instantiated
        class only few instantiations are in use at any given time. In such
        scenario Object Pooling can help to improve performance.
      </p>
      <p>
        The memory is periodically cleaned with the help of garbage collection.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <p>
        In this, we have created a new array, <strong>arr</strong> and the
        variable <strong>newArray</strong> is pointing to arr, which means{" "}
        <strong>newArray</strong> is pointing to the memory address of the arr.
      </p>
      <p>
        In order for garbage collection to collect memory, we will have to set
        both instances to null.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE2} />
      <p>
        Similar to objects, we have to delete them, in order for garbage
        collection.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE3} />
      <p>
        It is better to maintain a pool of resources and reuse them rather than
        creating a new one and release them when work is done.
      </p>
      <h1>How does a resource pool work?</h1>
      <p>
        Imagine you are running the resource department in an organization. For
        a new employee, when they seek items (objects), you first check all the
        available items in the inventory, if they are available, you provide
        them to the employee. Otherwise you procure new items in your inventory
        in case of shortage and then give them to the employees, making an entry
        into the inventory. Similarly when the employee leaves the organization,
        they release the items back to the inventory, and the cycle continues.
      </p>
      <p>The same way resource pools also function:</p>
      <Image
        alt="Flow diagram of resource pool design pattern"
        src="/object-pool.png"
        width="768"
        height="585"
      />
      <h1>Implementing a Resource / Object pool DP in JS</h1>
      <p>
        The resource pool is only concerned with managing the pool of resources
        and how to release them. What to maintain and how to reset the resource
        during the release are handled externally, making the resource pool
        flexible and reusable to handle any type of object.
      </p>
      <p>
        A resource pool will always have a fixed size and will increase
        gradually. We will see both implementations.
      </p>
      <p>
        Remember, we are designing the resource pool only to make the
        application memory efficient and handle garbage collection effectively.
      </p>
      <p>
        Considering this, let us first see the difference between array
        initialization and its performance impact.
      </p>
      <p>
        <strong>Normal Way</strong>: declare the array and push the data.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE4} />
      <p>
        <strong>Efficient Way</strong>: declare the array, initialize it, and
        then push the data.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE5} />
      <p>
        In the majority of cases, <strong>arrayWithPreAllocation</strong> will
        outperform <strong>normalArray</strong>.
      </p>
      <p>
        <Link href="https://jsben.ch/K5rML" rel="noopener" target="_blank">
          <strong>Benchmark Scores</strong>
        </Link>
      </p>
      <p>
        Thus, we are going to go with the second way and pre allocate the array
        with the default value. Also because resoruce pool has to be only, we
        will follow the{" "}
        <Link
          href="/s/courses/658bee23e4b0174a3cb6c294/take#658dbdd3e4b0acde36435459"
          rel="noopener"
          target="_blank"
        >
          Signleton design pattern
        </Link>{" "}
        to share the resource pool instance accross the codebase.
      </p>
      <p>Initialize the resource pool class.</p>
      <CodeSnippet language="javascript" code={EXAMPLE6} />
      <p>
        We will accept the constructor function in the input, and it will return
        us an object or any resource that will be managed.
      </p>
      <p>
        The two important methods that this ResourcePool class has are{" "}
        <strong>getElement</strong> and <strong>releaseElement</strong>.
      </p>
      <p>There are two ways of releasing an element:</p>
      <ol>
        <li>By manually releasing the element</li>
        <li>
          Duration-based: the resource will be released after the specified
          duration.
        </li>
      </ol>
      <p>
        For either of these, we will need to maintain an object with the data
        and the flag to check if it is free or not.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE7} />
      <p>
        Using this, we can create a new object or resource every time and track
        it.
      </p>
      <h1>Resource pool with manual release function</h1>
      <CodeSnippet language="javascript" code={EXAMPLE8} />
      <p>
        We can test this by creating a creator function and a reset function.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE9} />
      <p>
        Here once the object is released, it will be reset according to the
        logic present in the reset function.
      </p>
      <p>
        Note: You would restrict the mutation of certain keys of the object,
        like the available flag, externally.
      </p>
      <h1>Resource pool with duration based allocation</h1>
      <p>
        In the duration based allocation, rather than maintaining the flag, we
        will maintain the time in milliseconds, and every time a new resource is
        asked, we will. Check if the previous resources are expired or not; if
        they are expired, we will reset them and return them.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE10} />
      <p>
        We can test this asking for resource after the duration of any previous
        resource.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE11} />
      <h1>Increasing the size of the resource pool</h1>
      <p>
        What if we you want to increase the resource pool size, but we dont want
        to create a large pool that is never used.
      </p>
      <p>There are two ways of doing it:</p>
      <ol>
        <li>
          Increase the size of the pool by a percentage X, when only Y percent
          of the pool is available if you are using the array, called{" "}
          <Link
            href="https://amitj975.medium.com/the-amortized-time-complexity-of-increasing-array-size-ddf0eb662027"
            rel="noopener"
            target="_blank"
          >
            <strong>amortized space increase,</strong>
          </Link>{" "}
          works in linear time O(N).
        </li>
        <li>
          Use <strong>doubly linked list</strong> or{" "}
          <strong>double ended queue</strong> and increase the size when
          required. We dont have to worry about reducing the size. It can adjust
          as per requirements and changes.
        </li>
      </ol>
      <h1>Approach 1: Increasing the pool size</h1>
      <p>
        One caveat in this is that you have to handle the edge case of reducing
        the pool size when a certain threshold of elements is free.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE12} />
      <h1>Approach 2: Using a doubly linked list or deque.</h1>
      <p>
        The advantage of using a deque of a doubly linked list is that when the
        next object is released and all its subsequent objects are also free,
        the next is marked as null and the list size is reduced, which releases
        the memory through garbage collection, making it memory efficient.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE13} />
    </main>
  );
};

export default Page;
