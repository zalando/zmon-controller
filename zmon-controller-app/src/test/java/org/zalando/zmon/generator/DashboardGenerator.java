package org.zalando.zmon.generator;

import java.util.Collections;

import org.zalando.zmon.domain.DashboardRecord;
import org.zalando.zmon.domain.EditOption;
import org.zalando.zmon.domain.ViewMode;

public class DashboardGenerator implements DataGenerator<DashboardRecord> {

    @Override
    public DashboardRecord generate() {

        final DashboardRecord dashboard = new DashboardRecord();
        dashboard.setName("Generated dashboard");
        dashboard.setCreatedBy("pribeiro");
        dashboard.setLastModifiedBy(dashboard.getCreatedBy());
        dashboard.setWidgetConfiguration(
            "[{\"type\": \"chart\", \"title\": \"ZMON Requests/s\", \"checkDefinitionId\": 202, \"entityId\": \"monitor03:3420\", \"options\": {\"colors\": [\"#0000FF\"]}}]");
        dashboard.setAlertTeams(Collections.singletonList("Platform/System"));
        dashboard.setViewMode(ViewMode.COMPACT);
        dashboard.setEditOption(EditOption.PRIVATE);
        dashboard.setSharedTeams(Collections.<String>emptyList());
        dashboard.setTags(Collections.singletonList("QA"));

        return dashboard;
    }

}
