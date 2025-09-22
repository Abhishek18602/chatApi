package com.spring.spring_boot_chatbot.controller;

import com.spring.spring_boot_chatbot.dto.PromptRequest;
import com.spring.spring_boot_chatbot.service.Apiservice;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ApiController {
    private  final Apiservice apiservice;

    public  ApiController(Apiservice theapiservice)
    {
        this.apiservice=theapiservice;
    }

    @PostMapping
    public  String chat(@RequestBody PromptRequest promptRequest)
    {
        return apiservice.getChatResponse(promptRequest);
    }
}
