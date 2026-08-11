package com.uwc_cam_champion.backend.repositories;

import com.uwc_cam_champion.backend.models.UserModule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserModuleRepository extends JpaRepository<UserModule, Long> {
}
