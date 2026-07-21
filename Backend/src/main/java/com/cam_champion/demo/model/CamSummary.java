package com.cam_champion.demo.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Entity
@Table(name = "cam_summaries")
public class CamSummary {
    @Id
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User users;

    @ColumnDefault("0.00")
    @Column(name = "actual_cam", precision = 5, scale = 2)
    private BigDecimal actualCam;

    @ColumnDefault("50.00")
    @Column(name = "target_cam", precision = 5, scale = 2)
    private BigDecimal targetCam;

    @ColumnDefault("0.00")
    @Column(name = "projected_cam", precision = 5, scale = 2)
    private BigDecimal projectedCam;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
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