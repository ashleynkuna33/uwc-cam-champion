package com.uwc_cam_champion.backend.services.Cam;

import com.uwc_cam_champion.backend.models.Cam;

public interface ICamService {

    Cam addCam(Long userId);
    Cam recalculateCam(Long userId);
    Cam updateCam(Long userId);
    void deleteCam(Long userId);

}
