
class Observe {
	constructor(data) {
		this._data = data;
		this.init();
	}

	init() {
		for ( let item in this._data ){
			if ( this._data.hasOwnProperty(item) ){
				// ES6的块级作用于 LET声明
				Object.defineProperty( this, item, {
					set: val=> {
						this._data.item = val;
					},
					get: ()=> {
						return this._data[item];
					}
				} );
			}
		}
		
	}
}

class Dep {
	constructor() {
		this.sub = [];
	}
	trigger() {
		this.sub.forEach((...arg) => {
			arg[0].update();
		})
	}
	push(watcher) {
		this.sub.push(watcher);
	}
}

class Watcher {
	constructor() {

	}
}

let ob = new Observe({a:1,b:2});
console.log(ob)


