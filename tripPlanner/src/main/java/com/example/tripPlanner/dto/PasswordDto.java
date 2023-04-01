package com.example.tripPlanner.dto;

import lombok.Data;

@Data
public class PasswordDto {
	private String username;
    private String oldPassword;
    private String newPassword;
    private String confirmNewPassword;

    // Getter, Setter, 생성자 등 생략
}