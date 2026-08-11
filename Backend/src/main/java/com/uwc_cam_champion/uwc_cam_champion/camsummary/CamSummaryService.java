package com.uwc_cam_champion.uwc_cam_champion.camsummary;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CamSummaryService {

    private final CamSummaryRepository repository;

    public CamSummaryService(CamSummaryRepository repository) {
        this.repository = repository;
    }

    public List<Cam> getAllCamSummaries() {
        return repository.findAll();
    }

    public Optional<Cam> getCamSummaryById(Integer id) {
        return repository.findById(id);
    }

    public Cam saveCamSummary(Cam cam) {
        return repository.save(cam);
    }

    public Cam updateCamSummary(Integer id, Cam updatedCam) {

        return repository.findById(id)
                .map(cam -> {

                    cam.setActualCam(updatedCam.getActualCam());
                    cam.setTargetCam(updatedCam.getTargetCam());
                    cam.setProjectedCam(updatedCam.getProjectedCam());

                    return repository.save(cam);

                }).orElseThrow(() -> new RuntimeException("Cam Summary not found"));
    }

    public void deleteCamSummary(Integer id) {
        repository.deleteById(id);
    }

}
