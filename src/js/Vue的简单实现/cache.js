/**
 * LRU缓存系统，最新调用的对象会被提到队列的最前方，末尾的对象队列溢出时会被移除
 *
 *
 * @param {Number} limit
 * @constructor
 */

function Cache (limit) {
  // 标识当前缓存数组的大小
  this.size = 0
  // 标识缓存数组能达到的最大长度
  this.limit = limit
  // 初始化 tail、head
  this.tail = this.head = undefined
  // _keymap 保存所需要缓存的变量
  this._keymap = Object.create(null)
}

var p = Cache.prototype

/**
 * put：在缓存中加入一个key-value对象，如果缓存数组已经达到最大值，
 * 则返回被删除的entry，即tail,否则返回undefined
 *
 * @param {String} key
 * @param {*} value
 * @return {Entry|undefined}
 */

p.put = function (key, value) {
  // 被移除的对象
  var removed

  // 查询是否已有次entry
  var entry = this.get(key, true)

  // entry不存在
  if (!entry) {
    if (this.size === this.limit) {
      // 超出最大数量，移除tail
      removed = this.shift()
    }
    // 构造entry对象
    entry = {
      key: key
    }
    // 扔进map池
    this._keymap[key] = entry
    
    // 对Map重新排序
    if (this.head) {
      this.head.up = entry
      entry.down = this.head
    } else {
      this.tail = entry
    }

    this.head = entry
    this.size++
  }

  // 赋值 value
  entry.value = value

  return removed
}

/**
 * shift：在缓存数组中移除最少使用的entry，即tail，
 * 返回被删除的entry。如果缓存数组为空，则返回undefined
 */

p.shift = function () {

  // 操作对象是tail指针指向的entry
  var entry = this.tail
  
  if (entry) {
  	// 指向上一个对象
    this.tail = this.tail.up
    // down清空
    this.tail.down = undefined
    
    // 清空entry索引关系
    entry.up = entry.down = undefined
    
    // 从Map中移除entry
    this._keymap[entry.key] = undefined
    
    this.size--
  }
  return entry
}

/**
 * 将key为传入参数的缓存对象标识为最常使用的entry，即head，
 * 并调整双向链表，返回改变后的head。如果不存在key为传入参数的缓存对象，
 * 则返回undefined
 * 说这么麻烦，其实就是获取缓存的对象，并标记为head
 *
 * @param {String} key
 * @param {Boolean} returnEntry
 * @return {Entry|*}
 */

p.get = function (key, returnEntry) {
  // _keymap 存储所有entry 
  var entry = this._keymap[key]
  
  // entry不存在
  if (entry === undefined) return
  
  // entry === head；entry.up = undefined
  if (entry === this.head) {
  	
  	// true:返回整个入口对象；false:返回value
    return returnEntry
      ? entry
      : entry.value
  }

/*   head   ∧       A  
       |    up      B
       |            C
       |            
       |            ∧
       |            D
       |            ∨
       |   down       
     tail   v       E
*/
// key = D
// 当队列溢出时，底部的会被移除

  // entry 不在head
  if (entry.up) {
  	// 处理tail 其他情况tail不需要移动
    if (entry === this.tail) {
      // tail 指向up一位
      this.tail = entry.up
    }
    // 让E.down 指向 C
    entry.up.down = entry.down // C <-- E.
  }
  // entry 不在tail
  if (entry.down) {
  	// 让C.down 指向 E
    entry.down.up = entry.up // C. --> E
  }
  // D到head
  entry.up = undefined // D --x
  // D.down 指向 E
  entry.down = this.head // D. --> E
  
  // 数列可以只有一个对象
  if (this.head) {
  	// D.up 指向 Entry
    this.head.up = entry // E. <-- D
  }			
  this.head = entry
  return returnEntry
    ? entry
    : entry.value
}




var c = new Cache(3);
console.log(c)