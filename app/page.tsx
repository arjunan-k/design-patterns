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
      <h5>
        <Link href={"./single-responsibility"}>
          b. Single Responsibility Principle
        </Link>
      </h5>
      <h5>
        <Link href={"./open-closed"}>c. Open Closed Principle</Link>
      </h5>
      <h5>
        <Link href={"./liskov-substitution"}>
          d. Liskov Substitution Principle
        </Link>
      </h5>
      <h5>
        <Link href={"./interface-segregation"}>
          e. Interface Segregation Principle
        </Link>
      </h5>
      <h5>
        <Link href={"./dependency-inversion"}>
          f. Dependency Inversion Principle
        </Link>
      </h5>
    </main>
  );
}
