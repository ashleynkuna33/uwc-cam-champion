package com.uwc_cam_champion.backend.repositories;

import com.uwc_cam_champion.backend.models.Deadline;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeadlineRepository extends JpaRepository<Deadline, Long> {
}
