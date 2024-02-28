// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `class CalorieTracker {
  constructor(maxCalories) {
    this.maxCalories = maxCalories;
    this.currentCalories = 0;
  }

  addCalories(count) {
    this.currentCalories += count;
    if (this.currentCalories > this.maxCalories) {
      this.logCalorieSurplus();
    }
  }

  logCalorieSurplus() {
    console.log("Max Calories exceeded");
  }
}

const calorieTracker = new CalorieTracker(2000);
calorieTracker.addCalories(500);
calorieTracker.addCalories(1000);
calorieTracker.addCalories(700); // Max Calories exceeded
`;

const EXAMPLE2 = `// logger.js
export default function logMessage(message) {
  console.log(message);
  // Email the user in future instead of console.log(message)
}

// calorie-tracker.js
import logMessage from "./logger.js";

class CalorieTracker {
  constructor(maxCalories) {
    this.maxCalories = maxCalories;
    this.currentCalories = 0;
  }

  addCalories(count) {
    this.currentCalories += count;
    if (this.currentCalories > this.maxCalories) {
      logMessage("Max Calorie exceeded");
    }
  }
}

const calorieTracker = new CalorieTracker(2000);
calorieTracker.addCalories(500);
calorieTracker.addCalories(1000);
calorieTracker.addCalories(700); // Max Calorie exceeded
`;

const Page = () => {
  return (
    <main>
      <h1>Single Responsibility Principle</h1>
      <p>
        In the following example, It violates Single Responsibility Principle.
      </p>
      <p>
        All classes, modules, functions anything which can be put into a single
        part should have One Single Responsibility. It should have one reason to
        change in future.
      </p>
      <p>
        Here this CalorieTracker class changes if we change how we track
        calories or we decided to change how we log calorie surplus.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <p>
        Now CalorieTracker has one reason to change, if we decide to change how
        we track calories.
      </p>
      <p>
        If we want to change how we log messages, we change logger.js
        implementation.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE2} />
    </main>
  );
};

export default Page;
