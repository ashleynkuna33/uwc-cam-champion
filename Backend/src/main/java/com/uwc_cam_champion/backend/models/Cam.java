package com.uwc_cam_champion.backend.models;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "cam_summaries")
public class Cam {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "actual_cam", precision = 5, scale = 2)
    private BigDecimal actualCam = new BigDecimal("0.00");

    @Column(name = "target_cam", precision = 5, scale = 2)
    private BigDecimal targetCam = new BigDecimal("50.00");

    @Column(name = "projected_cam", precision = 5, scale = 2)
    private BigDecimal projectedCam = new BigDecimal("0.00");

    public Cam() {}

    public Cam(User user, BigDecimal actualCam, BigDecimal targetCam, BigDecimal projectedCam) {
        this.user = user;
        this.actualCam = actualCam != null ? actualCam : new BigDecimal("0.00");
        this.targetCam = targetCam != null ? targetCam : new BigDecimal("50.00");
        this.projectedCam = projectedCam != null ? projectedCam : new BigDecimal("0.00");
    }

    // Getters and Setters
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public BigDecimal getActualCam() { return actualCam; }
    public void setActualCam(BigDecimal actualCam) { this.actualCam = actualCam; }

    public BigDecimal getTargetCam() { return targetCam; }
    public void setTargetCam(BigDecimal targetCam) { this.targetCam = targetCam; }

    public BigDecimal getProjectedCam() { return projectedCam; }
    public void setProjectedCam(BigDecimal projectedCam) { this.projectedCam = projectedCam; }
}