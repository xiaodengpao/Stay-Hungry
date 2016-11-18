import {designJS} from './designJS.js'

/**
* @ author: xingdongpeng
* @ name: EventEmitter 观察者模式
* @ date: 2016-11-10
*/
class EventEmitter {
	constructor() {
		this._events = {};
	}

	// 监听 
	on(event, fn) {
		this._events[event] = fn;
	}

	// 发送事件
	emit(event, fn) {
		this._events[event]();
		typeof(fn) === 'function' && fn();
	}
}


/**
* @ author: xingdongpeng
* @ name: observe
* @ date: 2016-11-11
* @ desc: 这个类实现的目的是为了代理JSON对象的key，new Observer() 生产的类的实例是我们需要的响应式数据
*/
class Observer {
	constructor(data) {
		// 数据绑定在data属性下
		this._originData = data;
		// 递归
		this.walk(data);
	}

	// 遍历data对象的属性
	walk(obj) {
		let val;
		// babel 不支持for of 
	    for (let key in obj) {
	        // for...in 循环会把对象原型链上的所有可枚举属性都循环出来，用hasOwnProperty过滤。
	        if (obj.hasOwnProperty(key)) {
	            val = obj[key];

	            // 这里进行判断，如果还没有遍历到最底层，继续new Observer
	            if (typeof val === 'object') {
	                // 深度递归
	                new Observer(val);
	            }
	            // 实际上这里出现了闭包，key、val 是conver函数的参数，会在函数内let声明，而let是会形成闭包的。
	            // 函数内真的是let声明吗，效果和下面代码相同。
	            this.convert(key, val);
	       //      var that = this;
	       //      (function(key, val){
	       //      	Object.defineProperty(that.data, key, {
				    //     enumerable: true,
				    //     configurable: true,
				    //     get: function () {
				    //         console.log('你访问了' + key);
				    //         return val
				    //     },
				    //     set: function (newVal) {
				    //         console.log('你设置了' + key);
				    //         console.log('新的' + key + ' = ' + newVal)
				    //         if (newVal === val) return;
				    //         val = newVal
				    //     }
				    // })
	       //      })(key, val)
	       //  }
		    }
		}     
	}

	// 定义响应式变量，代理data的key --> 返回响应式数据
	convert (key, val) {
		// 每个key一个订阅器。因为在闭包函数中声明dep，所以dep一对一的。
		// 神来之笔
		let dep = new Dep();
		// this指向 Observer 的实例，把this改装成响应式对象
		Object.defineProperty(this, key, {
	        enumerable: true,
	        configurable: true,
	        get: function () {
	        	// 如果是watcher初始化的时候调用get就把watcher添加进Dep
	        	if(Dep.target){
			    	dep.addSub(Dep.target);
			    }
	            console.log('你访问了' + key);
	            return val
	        },
	        set: function (newVal) {
	            console.log('新的' + key + ' = ' + newVal)
	            if (newVal === val) return;
	            val = newVal;
	            dep.notify();
	        }
	    })
	}
}


/**
* @ author: xingdongpeng
* @ name: 消息订阅器
* @ date: 2016-11-13
*/
class Dep {  
	constructor() {
		// 存放Watcher
		this.subs = []
	}
	// 添加Watcher
	addSub(sub) {
		this.subs.push(sub)
	}
	notify() {
		this.subs.forEach(sub=>sub.update())
	}
}

// 通过observe改变this指向
function observe (value, vm) {
	if (!value || typeof value !== 'object') {
		return
	}
	vm._data =  new Observer(value)
}



/**
* @ author: xingdongpeng
* @ name: Watcher
* @ date: 2016-11-13
* @ desc: 观察者，被回调的对象，存放于Dep数组中
*/
class Watcher {
	// watcher会触发data的get代理
	constructor(vm, expOrFn, cb) {
		this.cb = cb;
		this.vm = vm;
		this.expOrFn = expOrFn
		// 获取监听key的value，此时会进入key的闭包环境，并趁机添加进Dep数组
		this.value = this.get();
	}
	update(){
		// 调用回调函数
		this.run();
	}
	run(){
		const  value = this.get();
		if(value !== this.value) {
			this.value = value
			// 上下文换成vm对象，供回调函数使用
			this.cb.call(this.vm)
		}
	}
	// 创建watcher时候会调用，此时如果是第一次创建，那么把watcher添加到Dep数组
	get(){
		Dep.target = this;
		//watcher和data都在vm对象下，watch自身的key
		const value = this.vm._data[this.expOrFn]
		// 用后清空
		Dep.target = null;
		return value
	}
	remove() {
		console.log('remove')
	}
}

