// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `function createIterator(arr) {
  let index = 0;
  return {
    next() {
      if (index < arr.length) {
        const ans = { value: arr[index], done: false };
        index += 1;
        return ans;
      } else {
        return { value: null, done: true };
      }
    },
  };
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: null, done: true }
`;

const EXAMPLE2 = `function* Gen(arr) {
  yield* [...arr];
}

const g = Gen([1, 2, 3]);
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }
`;

const EXAMPLE3 = `const g = {};

g[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

console.log([...g]); // [1,2,3]
`;

const EXAMPLE4 = `function* CreateIterator1(arr) {
  yield* [...arr];
}

const iterator = CreateIterator1([1, 2, 3]);

for (const item of iterator) {
  console.log(item);
}
// 1 2 3

for (const item of iterator) {
  console.log(item);
}
//
`;

const EXAMPLE5 = `const g = {};

g[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

for (const item of g) {
  console.log(item);
}
// 1 2 3

for (const item of g) {
  console.log(item);
}
// 1 2 3
`;

const EXAMPLE6 = `function* RoundRobin(collection) {
  let current = 0;
  while (true) {
    const reset = yield collection[current++ % collection.length];
    if (reset) {
      current = 0;
    }
  }
}

const rr = RoundRobin([1, 2, 3, 4]);
console.log(rr.next()); //{"value": 1, "done": false }
console.log(rr.next()); //{"value": 2, "done": false }
console.log(rr.next()); //{"value": 3, "done": false }
console.log(rr.next(true)); //{"value": 1, "done": false } // reset's the counter
console.log(rr.next()); //{"value": 2, "done": false }
console.log(rr.next()); //{"value": 3, "done": false }
console.log(rr.next()); //{"value": 4, "done": false }
console.log(rr.next()); //{"value": 1, "done": false }
console.log(rr.next()); //{"value": 2, "done": false }
`;

const Page = () => {
  return (
    <main>
      <h1>Iterator</h1>
      <p>
        While they get most of the work done, there is often we want to iterate
        these collections of data at convince, getting the next data from the
        collection at the method invocation.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <h1>Creating iterators using Generator functions in JavaScript</h1>
      <CodeSnippet language="javascript" code={EXAMPLE2} />
      <h1>Creating iterators using Symbol.iterator static method</h1>
      <CodeSnippet language="javascript" code={EXAMPLE3} />
      <h1>
        We can use the Generators functions to create iterators that will
        iterate only once.
      </h1>
      <CodeSnippet language="javascript" code={EXAMPLE4} />
      <h1>
        While multiple iterable iterators can be created using Symbol.iterator
      </h1>
      <CodeSnippet language="javascript" code={EXAMPLE5} />
      <h1>Round Robin</h1>
      <p>
        For example, assume you are assigning values based on the round-robin
        principle on each invocation, you can pass the value to the{" "}
        <code>next()</code> method to reset it at any point.
      </p>
      <p>
        We can use <strong>singleton pattern</strong> along with the iterator
        and share the round-robin logic throughout the application code.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE6} />
    </main>
  );
};

export default Page;
