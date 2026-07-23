package com.uwc_cam_champion.uwc_cam_champion.camsummary;

import com.uwc_cam_champion.uwc_cam_champion.users.User;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "cam_summaries")
public class CamSummary {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "actual_cam")
    private BigDecimal actualCam = BigDecimal.ZERO;

    @Column(name = "target_cam")
    private BigDecimal targetCam = new BigDecimal("50.00");

    @Column(name = "projected_cam")
    private BigDecimal projectedCam = BigDecimal.ZERO;

    public CamSummary() {
    }

    public CamSummary(User user, BigDecimal actualCam, BigDecimal targetCam, BigDecimal projectedCam) {
        this.user = user;
        this.actualCam = actualCam;
        this.targetCam = targetCam;
        this.projectedCam = projectedCam;
    }

    // Getters and Setters

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BigDecimal getActualCam() {
        return actualCam;
    }

    public void setActualCam(BigDecimal actualCam) {
        this.actualCam = actualCam;
    }

    public BigDecimal getTargetCam() {
        return targetCam;
    }

    public void setTargetCam(BigDecimal targetCam) {
        this.targetCam = targetCam;
    }

    public BigDecimal getProjectedCam() {
        return projectedCam;
    }

    public void setProjectedCam(BigDecimal projectedCam) {
        this.projectedCam = projectedCam;
    }
}