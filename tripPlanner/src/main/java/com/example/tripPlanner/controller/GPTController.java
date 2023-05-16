package com.example.tripPlanner.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.service.GPTApiServiceImp;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/gpt")
@RequiredArgsConstructor
public class GPTController {

    private final GPTApiServiceImp gptApiServiceImp;
    
//    @PostMapping("/ask")
//    public List<List<String>> gptreq(){
//    	return gptApiServiceImp.sendQuestion();
//    }
    
}