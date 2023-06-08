package com.example.tripPlanner.configuration;

public class GPTConfig {
    public static final String AUTHORIZATION = "Authorization";
    public static final String BEARER = "Bearer ";
    public static final String MODEL = "gpt-3.5-turbo";
    public static final Integer MAX_TOKEN = 2000;
    public static final Double TEMPERATURE = 1.0;
    public static final Double TOP_P = 0.2;
    public static final String MEDIA_TYPE = "application/json; charset=UTF-8";
    public static final String URL = "https://api.openai.com/v1/chat/completions";
    public static final boolean ECHO= false;
}