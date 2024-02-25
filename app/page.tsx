import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main>
      <h1>What is a Design Pattern?</h1>
      <p>
        Design patterns are repeatable template solutions for frequently
        occurring problems in software development.
      </p>
      <h2>Types of Design Patterns</h2>
      <h3>1. Creational</h3>
      <p>
        Creational design patterns are those that help solve problems around
        creating and managing new object instances in JavaScript. It can be as
        simple as limiting a class to having just one object.
      </p>
      <h5>
        <Link href={"./singleton"}>a. Singleton</Link>
      </h5>
      <div className="line-separator"></div>
      <h3>2. Structural</h3>
      <p>
        Structural design patterns are those that help solve problems around
        managing the structure (or schema) of JavaScript objects. These problems
        could include creating a relationship between two unlike objects.
      </p>
      <div className="line-separator"></div>
      <h3>3. Behavioral</h3>
      <p>
        Behavioral design patterns are those that help solve problems around how
        control (and responsibility) is passed between various objects. These
        problems could involve controlling access to a linked list or
        establishing a single entity that can control access to multiple types
        of objects.
      </p>
      <div className="line-separator"></div>
      <h3>4. Concurrency</h3>
      <p>
        Concurrency design patterns are those that help solve problems around
        multi-threading and multitasking. These problems could entail
        maintaining an active object among multiple available objects or
        handling multiple events supplied to a system by demultiplexing incoming
        input and handling it piece by piece.
      </p>
      <div className="line-separator"></div>
      <h3>5. Architectural</h3>
      <p>
        Architectural design patterns are those that help solve problems around
        software design in a broad sense. These generally are related to how to
        design your system and ensure high availability, mitigate risks, and
        avoid performance bottlenecks.
      </p>
      <ol>
        <li>MVC - Model View & Controller</li>
        <li>MVVM - Model View View Model</li>
      </ol>
    </main>
  );
}
