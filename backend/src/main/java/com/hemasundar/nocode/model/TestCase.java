package com.hemasundar.nocode.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Lob
    private String gherkinScript;

    private Timestamp createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGherkinScript() {
        return gherkinScript;
    }

    public void setGherkinScript(String gherkinScript) {
        this.gherkinScript = gherkinScript;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
