
    // if(username == "" && password == ""){
    //     $(".err-tip").eq(0).find("em").html("请输入用户名");
    //     $(".err-tip").eq(1).find("em").html("请输入密码");
    //     $(".err-tip").show()
    //     return
    // }else{
    $(".err-tip").eq(1).keyup(function(){
        if($("#username").val()===""){
            $(".err-tip").eq(0).show();
            $(".err-tip").eq(0).find("em").html("请输入用户名");
        }
    })



$("#login-btn").click(function(){
        var username=$("#username").val();
        var password=$("#password").val();
        $.ajax({
            async:true,
            type:"get",
            url:"http://127.0.0.1/day23/register.php?flag=login&uname="+username+"&upwd="+password
        }).then((res)=>{
            if(res==1){
                alert("登陆成功")
                window.location.href="index.html";
            }else if(res==2){
                alert("密码错误")
            }else if(res==0){
                alert("用户名不存在")
            }
        })
})
