package com.uwc_cam_champion.backend.repositories;

import com.uwc_cam_champion.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
