/**
* @ name: 单例模式
* @ desc: 通用的惰性单例
*/

/*
* 1、惰性函数、抽离出单例函数
*/
// const getSingle = function( fn ){
//     let instance;
// 	return function(){
// 		return instance || ( instance = fn .apply(undefined, arguments ) );
// 	}
// };
// let s =  getSingle(function(){
// 	console.log(1);
// })
// s();

// 单例模式并不适合构造函数，适用于普通的执行函数

/*
* 2、策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以根据不同策略进行替换
*/


/*
* 3、代理模式：保护代理、虚拟代理
*/

console.log(new Image)
