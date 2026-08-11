package com.uwc_cam_champion.backend.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user_modules")
public class UserModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private ModuleInfo moduleInfo;

    @Column(name = "current_cam", precision = 5, scale = 2)
    private BigDecimal currentCam;

    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted = false;

    @OneToMany(mappedBy = "userModule", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserTask> userTasks = new ArrayList<>();

    public UserModule() {}
    public UserModule(User user, ModuleInfo moduleInfo) {
        this.user = user;
        this.moduleInfo = moduleInfo;
        this.currentCam = BigDecimal.ZERO;
        this.isCompleted = false;
    }
    public UserModule(User user, ModuleInfo moduleInfo, BigDecimal currentCam, Boolean isCompleted) {
        this.user = user;
        this.moduleInfo = moduleInfo;
        this.currentCam = currentCam != null ? currentCam : BigDecimal.ZERO;
        this.isCompleted = isCompleted != null ? isCompleted : false;
    }

    public void addUserTask(UserTask userTask) {
        userTasks.add(userTask);
        userTask.setUserModule(this);
    }

    public void removeUserTask(UserTask userTask) {
        userTasks.remove(userTask);
        userTask.setUserModule(null);
    }

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

    public ModuleInfo getModuleInfo() {
        return moduleInfo;
    }

    public void setModuleInfo(ModuleInfo moduleInfo) {
        this.moduleInfo = moduleInfo;
    }

    public BigDecimal getCurrentCam() {
        return currentCam;
    }

    public void setCurrentCam(BigDecimal currentCam) {
        this.currentCam = currentCam;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public List<UserTask> getUserTasks() {
        return userTasks;
    }

    public void setUserTasks(List<UserTask> userTasks) {
        this.userTasks = userTasks;
    }
}