package com.uwc_cam_champion.backend.services.Module;

import com.uwc_cam_champion.backend.models.ModuleInfo;
import com.uwc_cam_champion.backend.models.Task;

public interface IModuleInfoService {

    ModuleInfo addModule(Long creatorId);
    ModuleInfo updateModule(Long creatorId);
    void deleteModule(Long moduleId, Long creatorId);
    

    Task addTask(Long moduleId);
    Task updateTask(Long taskId);
    void deleteTask(Long moduleId, Long taskId);

}
