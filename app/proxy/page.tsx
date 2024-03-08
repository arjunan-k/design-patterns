// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `const Obj = {
  name: "Arjunan",
  age: 12,
  gender: "Male",
};

Obj.age = "ten";
Obj.gender = true;

console.log(Obj);
// { name: 'Arjunan', age: 'ten', gender: true }
`;

const EXAMPLE2 = `const Obj = {
  name: "Arjunan",
  age: 12,
  gender: "Male",
};

const proxiedObj = new Proxy(Obj, {
  get(obj, prop) {
    if (prop === "age") {
      Reflect.set(obj, prop, obj[prop] + 1);
      return Reflect.get(obj, prop);
    }
    return Reflect.get(obj, prop);
  },
  set(obj, prop, value) {
    if (prop === "gender") {
      if (typeof value !== "string") {
        return console.log("The value of", prop, "needs to be string");
      }
      if (value === "Male" || value === "Female") {
        return Reflect.set(obj, prop, value);
      }
      return console.log("The value of", prop, "needs to be Male or Female");
    }
  },
});

proxiedObj.gender = true;
console.log(proxiedObj);
console.log(proxiedObj["age"]);
proxiedObj.gender = "true";
console.log(proxiedObj);
console.log(proxiedObj["age"]);
proxiedObj.gender = "Female";
console.log(proxiedObj);

// The value of gender needs to be string
// { name: 'Arjunan', age: 12, gender: 'Male' }
// 13
// The value of gender needs to be Male or Female
// { name: 'Arjunan', age: 13, gender: 'Male' }
// 14
// { name: 'Arjunan', age: 14, gender: 'Female' }
`;

const Page = () => {
  return (
    <main>
      <h1>Proxy</h1>
      <p>
        Proxy is the concept of doing things via an intermediatory, for example,
        if you want to change something in the original source, you hand your
        changes to your proxy which can do all sorts of validations on it to
        make sure only legit things are passed and then it forwards to the
        original source.
      </p>
      <p>
        In normal object updates we donot have type checking in place. So we end
        up mutating (altering) the types of object values.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <p>
        Proxy in JS helps us to solve this issue by acting as a intermediatory
        between the actual object and object updates.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE2} />
    </main>
  );
};

export default Page;
