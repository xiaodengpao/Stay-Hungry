/**
* @ name: 单例模式
* @ desc: 通用的惰性单例
*/

/*
* 1、惰性函数、抽离出单例函数
*/
const getSingle = function( fn ){
    let instance;
	return function(){
		return instance || ( instance = fn .apply(undefined, arguments ) );
	}
};
let s =  getSingle(function(){
	
})
s();

// 简单的单利实现方法，不考虑后期的维护性，简单实用。
const singleFunc = ( function(){
	let once = false;
	return function(name){
		if (!once){
			this.name = name;
			once = this;
		}else {
			return once;
		}
	}
}
)();

// let instance_0 = new singleFunc('instance_0');
// let instance_1 = new singleFunc('instance_1');
// console.log( instance_1 === instance_0) // true
// 单例模式并不适合构造函数，适用于普通的执行函数

/*
* 2、策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以根据不同策略进行替换
*/


/*
* 3、代理模式：保护代理、虚拟代理
*/
let myImage = (function(){
	let imgNode = document.createElement( 'img' ); 
	document.body.appendChild( imgNode );
	return function( src ){ 
		imgNode.src = src;
	}
})()

let proxyImage = (function(){ 
	let img = new Image;
	img.onload = function(){ 
		myImage( this.src );
	}
	return function( src ){
		myImage( '../img/avatar.jpg' ); 
		img.src = src;
	}
})()
// proxyImage( 'http://xingdongpeng.com/images/avatar.jpg' );


/*
* 4、发布-订阅模式（观察者模式）
*/

