let hng = 100;
class Fighter {
    constructor({name, damage, hp, strength, agility}) {
        this.pname = name;
        this.pdamage = damage;
        this.php = hp;
        this.ptotalhp = hp;
        this.pstrength = strength;
        this.pagility = agility;
        this.pchance = (strength + agility) / hng;
        this.pwins = 0;
        this.plosses = 0;
    }
    getName() {
        return this.pname;
    }
    getDamage() {
        return this.pdamage;
    }
    getStrength() {
        return this.pstrength;
    }
    getAgility() {
        return this.pagility;
    }
    getHealth() {
        return this.php;
    }
    setHealth(value) {
        this.php = value;
    }
    getChance() {
        return this.pchance;
    }
    attack(def) {
        let ach = Math.random();
        if (def.getChance() < ach) {
            let value = def.getHealth() - this.pdamage < 0 ? 0 : def.getHealth() - this.pdamage;
            def.setHealth(value);
            console.log(`${this.pname} makes ${this.pdamage} damage to ${def.getName()}`);
        } else {
            console.log(`${this.pname} attack missed`);
        }
    }
    logCombatHistory() {
        console.log(`Name: ${this.pname}, Wins: ${this.pwins}, Losses: ${this.plosses}`);
    }
    heal(value) {
        this.php = this.php + value > this.ptotalhp ? this.ptotalhp : this.php + value;
    }
    dealDamage(value) {
        this.php = this.php - value < 0 ? 0 : this.php - value;
    }
    addWin() {
        this.pwins++;
    }
    addLoss() {
        this.plosses++;
    }
}

function battle(fg1, fg2) {
    const tr = true;
    if (fg1.getHealth() <= 0) {
        console.log(`${fg1.getName()} is dead and can't fight.`);
    } else if (fg2.getHealth() <= 0) {
        console.log(`${fg2.getName()} is dead and can't fight.`);
    } else {
        while (tr) {
            if (fg1.getHealth() === 0) {
                fg1.addLoss();
                fg2.addWin();
                console.log(`${fg2.getName()} has won!`)
                break;
            } else {
                fg1.attack(fg2);
            }
            if (fg2.getHealth() === 0) {
                fg2.addLoss();
                fg1.addWin();
                console.log(`${fg1.getName()} has won!`)
                break;
            } else {
                fg2.attack(fg1);
            }
        }
    }
}