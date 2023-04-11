package com.example.tripPlanner.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.dto.GPTQuestionDto;
import com.example.tripPlanner.dto.GptResponse;
import com.example.tripPlanner.service.GPTApiServiceImp;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/gpt")
@RequiredArgsConstructor
public class GPTController {

    private final GPTApiServiceImp gptApiServiceImp;

    /*@PostMapping("/ask")
    public GPTResponseDto sendQuestion(GPTQuestionDto gptQuestionDto) {
        return gptApiServiceImp.askQuestion(gptQuestionDto);
    }*/
    @PostMapping("/ask")
    public GptResponse sendQuestion(@RequestBody GPTQuestionDto gptQuestionDto) {
        return gptApiServiceImp.askQuestion(gptQuestionDto);
    }
}
