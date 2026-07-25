package com.uwc_cam_champion.uwc_cam_champion.module;

import com.uwc_cam_champion.uwc_cam_champion.usermodules.UserModule;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "modules_info")
public class ModuleInfo {

    @Id
    @Column(length = 12)
    private String code;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false)
    private Integer credits = 20;

    private String description;

    @Column(name = "exam_date")
    private LocalDate examDate;


    public ModuleInfo() {
    }

    public ModuleInfo(String code, String name, String title, Integer credits, String description, LocalDate examDate) {
        this.code = code;
        this.name = name;
        this.title = title;
        this.credits = credits;
        this.description = description;
        this.examDate = examDate;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

}