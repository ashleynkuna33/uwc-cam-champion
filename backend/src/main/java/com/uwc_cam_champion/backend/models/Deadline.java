package com.uwc_cam_champion.backend.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "deadlines")
public class Deadline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @Column(name = "due_date", nullable = false)
    private LocalDateTime dueDate;

    @Column(name = "additional_info", length = 500)
    private String info;

    @Column(name = "priority", length = 20, nullable = false)
    private String priority = "Medium";

    @Column(name = "is_completed", nullable = false)
    private boolean isCompleted = false;

    public Deadline() {}

    public Deadline(User user, String title, LocalDateTime dueDate, String info, String priority) {
        this.user = user;
        this.title = title;
        this.dueDate = dueDate;
        this.info = info;
        this.priority = priority != null ? priority : "Medium";
        this.isCompleted = false;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }
}