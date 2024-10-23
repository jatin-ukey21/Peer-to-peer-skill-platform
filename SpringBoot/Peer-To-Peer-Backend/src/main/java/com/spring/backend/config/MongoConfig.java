package com.spring.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Configuration
public class MongoConfig {

    // Convert Date to LocalDate
    @Bean
    public Converter<Date, LocalDate> dateToLocalDateConverter() {
        return new Converter<Date, LocalDate>() {
            @Override
            public LocalDate convert(Date source) {
                return Instant.ofEpochMilli(source.getTime())  // Convert Date to Instant
                        .atZone(ZoneId.systemDefault()) // Get system default time zone
                        .toLocalDate();                 // Convert to LocalDate
            }
        };
    }

    // Convert LocalDate to Date
    @Bean
    public Converter<LocalDate, Date> localDateToDateConverter() {
        return new Converter<LocalDate, Date>() {
            @Override
            public Date convert(LocalDate source) {
                return Date.from(source.atStartOfDay(ZoneId.systemDefault()) // Start of the day for LocalDate
                        .toInstant());                            // Convert to Instant and then Date
            }
  };
}


}
