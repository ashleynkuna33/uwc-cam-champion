package com.uwc_cam_champion.backend.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "modules_info")
public class ModuleInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User creator;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @Column(name = "credits", nullable = false)
    private Integer credits = 20;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "exam_date")
    private LocalDate examDate;

    // ADDED: Relationship to template tasks in this module
    @OneToMany(mappedBy = "moduleInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks = new ArrayList<>();

    public ModuleInfo() {}
    public ModuleInfo(User creator, String name, String title, Integer credits, String description, LocalDate examDate) {
        this.creator = creator;
        this.name = name;
        this.title = title;
        this.credits = credits;
        this.description = description;
        this.examDate = examDate;
    }

    public void addTask(Task task) {
        tasks.add(task);
        task.setModuleInfo(this);
    }

    public void removeTask(Task task) {
        tasks.remove(task);
        task.setModuleInfo(null);
    }

    // --- Getters & Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getExamDate() {
        return examDate;
    }

    public void setExamDate(LocalDate examDate) {
        this.examDate = examDate;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}