function update(todos){
	//1.更新header
	updateHeader(todos);
	//2.更新list
	updateList(todos);
	//3.更新footer
	updateFooter(todos);
}

window.onload = function() {
	window.location.hash = '#/';
	
	var todos = getTodos();
	//更新视图
	//1.更新header
	//2.更新list
	updateList(todos);
	//3.更新footer
	updateFooter(todos);
}

/**
 * 保存todo 并且更新数据
 * @param {Object} event
 */
function saveTodo(event) {
	var content = document.getElementById('todoInput').value;
	if(event.keyCode == '13' && content != '') {
		const todos = getTodos();
		const todo = {
			'content': content,
			'complete': false
		}

		todos.unshift(todo);

		//清空输入
		document.getElementById('todoInput').value = ''
		//保存todos
		saveTodos(todos);
		//更新视图
		update(todos);
	}
}
/**
 * 更新头部
 */
function updateHeader(todos){
	var left = uncompletedSize(todos);
	if (left==0){
		document.getElementById("selectAll").style.color = '#000' ;
		document.getElementById("selectAll").setAttribute("checked",true);
	}else{
		document.getElementById("selectAll").style.color = '#e6e6e6' ;
		document.getElementById("selectAll").setAttribute("checked",false);
	}
}
/**
 * 全选或全不选
 */
function selectTodos(){
	var todos = getTodos();
	var checked = document.getElementById("selectAll").getAttribute("checked")=='true'?true:false;
		
	todos.forEach((todo) => todo.complete = !checked);
	if(!checked){
		document.getElementById("selectAll").style.color = '#000' ;
	}else{
		document.getElementById("selectAll").style.color = '#e6e6e6' ;
	}
	document.getElementById("selectAll").setAttribute("checked",!checked);
	
	saveTodos(todos)
	update(todos);
}
/**
 * 更新List数据
 * @param {Object} todos
 */
function updateList(todos) {
	
	var type = window.location.hash.substring(2);
	
	console.log(type);
	
	var html = ''
	for(var i = 0; i < todos.length; i++) {
		if(type=='Active' && todos[i].complete){
			continue;
		}
		if(type=='Completed' && !todos[i].complete){
			continue;
		}
		html += `<li key='${i}' id='li${i}' onmouseenter="handlerEnter(this,true)" onmouseleave="handlerEnter(this,false)" ">
						<div class="view ">
							<input onclick="checkTodo(this,'${i}')" type="checkbox" style="padding:0px 0px 10px 10px" ${todos[i].complete==true?'checked=checked':''}/>
							<label class="todo-content" ondblclick="toEdit(${i})">
								${todos[i].content}
							</label>
							<i class="layui-icon layui-icon-close delete" onclick="deleteTodo(${i})"></i>
						</div>
						<input type="text" style="display: none;" class='layui-input' id='todo${i}' onkeyup='keyupHandler(event,${i})' onblur='save(${i})' value='${todos[i].content}'/>
				</li>`;
	}
	document.getElementById('todoList').innerHTML = html;

}

/**
 * 编辑todo
 */
function toEdit(index,content){
	document.getElementById('li'+index).children[0].style.display = "none";
	document.getElementById('li'+index).children[1].style.display = "block";
	document.getElementById('li'+index).children[1].focus();
}

/**
 * ESC 退出编辑状态，enter 保存
 * @param {Object} event
 * @param {Object} index
 */
function keyupHandler(event,index){
	if(event.keyCode == '13'){
		save(index);
	}else if(event.keyCode == '27'){
		document.getElementById('li'+index).children[0].style.display = "block";
		document.getElementById('li'+index).children[1].style.display = "none";
	}
}
/**
 * 保存编辑后的数据
 * @param {Object} index
 */
function save(index){
	var todos = getTodos();
	todos[index].content = document.getElementById('todo'+index).value;
	
	saveTodos(todos);
	update(todos);
	
	
}

/**
 * 隐藏或显示Item的x
 */
function handlerEnter(obj,isShow) {
	if(isShow){
		obj.children[0].children[2].style.display = 'block'		
	}else{
		obj.children[0].children[2].style.display = 'none'
	}
}
/**
 * 完成或取消完成todo
 */
function checkTodo(obj,index){
	var todos = getTodos();
	todos[index].complete = obj.checked;
	saveTodos(todos);
	
	//更新视图
	update(todos);
}
/**
 * 删除指定下标的todo
 */
function deleteTodo(index){
	var todos = getTodos();
	todos.splice(index,1);
	saveTodos(todos);
	//更新视图
	update(todos);
}

/**
 * 更新footer
 * @param {Object} todos
 */
function updateFooter(todos){
	document.getElementById("itemsLeft").innerHTML = uncompletedSize(todos);
	
	if (todos.length == 0){
		document.getElementsByClassName('todo-footer')[0].style.display = 'none';
	}else{
		document.getElementsByClassName('todo-footer')[0].style.display = 'block';
	}
	
	
}
/**
 * 获取未完成数量
 */
function uncompletedSize(todos){
	return todos.reduce((preTotal,todo) => preTotal + (todo.complete?0:1), 0);
}

/**
 * 删除完成的todo
 */
function clearCompletedTodo(){
	var todos = getTodos();
	var newTodos = todos.filter((todo) => !todo.complete);
	
	saveTodos(newTodos);
	//更新视图
	update(todos);
}
/**
 * 过滤显示
 * @param type All Active Completed
 */
function filterTodo(obj,type){
	
	window.location.hash = '#/'+type;
	
	document.getElementsByClassName('selected')[0].className = '';
	obj.className = 'selected';
	var todos = getTodos();
	updateList(todos);
}
