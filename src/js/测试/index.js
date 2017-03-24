/**
 * @ desc: 实现一个完整的Promise
 */

/** 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果
 * 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息
 * Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处
 */

// Promise新建后就会立即执行
var test = 'window'
// var promise = new Promise(function(resolve, reject){
// 	resolve(111)
// })

// promise.then(function(val) {
// 	console.log(val)
// 	return 1
// }).then(function(val) {
// 	console.log(val)
// })

// .then函数需要暂停执行的话，只要return一个new promise 对象



/** 
 * 实现一个Promise
 * 如何理解NEW操作：function在执行的时候会创建自己的一片作用域（每执行一次创建一个）相对的，new操作时候，function会运行，那么也会创建私有作用域。
 * 至于这个作用域是依托于new新建的对象，还是函数运行，我们并不关心。因为new操作传入的参数是函数，函数是异步操作，引用了Promise作用域内的变量（resolve、reject）
 * 作用域不会被销毁，那么目的就达到了
 */

function Promise(executor) {
	// new Promise()时保存this指针
	var promise = this
	promise._resolves = []
	promise._rejects = []
	// 状态
	promise._status = 'PENDING'
	promise._data = null

	function resolve(val) {
		if( this._status === 'PENDING') {
			this._status = 'RESOLVED'
		}
		setTimeout(function(){
			promise._resolves.map(function(fn) {
				// 传递数值
				fn(val)
			})
		}, 0)
	}
	function reject(e) {
		console.log(e)
	}
	// then有两种状态
	this.then = function(onResolved, onRejected){
		promise._resolves.push(onFulfilled)
		return this
	}
	// executor可能会出错，而如果executor出错，Promise应该被其throw出的值reject
	// 异步是catch不到这个错误的
	// executor函数内部需要在异步时添加try catch
	try {
    	executor(resolve, reject) // 执行executor
  	} catch(e) {
    	reject(e)
  	}
}
var promise = new Promise(function(resolve, reject){
	console.log('resolve')
	resolve('111')
})
promise.then(function(val) {
	console.log(val)
})
