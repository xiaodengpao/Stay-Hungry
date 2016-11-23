class Observe {
	constructor(data) {
		this._data = data;
		this.init();
	}

	init() {
		for ( let item in this._data ){
			// ES6的块级作用于 LET声明创建多个Dep实例
			let dep = new Dep();
			if ( this._data.hasOwnProperty(item) ){
				Object.defineProperty( this, item, {
					set: val=> {
						if (this._data[item] !== val){
							this._data[item] = val;
							dep.trigger();
						}
					},
					// watch的时候会调用get，将watcher对象推入栈中
					get: ()=> {
						if( Dep.target ) {
							dep.push( Dep.target )
							Dep.target = null;
						}
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
	constructor( exp, vm, func) {
		this.func = func;
		
		// 把watcher扔进Dep.target指针
		Dep.target = this;

		// 读取Observe的a变量，调用get
		vm[exp];
	}
	update(...arg) {
		this.func.apply(  null, ...arg );
	}
}

let ob = new Observe({a:1,b:2});

new Watcher( 'a', ob, function(){console.log(this)} )
ob.a = 3;



