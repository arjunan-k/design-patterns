// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `function Events() {
  this.subscriptionList = new Map();
  this.subscriptionListOnce = new Map();
  this.subscriptionListOnceAsync = new Map();

  this.subscribe = function (event, cb) {
    if (!this.subscriptionList.has(event)) {
      this.subscriptionList.set(event, []);
    }
    const existingCallbacks = this.subscriptionList.get(event);
    this.subscriptionList.set(event, [...existingCallbacks, cb]);

    return {
      remove: () => {
        const existingCallbacks = this.subscriptionList.get(event);
        const newCallbacks = existingCallbacks.filter(
          (callback) => callback !== cb
        );
        this.subscriptionList.set(event, newCallbacks);
      },
    };
  };

  this.subscribeOnce = function (event, cb) {
    if (!this.subscriptionListOnce.has(event)) {
      this.subscriptionListOnce.set(event, []);
    }
    const existingCallbacks = this.subscriptionListOnce.get(event);
    this.subscriptionListOnce.set(event, [...existingCallbacks, cb]);
  };

  this.subscribeOnceAsync = function (event) {
    return new Promise((resolve, reject) => {
      if (!this.subscriptionListOnceAsync.has(event)) {
        this.subscriptionListOnceAsync.set(event, [resolve]);
      }
      const existingCallbacks = this.subscriptionListOnceAsync.get(event);
      this.subscriptionListOnceAsync.set(event, [
        ...existingCallbacks,
        resolve,
      ]);
    });
  };

  this.publish = function (event, ...args) {
    const callbacks = this.subscriptionList.get(event) || [];
    callbacks.forEach((callback) => {
      callback.apply(this, args);
    });

    const onceCallbacks = this.subscriptionListOnce.get(event) || [];
    onceCallbacks.forEach((cb) => {
      cb.apply(this, args);
    });
    this.subscriptionListOnce.set(event, []);

    const onceAsyncCallbacks = this.subscriptionListOnceAsync.get(event) || [];
    onceAsyncCallbacks.forEach((cb) => {
      cb.apply(this, args);
    });
    this.subscriptionListOnceAsync.set(event, []);
  };

  this.publishAll = function (...args) {
    for (let [key, value] of this.subscriptionList.entries()) {
      value.forEach((cb) => {
        cb.apply(this, args);
      });
    }
  };
}

const events = new Events();
const newUserWelcomeSubcription1 = events.subscribe("new-user", (name) => {
  console.log("1: Welcome to the app", name);
});
events.publish("new-user", "Arjunan");
const newUserWelcomeSubcription2 = events.subscribe("new-user", (name) => {
  console.log("2: Welcome to the app", name);
});
events.publish("new-user", "John");
newUserWelcomeSubcription1.remove();
events.publish("new-user", "Marty");
events.publishAll("Everyone");
events.subscribeOnce("sub-once", (name) => {
  console.log("Can be published once", name);
});
events.publish("sub-once", "Kevin");
events.publish("sub-once", "Kevin");
events.subscribeOnceAsync("sub-async").then((val) => {
  console.log("This is Async Once Subscription of", val);
});
events.publish("sub-async", "Async Kevin");

// 1: Welcome to the app Arjunan
// 1: Welcome to the app John
// 2: Welcome to the app John
// 2: Welcome to the app Marty
// 2: Welcome to the app Everyone
// Can be published once Kevin
// This is Async Once Subscription of Async Kevin
`;

const Page = () => {
  return (
    <main>
      <h1>Observer / Pub Sub</h1>
      <p>
        Observer design pattern in JavaScript, Also known as Pub/Sub pattern
        short for publication/subscription. If you are subscribed to the
        publication and if something is published in the publication it will
        notify the subscriber.
      </p>
      <p>
        A subscription model in which an object subscribes to a host and the
        host notifies the object whenever an event occurs is known as the
        observer pattern. It is one of the important pillars of event-driven
        programming and JavaScript is one of the most popular event-driven
        programming languages.
      </p>
      <p>
        Eg: When a click event is triggered you can access the event object to
        get all the event details about the click like its position on the
        screen, etc. You can also remove the listener (unsubscribe) to stop
        listening if you want.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
    </main>
  );
};

export default Page;
