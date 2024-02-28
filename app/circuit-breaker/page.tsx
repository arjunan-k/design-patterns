// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `const CircuitBreaker = (fn, failureCount, timeThreshold) => {
  let failures = 0;
  let timeSinceLastFailure = 0;
  let isClosed = false;

  return (...args) => {
    if (isClosed) {
      let diff = Date.now() - timeSinceLastFailure;
      if (diff > timeThreshold) {
        isClosed = false;
      } else {
        console.log("Service Circuit Breaked");
        return;
      }
    }

    try {
      const response = fn.apply(this, args);
      failures = 0;
      console.log(response);
      return;
    } catch (err) {
      console.log(err);
      failures += 1;
      timeSinceLastFailure = Date.now();
      if (failures >= failureCount) {
        isClosed = true;
      }
    }
  };
};

const testFunction = (n) => {
  let count = 0;

  return () => {
    count += 1;
    if (count < n) {
      throw count + " Error calling the testFunction";
    } else {
      return "testFunction Succeeded";
    }
  };
};

const cb = CircuitBreaker(testFunction(5), 4, 1000);
cb();
cb();
cb();
cb();
cb();
cb();
setTimeout(() => cb(), 1100);

// 1 Error calling the testFunction
// 2 Error calling the testFunction
// 3 Error calling the testFunction
// 4 Error calling the testFunction
// Service Circuit Breaked
// Service Circuit Breaked
// testFunction Succeeded
`;

const Page = () => {
  return (
    <main>
      <h1>Circuit Breaker</h1>
      <p>
        Implement a circuit breaker that halts (stops temporarily) service, when
        the function is called before the time threshold if it fails for all y
        count.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
    </main>
  );
};

export default Page;
