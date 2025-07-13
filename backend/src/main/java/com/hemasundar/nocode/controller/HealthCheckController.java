package com.hemasundar.nocode.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
public class HealthCheckController {

    @GetMapping
    public Map<String, Object> getHealthStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");

        Map<String, String> services = new HashMap<>();
        services.put("database", "UP");
        // Add other internal services here

        response.put("services", services);
        return response;
    }
}
