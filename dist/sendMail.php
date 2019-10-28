<?php
if (isset($_POST['email'])){
    $to      = 'kreuzfeur@gmail.com';
    $subject = 'Письмо с сайта ruteplovoz.ru';
    $message = 'Сообщение от пользователя: '.$_POST['email'].' - '.$_POST['message'];
    $headers = 'From: ruteplovoz.ru' . "\r\n";
    if(mail($to, $subject, $message, $headers)){
        echo 'alertSuccess';
    }else{
        echo 'alertError';
    };
}
?>