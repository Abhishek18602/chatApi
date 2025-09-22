package com.spring.spring_boot_chatbot.dto;

import org.apache.logging.log4j.message.Message;

import java.util.List;

public record APIRequesting(String model, List<Message> messages) { //here messages should be plural we can not write message here..
    public  static record Message(String role, String content)
    {

    }


}
