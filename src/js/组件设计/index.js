// /**
// * @ name: 组件设计
// * @ desc: 使用高阶函数实现类的扩展设计
// * @ desc: 现在业内通用的是组合形式，具体细分有两种：1、生命周期形式，典型代表是Vue 2、暴力组合模式，Mixin
// */

// // 类的继承扩展
// class Component {
//     constructor() {
//         this.name = 'father'
//     }

//     doWork() {
//         console.log('father do work')
//     }
// }

// let log = (Target) => {
//     // 继承 Target
//     return class child extends Target {
//         // 重写 doWork
//         doWork() {
//             console.log('Start do work')
//             super.doWork();
//             console.log('Finish do work')
//         }
//     }
// } 

// let create = (Class, extensions) =>{
//     // 这个reduce简直太好用了
//     let TargetClass = extensions.reduce((Raw, extension) => extension(Raw), Class);
//     // 直接返回实例
//     return new TargetClass();
// }
// // 动态更改
// Component.prototype.doWork = ()=>{
//     console.log('被动态更改了')
// }

// let foo = create(Component, [log]);
// foo.doWork();
// console.log(foo)