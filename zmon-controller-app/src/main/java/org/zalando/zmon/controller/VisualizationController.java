package org.zalando.zmon.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.zalando.zmon.security.permission.DefaultZMonPermissionService;
import org.zalando.zmon.service.VisualizationService;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequestMapping(value = "/visualization")
public class VisualizationController {

    private VisualizationService visualizationService;
    private DefaultZMonPermissionService authService;

    @Autowired
    public VisualizationController(VisualizationService visualizationService,
                                   DefaultZMonPermissionService authService) {
        this.visualizationService = visualizationService;
        this.authService = authService;
    }

    @RequestMapping(value = "/")
    public String visualizationHomeRedirect(HttpServletRequest request) {
        return visualizationService.homeRedirect();
    }

    @RequestMapping(value = "/script")
    public String grafanaScriptedDashboardRedirect(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return visualizationService.dynamicDashboardRedirect(params);
    }

    @ResponseBody
    @RequestMapping(value = "/api/dashboard/{id}", method = RequestMethod.GET)
    public ResponseEntity<JsonNode> getDashboard(@PathVariable(value = "id") String id) {
        if (!authService.hasUserAuthority()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return visualizationService.getDashboard(id);
    }

    @ResponseBody
    @RequestMapping(value = "/api/dashboard/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<JsonNode> deleteDashboard(@PathVariable(value = "id") String id) {
        if (!authService.hasUserAuthority()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return visualizationService.deleteDashboard(id);
    }

    @ResponseBody
    @RequestMapping(value = "/api/dashboard", method = RequestMethod.POST)
    public ResponseEntity<JsonNode> upsertDashboard(@RequestBody(required = true) String body) {
        return visualizationService.upsertDashboard(body);
    }

    @RequestMapping(value = "/api/dashboard/search")
    public String searchDashboards(@PathVariable(value = "id") String id) {
        return "";
    }
}
