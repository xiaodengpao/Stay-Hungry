/**
* @ name: 八大排序算法
* @ desc: 八大排序算法的实现
*/

/*
* @ name: 插入排序（原地插入）
*/
const insertSort = array => {
	if ( array.length === 1 ){
		return array
	}else {
		for ( let i=1; i<array.length; i++ ){
			for ( let j=0; j<=i-1; j++ ){
				// 保持稳定性，要加上相等的情况。 从左到右遍历，右边的在后面
				if ( array[i] <= array[j]) {
					let item = array[j];
					array[j] = array[i];
					array[i] = item;
				}
			}
		}
	}
}

/* 
	稳定性：数据相等，则不进行位置的交换。 -->稳定
	时间复杂度：两次for循环，肯定都会循环到最终，而且每一次都会比较相邻的两个数，所以时间复杂度很确定，O（n^2） 复杂度的大小比较的是计算次数（两个数值的比较）
*/


/*
* @ name: 选择排序（从左到右）
*/
const selectSort = array => {
	if ( array.length === 1 ){
		return array
	}else {
		// i 是index
		for ( let i=1; i<array.length; i++ ){
			// j 是次数
			for ( let j=1; j<array.length-i; j++ ){
				let min = array[i-1];
				if ( min >array[i+j-1] ){
					let temp = array[i+j];
					array[i+j] = min;
					// 这里如果写 min = temp 就出错了， min不是指向 array[i-1] 的指针
					array[i-1] = temp;
				}
			}
		}
	}
}
/*
	I、J两个变量，如果作次数就都做次数，如果做INDEX就都做index，要不然晕晕的
*/


/*
* @ name: 冒泡排序
*/

const bubbleSort = array => {
	// 开始比较位
	for( let inx=1; inx<array.length; inx++ ){
		for ( let j=0; j<=array.length-inx; j++ ){
			if ( array[inx-2+j]>array[inx+j-1] ){
				let temp = array[inx-2+j]
				array[inx-2+j] = array[inx+j-1];
				array[inx+j-1] = temp
			}
		}
	}
}

const BubbleSort = array => {
	// 比较次数，n-1
	for( let i = 0; i < array.length-1; i++ ){
		// 比较位 j
		for( let j = 0; j <array.length-i-1; j++) {
			if( array[j]>array[j+1] ){
				let temp = array[j];
				array[j] = array[j+1];
				array[j+1] = temp;
			}
		};
	};
}

let array = [1,2,1,12,45,5,1]

let k =0
while( k<10 ){
	console.log(k)
	k++
}