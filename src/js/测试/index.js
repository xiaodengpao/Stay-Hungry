/**
* @ name: 算法导论
* @ desc: 学习算法导论一书所做的笔记
*/
let pro = new Promise(function(resolve){
	console.log(1)
	resolve();
});
pro.then(function(resolve){
	console.log(2)
})