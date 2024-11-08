package com.revature.models.dtos;

public class LoginDTO {
    private String username;
    private String password;

    public LoginDTO(String password, String username) {
        this.password = password;
        this.username = username;
    }

    public LoginDTO() {
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "LoginDTO{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
