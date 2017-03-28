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
 * new的过程中，首先搞了个新的对象出来，然后连接了下原型链，绑定下this，运行下构造函数。
 * JS是脚本语言，是逐条执行的，不会进行传统的编译工作。new Promise(cb)执行时，resolve()会立即执行。
 * 但是resolve函数把一坨函数扔进了异步栈，异步栈会等到主进程执行完才执行。
 * 由于异步栈对resolve函数的引用（ 和闭包一个道理），new promise 时创建的私有作用域不会被销毁
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
		// 只有PENDING状态下的resolve才有效果，多次resolve并不能多次触发回调函数
		if( promise._status === 'PENDING') {
			promise._status = 'RESOLVED'
			promise._data = val
			setTimeout(function(){
				promise._resolves.map(function(fn) {
					fn()
				})
			}, 0)
		}
	}
	function reject(e) {
		if( promise._status === 'PENDING') {
			promise._status = 'REJECTED'
			promise._data = val
			setTimeout(function(){
				promise._rejects.map(function(fn) {
					fn()
				})
			}, 0)
		}
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

Promise.prototype.then = function(onResolved, onRejected){
	var self = this
	if (self._status === 'PENDING') {
	// pending状态时，把回调函数扔进_solves数组，等待状态改变
	// 返回一个promise对象，链式调用。
	// onResolved、onRejected 扔进当前promise对象的_resolves、_rejects数组中，以供后续使用
		return nextPromise = new Promise(function(resolve, reject) {
			self._resolves.push(function() {
				try {
					var ret = onResolved(self._data)
					if (ret instanceof Promise) {
						ret.then(resolve, reject)
					}
				} catch (e) {
					reject(e)
				}
			})

			self._rejects.push(function() {
				try {
					var ret = onRejected(self._data)
					if (ret instanceof Promise) {
						ret.then(resolve, reject)
					}
				} catch (e) {
					reject(e)
				}
			})
		})
	}

	if (self._status === 'RESOLVED') {
    // resolved状态时，直接调用onResolved
    return nextPromise = new Promise(function(resolve, reject) {
			try {
				var ret = onResolved(self._data)
				if (ret instanceof Promise) { 
					// 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
					ret.then(resolve, reject)
				}
				resolve(ret) // 否则，以它的返回值做为promise2的结果
			} catch (e) {
				reject(e) // 如果出错，以捕获到的错误做为promise2的结果
			}
    	})
  	}
}

var promise = new Promise(function(resolve, reject){
	console.log('resolve')
	resolve('111')
})
promise.then(function(val) {
	return 1
})
.then(function(val){
	console.log(val)
})
