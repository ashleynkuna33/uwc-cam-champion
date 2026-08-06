package com.uwc_cam_champion.backend.services.Deadline;

import com.uwc_cam_champion.backend.models.Deadline;

public interface IDeadlineService {

    Deadline addDeadline(Long userId);
    Deadline updateDeadline(Long userId);
    void deleteDeadline(Long userId);

}
