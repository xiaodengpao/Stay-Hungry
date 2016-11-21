/**
* @ name: 常用算法
* @ desc: 常用算法的实现
*/

// 1、如何判断一个单词是回文
const isPlalindrome = (str) => {
	return str === str.split('').reverse().join('');
}
// let arr = [1, 2, 3];
// let temp = [3,3,3,3]
// arr.splice(1,1,...temp);
// console.log(arr)

//2、去掉一组整型数组重复的值
const unique_0 = array =>{
	let obj = {};
	let tempArray = [];
	array.forEach( ( item, index, array ) => {
		if ( !obj.hasOwnProperty(item)){
			obj[item] = true;
			tempArray.push(item)
		}
	});
	return tempArray
}
// console.log( unique_0( [1, 3, 1, 1, 1, 4] ) )
const unique_1 = array => {
	let inx = 1;
	array.forEach( (item, index, array) => {
		if(index) {
			for ( let i=0; i<inx; i++ ){
				if ( array[i] === item ){
					return 
				}
				if(i === inx-1) {
					array[inx] = item;
					inx ++;
					return;
				}
			}
		}
	})
	return array.slice(0,inx);
}
// console.log( unique_1( [1, 1, 1, 1, 4, 4] ) )

// 3、快速排序
const DownQuickSort = (a, left, right) => {
	if(left>=right){
     	return;
   	} 

   	let i=left;
   	let j=right;
   	// 基准取序列开头的元素！
   	let jizhun=a[left]; 

   	// 该while的功能为每一趟进行的多次比较和交换最终找到位置k。当i=j时意味着找到k位置了
   	while ( i < j ){
   		// J先移动，因为我们要寻找一个比基准小的元素，最终进行交换
      	while( a[j] >= jizhun && i < j ){
      		j--;
      	}
      	while( a[i] <= jizhun && i < j ){
      		i++;
      	}

      	if ( i < j ){  // 如果i==j跳出外层while
        	let t = a[i];
        	a[i] = a[j];
        	a[j] = t;
      	}
   	}
	a[left]=a[i]; // 交换基准数和k位置上的数
	a[i]=jizhun;

	DownQuickSort(a,left,i-1);
	DownQuickSort(a,i+1,right);
}

const UpQuickSort = (array, left, right) => {
	if (left >= right){
		return
	}
	let pivot = array[right];
	let i = left;
	let j = right;
	// 从左侧开始循环，找一个比pivot大的元素
	while ( i < j ){
		while ( i < j && pivot >= array[i] ){
			i++;
		}
		while ( i < j && pivot <= array[j] ){
			j--;
		}
		if ( i < j ){
			
    		let t = array[i];
    		array[i] = array[j];
    		array[j] = t;
    	}
    		
	}
	array[right]=array[i]; //交换基准数和k位置上的数
	array[i]=pivot;
	
	UpQuickSort(array, left, i-1);
	
	UpQuickSort(array, i+1, right);
}

// var array=[4,7,2,8,3,9,0,1,2,2];
// UpQuickSort(array, 0, array.length-1);
// console.log(array)