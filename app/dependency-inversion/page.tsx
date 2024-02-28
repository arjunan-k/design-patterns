// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `class Store {
  constructor(user) {
    this.stripe = new Stripe(user);
    // this.paypal = new Paypal()
    // this.user = user
  }

  purchaseBike(quantity) {
    this.stripe.makePayment(200 * quantity * 100);
    // this.paypal.makePayment(this.user, 200 * quantity)
  }

  purchaseHelmet(quantity) {
    this.stripe.makePayment(15 * quantity * 100);
    // this.paypal.makePayment(this.user, 15 * quantity)
  }
}

class Stripe {
  constructor(user) {
    this.user = user;
  }

  makePayment(amountInCents) {
    console.log(
      this.user,
      "made payment of",
      amountInCents / 100,
      "dollar with stripe"
    );
  }
}

class Paypal {
  makePayment(user, amountInDollar) {
    console.log(user, "made payment of", amountInDollar, "dollar with paypal");
  }
}

const store = new Store("Walmart");
store.purchaseBike(5); // Walmart made payment of 1000 with stripe
store.purchaseHelmet(2); // Walmart made payment of 30 with stripe
`;

const EXAMPLE2 = ``;

const Page = () => {
  return (
    <main>
      <h1>Dependency Inversion Principle</h1>
      <p>
        Our Store is directly dependent on Payment method. If we want to change
        Stripe to Paypal, there will be lot of code change directly in Store.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <p>
        To fix this issue we need a intermediate wrapper to wrap both paypal and
        stripe so that our Store remains unaffected.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE2} />
    </main>
  );
};

export default Page;
