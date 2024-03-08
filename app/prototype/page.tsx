// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `class Robot {
  constructor(name) {
    this.name = name;
  }
}

const robot1 = new Robot("RoboCop");
const robot2 = new Robot("Ironman");

Robot.prototype.report = function () {
  console.log(this.name, "reporting sir!");
};

robot1.report(); // RoboCop reporting sir!
robot2.report(); // Ironman reporting sir!
`;

const EXAMPLE2 = `Array.prototype.append = function (str) {
  return this.map((e) => str + " " + e);
};

const arr = [1, 2, 3];
console.log(arr.append("Hello"));
// [ 'Hello 1', 'Hello 2', 'Hello 3' ]
`;

const Page = () => {
  return (
    <main>
      <h1>Prototype</h1>
      <p>
        We can make use of the prototype and form a pattern to remove the need
        to define the same method repeatedly rather create one on the prototype
        and share it with all the instances.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <p>Prototype for broader Non-Primitive Types like Array.</p>
      <CodeSnippet language="javascript" code={EXAMPLE2} />
    </main>
  );
};

export default Page;
