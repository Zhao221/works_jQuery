$(function() {
	load();
	//总关键：按下回车键 把数据完成 存储大本地储存里面
	$("#title").on("keydown", function(event) {
		if (event.keyCode === 13) {
			//读取本地存储原来的数据
			var local = getDate();
			//把local数组进行更新数据 把最新的数据追加给local数组
			local.push({
				title: $(this).val(),
				done: false
			});
			//把这个数组local存储到本地储存
			saveDate(local);
			//本地存储数据渲染加载到页面
			load();
			$(this).val();
		}
	})
	
	//第四步删除数据
	$("ol,ul").on("click", "a", function() {
		//先获取数据
		var data = getDate();
		//再修改数据
	var index=$(this).attr("id");
	data.splice(index,1);
		//保存到本地存储
		saveDate(data);
		//最后在渲染到页面
		load();
	})
	
	// 第五步ol和ul里面的数据互换
	$("ol,ul").on("click", "input", function() {
		//先获取本地存储的数据
		var data = getDate();
		//修改数据
		var index = $(this).siblings("a").attr("id");
		data[index].done = $(this).prop("checked");//prop获取固有属性
		//保存到本地存储
		saveDate(data);
		//重新渲染页面
		load();
	})

	
	//第一步读取输入到输入框的数据
	function getDate() {
		var data = localStorage.getItem("everyday-play");
		if (data !== null) {
			return JSON.parse(data);
		} else {
			return [];
		}
	}
	
	//第二步把数据保存本地存储
	function saveDate(data) {
		localStorage.setItem("everyday-play", JSON.stringify(data));
	}
	
	// //第三步把数据渲染到页面
	function load() {
		var data = getDate();
	// 	//遍历之前先要清空ol里面的元素内容
		$("ol,ul").empty();
		var todoCount=0;
		var doneCount=0;
	// 	//遍历这个数据
		$.each(data, function(i, n) {
			if (n.done) {
				$("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title +
					"</p><a href='javascript:;' id=" + i + ">删除</a></li>")
					doneCount++;
			} else {
				$("ol").prepend("<li><input type='checkbox'><p>" + n.title +
					"</p><a href='javascript:;' id=" + i + ">删除</a></li>")
					todoCount++;
			}

		})
		$("#todocount").text(todoCount++);
		$("#donecount").text(doneCount++);
	}
})
