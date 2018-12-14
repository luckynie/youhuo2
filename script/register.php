<?php
header("content-type:text/html;charset=utf-8");
header("Access-Control-Allow-Origin:*");
$uname = $_GET["uname"];
$upwd = $_GET["upwd"];
$flag = $_GET["flag"];

mysql_connect("127.0.0.1","root","root") or die("连接失败");
mysql_select_db("user");
mysql_query("set names utf8");
$sql = "select * from `user` where uname='$uname'";
$res = mysql_query($sql);
$arr = mysql_fetch_assoc($res);
if($flag == "register"){
    if($arr){
        echo 0; //用户名存在
    }
    else{
        $sql = "insert into `user` (uname,upwd) VALUES ('$uname','$upwd')";
        $res = mysql_query($sql);
        if($res){
            echo 1;//注册成功
        }
        else{
            echo 2;//注册失败
        }
    }
}else if($flag = "login"){
    if($arr){
        if($upwd == $arr["upwd"]){ //登录成功
            echo 1;
        }else{ //密码错误
            echo 2;
        }
    }else{ //用户名不存在
        echo 0;
    }
}

?>