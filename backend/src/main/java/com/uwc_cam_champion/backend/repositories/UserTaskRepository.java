package com.uwc_cam_champion.backend.repositories;

import com.uwc_cam_champion.backend.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTaskRepository extends JpaRepository<Task, Long> {
}
