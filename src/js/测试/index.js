/**
 * @ name: 测试
 * @ desc: 测试
 */

/**
 * A doubly linked list-based Least Recently Used (LRU)
 * cache. Will keep most recently used items while
 * discarding least recently used items when its limit is
 * reached. This is a bare-bone version of
 * Rasmus Andersson's js-lru:
 *
 *   https://github.com/rsms/js-lru
 *
 * @param {Number} limit
 * @constructor
 */

function Cache (limit) {
  // 标识当前缓存数组的大小
  this.size = 0
  // 标识缓存数组能达到的最大长度
  this.limit = limit
  // 初始化 head、tail
  this.head = this.tail = undefined
  // _keymap 保存所需要缓存的变量
  this._keymap = Object.create(null)
}

var p = Cache.prototype

/**
 * put：在缓存中加入一个key-value对象，如果缓存数组已经达到最大值，
 * 则返回被删除的entry，即head,否则返回undefined
 *
 * @param {String} key
 * @param {*} value
 * @return {Entry|undefined}
 */

p.put = function (key, value) {
  var removed

  var entry = this.get(key, true)
  if (!entry) {
    if (this.size === this.limit) {
      removed = this.shift()
    }
    entry = {
      key: key
    }
    this._keymap[key] = entry
    if (this.tail) {
      this.tail.newer = entry
      entry.older = this.tail
    } else {
      this.head = entry
    }
    this.tail = entry
    this.size++
  }
  entry.value = value

  return removed
}

/**
 * shift：在缓存数组中移除最少使用的entry，即head，
 * 返回被删除的entry。如果缓存数组为空，则返回undefined
 */

p.shift = function () {
  var entry = this.head
  if (entry) {
    this.head = this.head.newer
    this.head.older = undefined
    entry.newer = entry.older = undefined
    this._keymap[entry.key] = undefined
    this.size--
  }
  return entry
}

/**
 * 将key为传入参数的缓存对象标识为最常使用的entry，即tail，
 * 并调整双向链表，返回改变后的tail。如果不存在key为传入参数的缓存对象，
 * 则返回undefined
 * 说这么麻烦，其实就是获取缓存的对象，并标记为tail
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
  
  // entry === tail；entry.newer = undefined
  if (entry === this.tail) {
  	
  	// true:返回整个入口对象；false:返回value
    return returnEntry
      ? entry
      : entry.value
  }
  
  // HEAD--------------TAIL
  //   <.older   .newer>
  //  <--- add direction --
  //   A  B  C  <D>  E
  // 链表查询

  // entry 不在末尾
  if (entry.newer) {
  	// entry 在头
    if (entry === this.head) {
      // head 指向newer一位
      this.head = entry.newer
    }
    // 
    entry.newer.older = entry.older // C <-- E.
  }
  if (entry.older) {
    entry.older.newer = entry.newer // C. --> E
  }
  entry.newer = undefined // D --x
  entry.older = this.tail // D. --> E
  if (this.tail) {
    this.tail.newer = entry // E. <-- D
  }
  this.tail = entry
  return returnEntry
    ? entry
    : entry.value
}


let cache = new Cache(10);
let a = {name: 'a'}
cache.put('a',a)



