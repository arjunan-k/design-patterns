// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `class Address {
  constructor(zip, street) {
    this.zip = zip;
    this.street = street;
  }
}

class User {
  constructor(name, age, phone, address) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

const user = new User(
  "name",
  undefined,
  undefined,
  new Address("340", "Laplasa")
);
console.log(user);

// User {
//   name: 'name',
//   age: undefined,
//   phone: undefined,
//   address: Address { zip: '340', street: 'Laplasa' }
// }
`;

const EXAMPLE2 = `class Address {
  constructor(zip, street) {
    this.zip = zip;
    this.street = street;
  }
}

class User {
  constructor(name) {
    this.name = name;
  }
}

class UserBuilder {
  constructor(name) {
    this.user = new User(name);
  }

  setAge(age) {
    this.user.age = age;
    return this;
  }

  setPhone(phone) {
    this.user.phone = phone;
    return this;
  }

  setAddress(address) {
    this.user.address = address;
    return this;
  }

  build() {
    return this.user;
  }
}

const user = new UserBuilder("Bob")
  .setPhone(100)
  .setAddress(new Address(360, "Laplasa"))
  .build();
console.log(user);

// User {
//   name: 'Bob',
//   phone: 100,
//   address: Address { zip: 360, street: 'Laplasa' }
// }
`;

const EXAMPLE3 = `class Address {
  constructor(zip, street) {
    this.zip = zip;
    this.street = street;
  }
}

class User {
  constructor(name, { age = 10, phone, address } = {}) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

const user = new User("bob", {
  phone: 100,
  address: new Address(360, "Laplasa"),
});
console.log(user);

// User {
//   name: 'bob',
//   age: 10,
//   phone: 100,
//   address: Address { zip: 360, street: 'Laplasa' }
// }
`;

const Page = () => {
  return (
    <main>
      <h1>Builder</h1>
      <p>
        Builder pattern builds a complex object using simple objects and using a
        step by step approach. This builder is independent of other objects.
      </p>
      <p>
        If we want to create the User by only providing name and address, It
        will become difficult to dodge the unwanted arguments like age and
        phone.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <p>
        So all this undefined makes the code junky. To make it clean we can use
        Builder Pattern and only add the things which we need for the user.
      </p>
      <h1>General Builder Design Pattern</h1>
      <CodeSnippet language="javascript" code={EXAMPLE2} />
      <h1>JavaScript Focused Builder Design Pattern</h1>
      <CodeSnippet language="javascript" code={EXAMPLE3} />
    </main>
  );
};

export default Page;
