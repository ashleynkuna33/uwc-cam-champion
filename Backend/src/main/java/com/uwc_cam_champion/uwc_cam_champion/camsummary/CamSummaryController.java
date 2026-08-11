package com.uwc_cam_champion.uwc_cam_champion.camsummary;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cam")
public class CamSummaryController {

    private final CamSummaryService service;

    public CamSummaryController(CamSummaryService service) {
        this.service = service;
    }

    @GetMapping
    public List<Cam> getAllCamSummaries() {
        return service.getAllCamSummaries();
    }

    @GetMapping("/{id}")
    public Cam getCamSummary(@PathVariable Integer id) {

        return service.getCamSummaryById(id)
                .orElseThrow(() -> new RuntimeException("Cam Summary not found"));
    }

    @PostMapping
    public Cam createCamSummary(@RequestBody Cam cam) {
        return service.saveCamSummary(cam);
    }

    @PutMapping("/{id}")
    public Cam updateCamSummary(@PathVariable Integer id,
                                @RequestBody Cam cam) {

        return service.updateCamSummary(id, cam);
    }

    @DeleteMapping("/{id}")
    public void deleteCamSummary(@PathVariable Integer id) {
        service.deleteCamSummary(id);
    }

}