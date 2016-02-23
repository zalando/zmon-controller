package de.zalando.zmon.service.impl;

import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.zalando.zmon.config.DataSourceProviderConfiguration;
import de.zalando.zmon.config.EventLogProperties;
import de.zalando.zmon.config.RedisPoolConfiguration;
import de.zalando.zmon.config.SchedulerProperties;
import de.zalando.zmon.config.XmlConfigFileConfiguration;
import de.zalando.zmon.persistence.ZMonSProcServiceConfig;
import de.zalando.zmon.security.permission.DefaultZMonPermissionService;

@Configuration
@EnableConfigurationProperties({ RedisProperties.class, SchedulerProperties.class, EventLogProperties.class })
@Import({ DataSourceProviderConfiguration.class, ZMonSProcServiceConfig.class, XmlConfigFileConfiguration.class,
        RedisPoolConfiguration.class })
@ComponentScan(basePackageClasses = { ZMonServiceImpl.class })
@PropertySource("classpath:/test.properties")
public class ServiceTestConfiguration {

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public DefaultZMonPermissionService defaultZmonPermissionService() {
        return new DefaultZMonPermissionService();
    }

    @Bean
    public NoOpEventLog noOpEventLog() {
        return new NoOpEventLog();
    }

}
