// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `function printQuiz(questions) {
  questions.forEach((question) => {
    console.log(question.description);
    switch (question.type) {
      case "boolean":
        console.log("1. True");
        console.log("2. False");
        break;
      case "multipleChoice":
        question.options.forEach((option, index) => {
          console.log(index + 1, option);
        });
        break;
      case "text":
        console.log("Answer: _____");
        break;
    }
    console.log("");
  });
}

const questions = [
  {
    type: "boolean",
    description: "This notes are useful",
  },
  {
    type: "multipleChoice",
    description: "Favorite fruit?",
    options: ["Apple", "Orange", "Pineapple", "Grape"],
  },
  {
    type: "text",
    description: "What is your job?",
  },
];

printQuiz(questions);

// This notes are useful
// 1. True
// 2. False

// Favorite fruit?
// 1 Apple
// 2 Orange
// 3 Pineapple
// 4 Grape

// What is your job?
// Answer: _____
`;

const EXAMPLE2 = `{
  type: "range",
  description: "What is the speed limit?"
}

case 'range':
  console.log("Minimum: _____")
  console.log("Maximum: _____")
  break;
`;

const EXAMPLE3 = `class BooleanQuestion {
  constructor(description) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("1. True");
    console.log("2. False");
  }
}

class MultipleChoiceQuestion {
  constructor(description, options) {
    this.description = description;
    this.options = options;
  }

  printQuestionChoices() {
    this.options.forEach((option, index) => {
      console.log(index + 1, option);
    });
  }
}

class TextQuestion {
  constructor(description) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("Answer: _____");
  }
}

class RangeQuestion {
  constructor(description) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("Minimum: _____");
    console.log("Maximum: _____");
  }
}

function printQuiz(questions) {
  questions.forEach((question) => {
    console.log(question.description);
    question.printQuestionChoices();
    console.log("");
  });
}

const questions = [
  new BooleanQuestion("This notes are useful"),
  new MultipleChoiceQuestion("Favorite fruit?", [
    "Apple",
    "Orange",
    "Pineapple",
    "Grape",
  ]),
  new TextQuestion("What is your job?"),
  new RangeQuestion("What is the speed limit?"),
];

printQuiz(questions);

// This notes are useful
// 1. True
// 2. False

// Favorite fruit?
// 1 Apple
// 2 Orange
// 3 Pineapple
// 4 Grape

// What is your job?
// Answer: _____

// What is the speed limit?
// Minimum: _____
// Maximum: _____
`;

const Page = () => {
  return (
    <main>
      <h1>Open Closed Principle</h1>
      <p>
        If we want to add a new type in questions, we need to update the switch
        case statement in printQuiz function. This violates Open Closed
        Principle.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <CodeSnippet language="javascript" code={EXAMPLE2} />
      <p>
        Open Closed means our utility functions to be Open for extension, but
        closed for modification.
      </p>
      <p>
        If we change the code outside the function, ideally that should not
        result in the code change inside function.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE3} />
    </main>
  );
};

export default Page;
