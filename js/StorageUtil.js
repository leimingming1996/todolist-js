/**
 * 保存todos到本地
 * @param {Object} todos
 */
function saveTodos(todos){
	window.localStorage.setItem('todos',JSON.stringify(todos));
}
/**
 * 从本地获取todos
 */
function getTodos(){
	return JSON.parse(window.localStorage.getItem("todos") || "[]")
}
