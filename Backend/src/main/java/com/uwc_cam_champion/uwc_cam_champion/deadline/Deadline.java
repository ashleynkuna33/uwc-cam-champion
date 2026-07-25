package com.uwc_cam_champion.uwc_cam_champion.deadline;

import com.uwc_cam_champion.uwc_cam_champion.user.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "deadlines")
public class Deadline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @Column(name = "due_info", length = 50)
    private String dueInfo;

    @Column(name = "priority", length = 20)
    private String priority = "Medium";

    public Deadline() {}

    public Deadline(Integer userId, LocalDate date, String title, String dueInfo, String priority) {
        this.userId = userId;
        this.date = date;
        this.title = title;
        this.dueInfo = dueInfo;
        this.priority = priority;
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDueInfo() { return dueInfo; }
    public void setDueInfo(String dueInfo) { this.dueInfo = dueInfo; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}