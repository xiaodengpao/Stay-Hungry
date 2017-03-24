// /**
// * @ name: 原型链继承
// * @ desc: 直接把父类实例扔到子类原型链上，简单粗暴
// */

// function Super() {
// 	this.name = 'super'
// }
// Super.prototype.say = function() {
// 	console.log(this.name);
// }
// // 子类
// function Sub() {
// 	this.name = 'sub'
// }
// Sub.prototype = new Super();

// let sub = new Sub();
// sub.say();

// /**
// * @ name: call、apply继承
// * @ desc: 继承父类的ownProperty而不是prototype的属性
// */
 
// function Super() {
// 	this.name = 'super'
// }
// Super.prototype.superSay = function() {
// 	console.log(this.name);
// }
// // 子类
// function Sub() {
// 	// 修改当前上下文，this/{}
// 	Super.call( this, undefined )
// }

// let sub = new Sub();
// console.log( sub.name );

// /**
// * @ name: 组合继承
// * @ desc: 1、继承父类的构造函数 2、原型链继承
// */

// function Super(){
//     this.name = 'Super';
// }
// Super.prototype.sayName = function(){
//     console.log(this.name);
// };
// function Sub(){
// 	// 继承属性
// 	Super.call(this, name);
//     this.age = '25year';
// }

// Sub.prototype = new Super();
// // 添加一个构造函数指针
// Sub.prototype.constructor = Sub; 
// Sub.prototype.sayAge = function(){
//     alert(this.age);
// };

// var sub = new Sub();
// console.log(sub)


// /**
// * @ name: 原型 式 继承
// * @ desc: 简单，轻量
// */

// let Super = {
//     name: "Super",
//     say: ()=> {
//     	console.log(this.name)
//     }
// }

// var Sub = Object.create(Super);
// console.log(Sub)

// /**
// * @ name: 寄生式继承
// * @ desc: 不是很清楚它的作用是什么
// */
// function Sub(original){ 
// 	var clone = original;
// 	clone.say = function(){
//     	console.log(this.name);
// 	};
// 	return clone;
// }
// console.log(object)

// /**
// * @ name: 寄生组合式继承           
// * @ desc: 其实就是组合继承的优化版，把原型链上的父类实例去掉，直接复制父类原型链上的方法  和ES6的类的继承很相似，但是有重大不同
// */

// function Super(){
//     this.name = 'super';
// }
// Super.prototype.sayName = function(){
//     console.log(this.name);
// };
// function Sub(){
//     Super.call(this, 'sub');
//     this.age = '25year';
// }
// inheritPrototype(Sub, Super)

// Sub.prototype.sayAge = function(){
//     console.log(this.age)
// };

// // 工具函数
// function inheritPrototype(sub, sup){
// 	// 深度复制
//     var prototype = object(sup.prototype);
//     // 更改构造函数指针
//     prototype.constructor = Sub;
//     Sub.prototype = prototype;
// }
// // 复制函数
// function object(ob){
// 	var obb = {};
// 	for (let item in ob) {
// 		if ( ob.hasOwnProperty(item) ){
// 			obb[item] = ob[item]
// 		}
// 	}
// 	return obb;
// }


// var sub = new Sub();
// sub.sayName(); // super
// // 因为原型式深度复制，父类原型的改变不会影响子类
// Super.prototype.sayName = ()=>{
// 	console.log('changed!')
// }
// sub.sayName(); // super


// /**
// * @ name: ES6类的继承
// * @ desc: ES6类的继承
// */

// class Super {
// 	constructor() {
// 		this.name = 'super'
// 	}
// 	say() {
// 		console.log(this.name)
// 	}
// }

// class Sub extends Super {
// 	constructor() {
// 		super();
// 		this.sec_name = 'sub'
// 	}
// }

// let sub = new Sub();

// sub.say(); // super

// // 父类原型的改变会影响子类！
// Super.prototype.say = () => {
// 	console.log('changed!')
// }

// sub.say(); // changed

// console.log(new Super()) // constructor-> Super
// console.log(sub) // constructor-> Sub