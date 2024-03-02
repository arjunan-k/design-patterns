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
      <h5>
        <Link href={"./singleton"}>a. Singleton</Link>
      </h5>
      <h5>
        <Link href={"./observer"}>b. Observer / Pub Sub</Link>
      </h5>
      <h5>
        <Link href={"./proxy"}>c. Proxy</Link>
      </h5>
      <h5>
        <Link href={"./circuit-breaker"}>d. Circuit Breaker</Link>
      </h5>
      <h2>SOLID Principles</h2>
      <h5>
        <Link href={"./single-responsibility"}>
          a. Single Responsibility Principle
        </Link>
      </h5>
      <h5>
        <Link href={"./open-closed"}>b. Open Closed Principle</Link>
      </h5>
      <h5>
        <Link href={"./liskov-substitution"}>
          c. Liskov Substitution Principle
        </Link>
      </h5>
      <h5>
        <Link href={"./interface-segregation"}>
          d. Interface Segregation Principle
        </Link>
      </h5>
      <h5>
        <Link href={"./dependency-inversion"}>
          e. Dependency Inversion Principle
        </Link>
      </h5>
    </main>
  );
}
