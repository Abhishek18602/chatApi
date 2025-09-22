package com.spring.spring_boot_chatbot.service;

import com.spring.spring_boot_chatbot.dto.APIRequesting;
import com.spring.spring_boot_chatbot.dto.APIResponse;
import com.spring.spring_boot_chatbot.dto.PromptRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class Apiservice {
    private  final RestClient restClient;

    @Autowired
    public  Apiservice(RestClient restClient)
    {
        this.restClient=restClient;
    }

    @Value("${deepseek.api.key}")
    private  String apiKey;
    @Value("${deepseek.api.model}")
    private  String model;

    public  String getChatResponse(PromptRequest promptRequest){
        APIRequesting apiRequesting=new APIRequesting(
                    model, List.of(new APIRequesting.Message("user",promptRequest.prompt()))
        );
         APIResponse response= restClient.post().
                 header("Authorization","Bearer "+apiKey)//must be space between Bearer and apikey
                .header("Content-Type", "application/json")
                .body(apiRequesting).retrieve()
                .body(APIResponse.class);
         return  response.choices().get(0).message().content();
    }

}
