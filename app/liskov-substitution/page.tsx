// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `class Bird {
  fly() {
    console.log("I can fly");
  }
}

class Duck extends Bird {
  quark() {
    console.log("I can quark");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("I can't fly");
  }

  swim() {
    console.log("I can swim");
  }
}

const duck = new Duck();
const penguin = new Penguin();

function makeBirdFly(bird) {
  bird.fly();
}

makeBirdFly(duck); // I can fly
makeBirdFly(penguin); // ERROR! throw new Error("I can't fly")
`;

const EXAMPLE2 = `class FlyingBird {
  fly() {
    console.log("I can fly");
  }
}

class SwimmingBird {
  swim() {
    console.log("I can swim");
  }
}

class Duck extends FlyingBird {
  quark() {
    console.log("I can quark");
  }
}

class Penguin extends SwimmingBird {
  fly() {
    throw new Error("I can't fly");
  }
}

const duck = new Duck();
const penguin = new Penguin();

function makeFlyingBirdFly(bird) {
  bird.fly();
}

function makeSwimmingBirdSwim(bird) {
  bird.swim();
}

makeFlyingBirdFly(duck); // I can fly
makeSwimmingBirdSwim(penguin); // I can swim
`;

const Page = () => {
  return (
    <main>
      <h1>Liskov Substitution Principle</h1>
      <p>
        If we have a function which accepts a Class. The function should also
        work for all the Sub Class.
      </p>
      <p>
        Here makeBirdFly function works for Bird Class. For Duck Sub Class it
        passes. But for Penguin Sub Class it fails.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <p>We can fix this by changing what we are inheriting from.</p>
      <CodeSnippet language="javascript" code={EXAMPLE2} />
      <p>
        One possible issue with Object Oriented Programming & Inheritence is
        that, here in this example Duck can Swim and Fly. But it cannot inherit
        from two Classes FlyingBird & SwimmingBird.
      </p>
      <p>
        One way to fix this is by Composition. Just add swimming and flying
        functionality in Duck without extending from any class.
      </p>
    </main>
  );
};

export default Page;
