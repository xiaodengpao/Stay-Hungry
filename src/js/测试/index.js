class Super {
	constructor() {
		this.name = 'super'
	}
	say() {
		console.log(this.name)
	}
}

class Sub extends Super {
	constructor() {
		super();
		this.sec_name = 'sub'
	}
}

let sub = new Sub();
sub.say();

Super.prototype.say = () => {
	console.log('changed!')
}
sub.say();

console.log(new Super()) //constructor-> Super
console.log(sub) //constructor-> Sub