package org.zalando.zmon.api;

import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.zalando.zmon.security.permission.DefaultZMonPermissionService;
import org.zalando.zmon.service.VisualizationService;

import java.util.Map;

@Controller
@RequestMapping(value = "/api/v1/visualization")
public class VisualizationApi {
    private VisualizationService visualizationService;
    private final Logger log = LoggerFactory.getLogger(VisualizationApi.class);

    @Autowired
    public VisualizationApi(VisualizationService visualizationService,
                            DefaultZMonPermissionService authService) {
        this.visualizationService = visualizationService;
    }

    @RequestMapping(value = "/")
    public String visualizationHomeRedirect() {
        return visualizationService.homeRedirect();
    }

    @RequestMapping(value = "/script")
    public String grafanaScriptedDashboardRedirect(@RequestParam Map<String, String> params) {
        return visualizationService.dynamicDashboardRedirect(params);
    }

    @ResponseBody
    @RequestMapping(value = "/dashboards/{id}", method = RequestMethod.GET)
    public ResponseEntity<JsonNode> getDashboard(@PathVariable(value = "id") String id, @RequestHeader("Authorization") String authHeader) {
        return visualizationService.getDashboard(id, extractToken(authHeader));
    }

    @ResponseBody
    @RequestMapping(value = "/dashboards/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<JsonNode> deleteDashboard(@PathVariable(value = "id") String id, @RequestHeader("Authorization") String authHeader) {
        return visualizationService.deleteDashboard(id, extractToken(authHeader));
    }

    @ResponseBody
    @RequestMapping(value = "/dashboards", method = RequestMethod.POST)
    public ResponseEntity<JsonNode> upsertDashboard(@RequestBody(required = true) String body, @RequestHeader("Authorization") String authHeader) {
        return visualizationService.upsertDashboard(body, extractToken(authHeader));
    }

    @ResponseBody
    @RequestMapping(value = "/dashboards/search", method = RequestMethod.GET)
    public ResponseEntity<JsonNode> searchDashboards(
            @RequestParam Map<String, String> params,
            @RequestHeader("Authorization") String authHeader) {
        return visualizationService.searchDashboards(params, extractToken(authHeader));
    }

    private String extractToken(String authHeader) {
        String[] auth = authHeader.split(" ");
        return auth[1];
    }
}
