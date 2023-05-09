$(function() {
	//点击增加按钮和close按钮盒子1实现出现和隐藏的效果
	$("#button1,#button5").click(function() {
		$("#box1").fadeToggle();
	})
	//点击增加close按钮盒子2实现隐藏的效果
	$("#button7").click(function() {
		$("#box2").fadeOut();
	})
	$("#button9").click(function() {
		$("#box3").fadeOut();
	})
	//点击重置按钮重新渲染页面
	$("#button4").click(function() {
		load();
	})

	load();
	//1.读取本地存储数据
	function getDate() {
		var data = localStorage.getItem("lol");
		if (data !== null) {
			return JSON.parse(data);
		} else {
			return [];
		}
	}
	//2.保存本地存储数据
	function saveDate(data) {

		localStorage.setItem("lol", JSON.stringify(data))
	}
	//3.渲染本地存储数据到页面
	function load() {
		var data = getDate();
		//遍历之前清空ul里面的元素内容
		$("ul").empty();
		//遍历存储的数据
		$.each(data, function(i, n) {
			$("#hero1").append("<li> <a href='javascript:;'> <img src=" + n.src + " id=" + i +
				"> <span>" + n.role +
				"</span><p>" + n.name +
				"</p></a></li>")
		})
	}
	//4.增加图片和数据
	//加入图片
	$("#file").on("change", function() {
		myFile = document.querySelector("#file").files[0];
		img = new Image();
		reader = new FileReader(); // 读取文件资源
		if (myFile) {
			reader.readAsDataURL(myFile); //将上传图片转成base64地址
		} else {
			img.src = " ";
		}
		reader.onload = function() {
			img.src = reader.result;
			$("#lookimg").attr("src", img.src);
		};
	})
	//加入数据
	$("#button6").on("click", function() {
		//获得数据
		var local = getDate();
		//把数据存到数组中
		local.push({
			"src": img.src,
			role: $(".role").val(),
			name: $(".name").val()
		})
		//保存数据
		saveDate(local);
		load();
		$(".role").val("");
		$(".name").val("");
	})
	//5.删除图片和数据
	$("#hero1").on("click", "img", function() {
		var data = getDate();
		var index = $(this).attr("id");
		$("#button2").on("click", function() {
			data.splice(index, 1);
			saveDate(data);
			load();
		})
	})
	//6.更改图片和数据
	$("#hero1").on("click", "img", function() {
		var data = getDate();
		var thisrole = $(this).siblings("span").text();
		var thisname = $(this).siblings("p").text();
		let clickImg = $(this).attr("src");
		$("#button3").click(function() {
			$("#box2").fadeIn("slow");
			// 更改头像框
			$("#changefile").on("change", function() {
				changeFile = document.querySelector("#changefile").files[0];
				changeimg = new Image();
				changereader = new FileReader(); // 读取文件资源
				if (changeFile) {
					changereader.readAsDataURL(changeFile); //将上传图片转成base64地址
				} else {
					changeimg.src = " ";
				}
				changereader.onload = function() {
					changeimg.src = changereader.result;
					$("#changeimg").attr("src", changeimg.src);
				}
				saveDate(data);
				load();
			})
			$.each(data, function(i, n) {
				if (n.name == thisname) {
					$("#changename").val(n.name);
					$("#changerole").val(n.role);
					const that = this;
					$("#button8").click(function() {
						newname = $("#changename").val();
						newrole = $("#changerole").val();
						that.name = newname;
						that.role = newrole;
						if (that.src) {
							var thatimg = $("#changeimg").attr("src");
							$(that).attr("src", thatimg);
						}
						saveDate(data);
						$("#box2").fadeOut();
						load();
					})
					saveDate(data);
					load();
				}
				saveDate(data);
				load();
			})
		})
	})
	//7.查找图片和数据
	$("#search").on("keydown", function(event) {
		var date = getDate();
		if (event.keyCode === 13) {
			if ($("#search").val() === "") {
				load();
			} else {
				$.each(date, function(i, n) {
					if ($("#search").val() === n.name) {
						$("#hero1").empty();
						$("#hero1").prepend("<li> <img src=" + n.src + "><span>" + n.role +
							"</span><p>" + n.name + "</p></li>");
					}
					// if ($("#search").val() !== n.name) {
					// 	$("#box3").fadeIn();
					// } else {
					// 	return false;
					// }
				})
				$("#search").val("");
			}
		}
	})
})
