package com.spring.spring_boot_chatbot.dto;

import java.awt.*;
import java.util.List;

public record APIResponse(List<Choice> choices) {
    public  static  record  Choice(Message message)
    {
        public static  record  Message(String role,String content){

        }
    }
}
