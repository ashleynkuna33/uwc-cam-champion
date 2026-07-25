package com.uwc_cam_champion.uwc_cam_champion.task;

import com.uwc_cam_champion.uwc_cam_champion.module.ModuleInfo;
import com.uwc_cam_champion.uwc_cam_champion.user.User;
import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_code", nullable = false)
    private ModuleInfo moduleInfo;

    @Column(name = "user_id", insertable = false, updatable = false)
    private Integer userId;

    @Column(name = "module_code", insertable = false, updatable = false, length = 12)
    private String moduleCode;

    @Column(name = "type", nullable = false, length = 50)
    private String type;

    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "status", length = 30)
    private String status;

    @Column(name = "description")
    private String description;

    @Column(name = "weight", nullable = false)
    private Double weight;

    @Column(name = "category_weight", nullable = false)
    private Double categoryWeight;

    public Task() {}

    public Task(Integer userId, String moduleCode, String type, String title, LocalDate dueDate, String status, String description, Double weight, Double categoryWeight) {
        this.userId = userId;
        this.moduleCode = moduleCode;
        this.type = type;
        this.title = title;
        this.dueDate = dueDate;
        this.status = status;
        this.description = description;
        this.weight = weight;
        this.categoryWeight = categoryWeight;
    }

    // --- Getters & Setters ---
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public ModuleInfo getModuleInfo() { return moduleInfo; }
    public void setModuleInfo(ModuleInfo moduleInfo) { this.moduleInfo = moduleInfo; }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public Double getCategoryWeight() { return categoryWeight; }
    public void setCategoryWeight(Double categoryWeight) {
        this.categoryWeight = categoryWeight;
    }
}