/*
	只要是数据发生改变，那么页面中的所有指令和表达式都会被重新计算一次（事件除外，事件只会在触发的时候才会执行）
*/
const vm = new Vue({
	el: '#app',
	data: {
		todoName: '',
		editId: -1,
		todos: [
			{id: 1, name: '抽烟', completed: false},
			{id: 2, name: '喝酒', completed: true},
			{id: 3, name: '烫头发', completed: true}
		]
	},
	methods: {
		//添加任务
		add() {
			/*
			  1.1 添加完成后，清空文本框
			  1.2 id 要计算出来，而不是写死
			  1.3 非空值判断
            */
			if (this.todoName.trim() === '') {
				return
			}
			let id = this.todos.length === 0 ? 1 : this.todos[this.todos.length - 1].id + 1

			// if (this.todos.length === 0) {
			//   id = 1
			// } else {
			//   id = this.todos[this.todos.length - 1].id + 1
			// }

			this.todos.push({
				id: id,
				name: this.todoName,
				completed: false
			});
			this.todoName = ''
		},
		delTodo(index) {
			this.todos.splice(index, 1)
		},
		showEditStatus(id) {
			this.editId = id
		},
		updateTodo() {
			this.editId = -1
		},
		// 清除所有已完成任务
		delAllCompleted(){
			// 思路转换一下：要删除已完成的任务，就是保留未完成的任务
			// 所以，只需要 过滤 出未完成的任务即可
			this.todos = this.todos.filter(item => !item.completed)
		}
	},
	computed: {
		showFooter() {
			return this.todos.length > 0
		},
		//未完成任务数
		unCompletedCount(){
			return this.todos.filter(item => !item.completed).length

			// return this.todos.filter(function(item) {
			//   return !item.completed
			// }).length

			/* let count = 0
            for (var i = 0; i < this.todos.length; i++) {
              if (!this.todos[i].completed) {
                count++
              }
            }
            return count */
		},

		// 是否展示清除所有已完成任务按钮
		showClearCompleted() {
			// 什么展示: 只要有一个任务是已完成就应该展示,也就是返回true

			// some 方法也会遍历数组,分别为数组中的每一项来调用
			// 回调函数
			// 如果回调函数的返回值为false， 那么， 就会继续下一次循环
			// 如果回调函数的返回值为true， 那么，就会停止循环，并且将 some 方法的返回值设置为 true
			// 但是，如果所有项中没有一项返回true，最终，some方法的返回值为 false
			return this.todos.some(item => item.completed)
			// return this.todos.some(function(item) {
			//   console.log('some')
			//   return item.completed
			// })
		}
	}
})