/**
* @ author: xingdongpeng
* @ name: Compile
* @ date: 2016-11-14
* @ desc: 模板编译器 
*/
class Compile {
	constructor(el, vm) {
		this.$vm = vm;
	    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

	    if (this.$el) {
	        this.$fragment = this.node2Fragment(this.$el);
	        this.init();
	        this.$el.appendChild(this.$fragment);
	    }
	}

	node2Fragment(el) {
        let fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    }

    init() {
        this.compileElement(this.$fragment);
    }

    compileElement(el) {
        let childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    }

    compile(node) {
        let nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            let attrName = attr.name;
            if (me.isDirective(attrName)) {
                let exp = attr.value;
                let dir = attrName.substring(2);
                // 事件指令
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    }

    compileText(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    }

    isDirective(attr) {
        return attr.indexOf('v-') == 0;
    }

    isEventDirective(dir) {
        return dir.indexOf('on') === 0;
    }

    isElementNode(node) {
        return node.nodeType == 1;
    }

    isTextNode(node) {
        return node.nodeType == 3;
    }
}

const compileUtil = {
    text(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    html(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        let me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', (e) => {
            let newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind(node, vm, exp, dir) {
        let updaterFn = updater[dir + 'Updater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler(node, vm, exp, dir) {
        let eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal(vm, exp) {
        let val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal(vm, exp, value) {
        let val = vm._data;
        exp = exp.split('.');
        exp.forEach((k, i)=> {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


const updater = {
    textUpdater(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater(node, value, oldValue) {
        let className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        let space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};




/**
* @ author: xingdongpeng
* @ desc: vue对象
* @ date: 2016-11-14
*/

class Vue  {
	constructor (options) {
		let data = this._data = options;
		Object.keys(data).forEach(key=>this._proxy(key))
		observe(data, this);
	}

	$watch(expOrFn, cb){
		return new Watcher(this, expOrFn, cb);
	}

	// 代理自己的_data属性，vue对象上的属性其实是_data属性上的 
	_proxy(key) {
		var that = this;
		Object.defineProperty(that, key, {
			configurable: true,
			enumerable: true,	
			get: ()=> {
				console.log('vue-get')
				return that._data[key]
			}, 
			set: (val)=> {
				console.log('vue-set')
				that._data[key] = val
			}
		})
	}
}




// let v = new Vue({a: 2, b: 3});
// var t = v.$watch('a',function(){
// 	console.log('a触发了回调函数!')
// })





/**
* @ author: xingdongpeng
* @ desc: observe Array
* @ date: 2016-11-11
*/
const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

// 构造一个数组对象的原型指针 arrayAugmentations
const arrayAugmentations = [];
aryMethods.forEach((method)=> {

    // 这里是原生Array的原型方法
    let original = Array.prototype[method];

   // 将push, pop等封装好的方法定义在对象arrayAugmentations的属性上
   // 注意：是属性而非原型属性
    arrayAugmentations[method] = function () {
        console.log('我被改变啦!');

        // 调用对应的原生方法并返回结果
        return original.apply(this, arguments);
    };
})

let list = ['a', 'b', 'c'];

// 把list对象的原型指针指向 arrayAugmentations
list.__proto__ = arrayAugmentations;

// 错误的做法：
// class FakeArray extends Array{
// 	// reset运算符
// 	constructor(...args) {
// 		// 扩展运算符
// 		super(...args);
// 		console.log(typeof this) // object  Array数据类型并不能被很好的继承，返回来的依旧是array对象而非FakeArray
// 		this.methods(); // err: methods方法不存在
// 	}
// 	methods(...args){
// 	}
// }
