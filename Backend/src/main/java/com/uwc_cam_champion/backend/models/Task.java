package com.uwc_cam_champion.backend.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private ModuleInfo moduleInfo;

    @Column(name = "type", nullable = false, length = 50)
    private String type; // e.g., "Assignment", "Test", "Exam"

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "sub_name", length = 100)
    private String subName;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "task_weight", precision = 5, scale = 2)
    private BigDecimal taskWeight;

    @Column(name = "category_weight", precision = 5, scale = 2)
    private BigDecimal categoryWeight;

    // Constructors
    public Task() {}

    public Task(ModuleInfo moduleInfo, String type, String name, String subName, LocalDate dueDate, BigDecimal taskWeight, BigDecimal categoryWeight) {
        this.moduleInfo = moduleInfo;
        this.type = type;
        this.name = name;
        this.subName = subName;
        this.dueDate = dueDate;
        this.taskWeight = taskWeight;
        this.categoryWeight = categoryWeight;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ModuleInfo getModuleInfo() {
        return moduleInfo;
    }

    public void setModuleInfo(ModuleInfo moduleInfo) {
        this.moduleInfo = moduleInfo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubName() {
        return subName;
    }

    public void setSubName(String subName) {
        this.subName = subName;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public BigDecimal getTaskWeight() {
        return taskWeight;
    }

    public void setTaskWeight(BigDecimal taskWeight) {
        this.taskWeight = taskWeight;
    }

    public BigDecimal getCategoryWeight() {
        return categoryWeight;
    }

    public void setCategoryWeight(BigDecimal categoryWeight) {
        this.categoryWeight = categoryWeight;
    }
}