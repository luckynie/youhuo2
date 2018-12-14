$("#registerBtn").click(function(){
    var username=$("#username").val();
    var password=$("#password").val();
    $.ajax({
        async:true,
        type:"get",
        url:"http://127.0.0.1/day23/register.php?flag=register&uname="+username+"&upwd="+password
    }).then((res)=>{
        if(res==1){
            alert("注册成功")
            window.location.href="login.html";
        }
        if(res==0){
            alert("用户名已存在")
        }
        if(res==2){
            alert("注册失败")
        }
    })
})