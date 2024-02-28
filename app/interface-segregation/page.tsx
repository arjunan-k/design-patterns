// @ts-nocheck

import CodeSnippet from "@/app/components/CodeSnippet";

const EXAMPLE1 = `class Entity {
  constructor(name, attackDamage, health) {
    this.name = name;
    this.attackDamage = attackDamage;
    this.health = health;
  }

  move() {
    console.log(this.name, "moved");
  }

  attack(targetEntity) {
    console.log(
      this.name,
      "attacked",
      targetEntity.name,
      "for",
      this.attackDamage,
      "damage"
    );
    targetEntity.takeDamage(this.attackDamage);
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log(this.name, "has", this.health, "health remaining");
  }
}

class Character extends Entity {}

class Wall extends Entity {
  constructor(name, health) {
    super(name, 0, health);
  }

  move() {
    return null;
  }

  attack() {
    return null;
  }
}

class Turret extends Entity {
  constructor(name, attackDamage) {
    super(name, attackDamage, -1);
  }

  move() {
    return null;
  }

  takeDamage() {
    return null;
  }
}

const turret = new Turret("Fort", 5);
const character = new Character("Arjunan", 3, 100);
const wall = new Wall("Wall", 200);

turret.attack(character);
character.move();
character.attack(wall);
turret.move()

// Fort attacked Arjunan for 5 damage
// Arjunan has 95 health remaining
// Arjunan moved
// Arjunan attacked Wall for 3 damage
// Wall has 197 health remaining
// returns null
`;

const EXAMPLE2 = `class Entity {
  constructor(name) {
    this.name = name;
  }
}

const mover = {
  move() {
    console.log(this.name, "moved");
  },
};

const attacker = {
  attack(targetEntity) {
    console.log(
      this.name,
      "attacked",
      targetEntity.name,
      "for",
      this.attackDamage,
      "damage"
    );
    targetEntity.takeDamage(this.attackDamage);
  },
};

const hasHealth = {
  takeDamage(amount) {
    this.health -= amount;
    console.log(this.name, "has", this.health, "health remaining");
  },
};

class Character extends Entity {
  constructor(name, attackDamage, health) {
    super(name);
    this.attackDamage = attackDamage;
    this.health = health;
  }
}

Object.assign(Character.prototype, mover);
Object.assign(Character.prototype, attacker);
Object.assign(Character.prototype, hasHealth);

class Wall extends Entity {
  constructor(name, health) {
    super(name);
    this.health = health;
  }
}

Object.assign(Wall.prototype, hasHealth);

class Turret extends Entity {
  constructor(name, attackDamage) {
    super(name);
    this.attackDamage = attackDamage;
  }
}

Object.assign(Turret.prototype, attacker);

const turret = new Turret("Fort", 5);
const character = new Character("Arjunan", 3, 100);
const wall = new Wall("Wall", 200);

turret.attack(character);
character.move();
character.attack(wall);
turret.move()

// Fort attacked Arjunan for 5 damage
// Arjunan has 95 health remaining
// Arjunan moved
// Arjunan attacked Wall for 3 damage
// Wall has 197 health remaining
// TypeError: turret.move is not a function
`;

const Page = () => {
  return (
    <main>
      <h1>Interface Segregation Principle</h1>
      <p>
        In the following code, we have Entity Class with all methods
        (Interface). But one major issue is that all Sub Classes are not making
        use of all the methods.
      </p>
      <p>
        {" "}
        Here all the Interface are in Composition. Sub Classes are having
        methods which they donot want.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE1} />
      <p>
        Now we have Segregated the Interface so that all Sub Classes will only
        have the methods (Interface) they need.
      </p>
      <CodeSnippet language="javascript" code={EXAMPLE2} />
    </main>
  );
};

export default Page;
