// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `function Counter() {
  this.count = 0;

  this.increment = () => {
    this.count++;
  };

  this.decrement = () => {
    this.count--;
  };
}

let counter1 = new Counter();
let counter2 = new Counter();
console.log(counter1 === counter2); // false
`;

const EXAMPLE2 = `const Singleton = (function () {
  let instance;

  function createInstance() {
    if (!instance) {
      instance = new Counter();
    }
    return instance;
  }

  return {
    createInstance,
  };
})();

counter1 = Singleton.createInstance();
counter2 = Singleton.createInstance();
console.log(counter1 === counter2); // true
`;

const Page = () => {
  return (
    <main>
      <h1>Singleton - Creational</h1>
      <p>
        Creational design patterns are those that help solve problems around
        creating and managing new object instances in JavaScript. It can be as
        simple as limiting a class to having just one object.
      </p>
      <p>
        The Singleton pattern is one of the most commonly used design patterns
        across the software development industry. The problem that it aims to
        solve is to maintain only a single instance of a class.
      </p>
      <p>
        When we create two new instance of Counter, The instance of both objects
        are different.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <p>
        This Singleton example is specific to Counter. We can accept the
        Function() constructor as params inside the Singleton and use a Map data
        structure to store all the instances.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE2} />
    </main>
  );
};

export default Page;
