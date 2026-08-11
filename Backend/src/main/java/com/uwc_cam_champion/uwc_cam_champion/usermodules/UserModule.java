package com.uwc_cam_champion.uwc_cam_champion.usermodules;

import jakarta.persistence.*;

@Entity
@Table(name = "user_modules")
public class UserModule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "module_code", length = 12, nullable = false)
    private String moduleCode;

    private Double score = 0.00;
    private Double progress = 0.00;

    @Column(name = "status", length = 30)
    private String status = "In Progress";

    public UserModule() {}

    public UserModule(Integer userId, String moduleCode, Double score, Double progress, String status) {
        this.userId = userId;
        this.moduleCode = moduleCode;
        this.score = score;
        this.progress = progress;
        this.status = status;
    }

//    getters and setters
    public Integer getId() { return Id; }
    public void setId( Integer Id ) { this.Id = Id; }
    public Integer getUserId() { return userId; }
    public void setUserId( Integer Id ) { this.Id = Id; }
    public String getModuleCode() { return moduleCode; }
    public void setModuleCode( String moduleCode) { this.moduleCode = moduleCode; }
    public Double getScore() { return score; }
    public void setScore( Double newScore ) { this.score = newScore; }
    public Double getProgress() { return progress; }
    public void setProgress( Double progress ) { this.progress = progress; }
    public String getStatus() { return status; }
    public void setStatus( String newStatus ) { this.status = newStatus; }

}
