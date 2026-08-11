package com.uwc_cam_champion.backend.services.User;

import com.uwc_cam_champion.backend.models.User;

public interface IUserService {

    User createUser();
    User updateUser();
    void deleteUser();

}
