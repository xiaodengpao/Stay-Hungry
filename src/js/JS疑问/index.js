/**
 * @ name: 	JS的作用域和this
 */
var name = 'window';

function Child() {
	this.name = 'child'
}

Child.prototype.say = function(Func) {
	Func();
	this.func = Func;
	this.func();
}

var child = new Child();

function a (){
	console.log(name)
}
+ function(){
	var name = 2;
	var self = 'self';
	child.say(function(){
		console.log(self); // self
		console.log(this); // window   child
	})
	Child.prototype.speak = function() {
		console.log(name) // 2 
	}
	child.speak();
}()

// 打印结果 window、2、child、2 

/**
 * 1、JS三剑客：作用域、编译器、引擎
		引擎：从头到尾负责整个JavaScript程序的编译及执行过程。
    	编译器：负责词法分析及代码生成
    	作用域：负责收集并维护由所有声明的变量组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些变量的访问权限。

 * 2、function在运行前，并不对内部进行作用域分析、词法分析，只会对function本身做一个分析（因为function是属于当前作用域）。
 		所有的function内的东东都不会编译、作用域分析，你写啥JS引擎根本不知道。function运行时会创建一个作独立的作用域，需要的变量，会按照作用域链一步一步去寻。

 * 3、以speak为例，function的作用域在整个作用域链中的位置，在声明时就已经确定。 运行时，会根据声明时的作用域及作用域链来取值，运行。
 		简单来说，某个函数的作用域不取决于他的调用位置，取决于声明位置。
 */

 // 关于编译器
 // 首先遇到var index，"编译器"会询问"作用域"：当前的作用域中是否有index，如果是，那么"编译器"会忽略这个声明，继续进行编译；
 // 如果否，那么它会要求“作用域”在当前的作用域声明一个新的变量，并命名为index.
 // 编译完成，作用域链也就完成了
 // 当引擎进行RHS查询时，如果查询到作用域链的顶层（全局作用域）依旧未找到index变量，那么引擎就会抛出一个ReferenceError异常。
 // 当引擎进行LHS查询，在全局作用域中也未能找到目标变量（本例中的index），在非严格模式下，会在全局作用域中创建一个该名称的变量。而在严格模式下，会同RHS查询一样，抛出一个ReferenceError异常。
 // 第一步：编译，第二步：执行，编译完成，作用域链也就搞定了。

