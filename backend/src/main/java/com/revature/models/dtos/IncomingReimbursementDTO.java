package com.revature.models.dtos;

public class IncomingReimbursementDTO {
    private String status;
    private String description;
    private int amount;
    private int userId;

    public IncomingReimbursementDTO() {

    }

    public IncomingReimbursementDTO(String status, String description, int amount, int userId) {
        this.status = status;
        this.description = description;
        this.amount = amount;
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "IncomingReimbursementDTO{" +
                "status='" + status + '\'' +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", userId=" + userId +
                '}';
    }
}
